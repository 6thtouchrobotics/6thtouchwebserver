const axios = require('axios');
const Transaction = require('../models/transaction'); 
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const initiatePayment = async (req, res) => {
    const { amount, email, name, phoneNumber, userId, courseId } = req.body;
    const tx_ref = `tx_${Date.now()}`;

    if (!amount || !email || !name || !phoneNumber || !userId || !courseId) {
        return res.status(400).json({ message: 'All fields are required including userId and courseId' });
    }

    try {
        // Optional: Store a "pending" transaction in DB
        await Transaction.create({
            userId,
            courseId,
            amount,
            currency: 'NGN',
            status: 'pending',
            tx_ref
        });

        const response = await axios.post(
            'https://api.flutterwave.com/v3/payments',
            {
                tx_ref,
                amount,
                currency: 'NGN',
                redirect_url: `${process.env.FRONTEND_URL}/success?tx_ref=${tx_ref}`,
                customer: {
                    email,
                    name,
                    phonenumber: phoneNumber,
                },
                customizations: {
                    title: 'Flutterwave Standard Payment',
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data.status === 'success') {
            return res.json({
                message: 'Payment initiated successfully',
                paymentLink: response.data.data.link,
                tx_ref,
            });
        } else {
            return res.status(400).json({ message: 'Payment initiation failed', error: response.data.message });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error', error: err.response?.data || err.message });
    }
};

const verifyPayment = async (req, res) => {
    const { tx_ref } = req.query;
    if (!tx_ref) {
        return res.status(400).json({ message: 'Transaction reference is required' });
    }

    try {
        const response = await flw.Transaction.verify({ id: tx_ref });

        if (response.data.status === 'success') {
            const txData = response.data.data;

            // Find the pending transaction you created earlier
            const transaction = await Transaction.findOne({ where: { tx_ref } });

            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }

            transaction.status = 'successful';
            transaction.amount = txData.amount;
            transaction.currency = txData.currency;
            await transaction.save();

            return res.json({
                message: 'Payment verified successfully',
                transaction,
            });
        } else {
            return res.status(400).json({ message: 'Payment verification failed', error: response.data.message });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error', error: err.response?.data || err.message });
    }
};

module.exports = { initiatePayment, verifyPayment };