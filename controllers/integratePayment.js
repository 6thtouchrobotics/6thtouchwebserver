const axios = require('axios');
const Transaction = require('../models/transaction'); 
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

const initiatePayment = async (req, res) => {
    const { amount, email, name, phoneNumber } = req.body;
    const tx_ref= `tx_${Date.now()}`;
    if (!amount || !email || !name || !phoneNumber) {
        return res.status(400).json({ message: 'Amount, email, name, and phone number are required' });
    }
    try {
        const response = await axios.post(
            'https://api.flutterwave.com/v3/payments',
            {
                tx_ref,
                amount,
                currency: 'NGN',
                redirect_url:  `${process.env.FRONTEND_URL}/success`,
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
            res.json({
                message: 'Payment initiated successfully',
                paymentLink: response.data.data.link,
                tx_ref,
            });
        } else {
            res.status(400).json({ message: 'Payment initiation failed', error: response.data.message });
        }
    } catch (err) {
        console.error(err.code);
        console.error(err.response.data);
        res.status(500).json({ message: 'Server error', error: err.response ? err.response.data : err.message });
    }
}

const verifyPayment = async (req, res) => {
    const { tx_ref } = req.query;
    if (!tx_ref) {
        return res.status(400).json({ message: 'Transaction reference is required' });
    }
    try {
        const response = await flw.Transaction.verify({ id: tx_ref })
        if (response.data.status === 'success') {      
            const transaction = await Transaction.create({
                userId: req.user.id,
                amount: response.data.data.amount,
                currency: response.data.data.currency,
                status: response.data.data.status,
                transactionId: response.data.data.id,
                tx_ref,
            });
            res.json({
                message: 'Payment verified successfully',
                transaction,
            });
        }
        else {
            res.status(400).json({ message: 'Payment verification failed', error: response.data.message });
        }
    } catch (err) {
        console.error(err.code);
        console.error(err.response.data);
        res.status(500).json({ message: 'Server error', error: err.response ? err.response.data : err.message });
    }
}

module.exports = { initiatePayment, verifyPayment };