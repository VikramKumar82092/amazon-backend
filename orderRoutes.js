const express = require("express");
const Razorpay = require("razorpay");
const Order = require("../models/Order");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-payment", async (req, res) => {
  const order = await razorpay.orders.create({
    amount: req.body.amount * 100,
    currency: "INR",
  });
  res.json(order);
});

router.post("/place", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json({ success: true });
});

module.exports = router;
