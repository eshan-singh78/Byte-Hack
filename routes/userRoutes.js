const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


// Mail transporter setup (using Gmail in this example)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'eshan.dev.projects@gmail.com',
      pass: 'ugks mgni otes fmky'
    }
  });


router.post('/api/signup', async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, college, course } = req.body;

    // Generate a unique verification token (using crypto.randomBytes)
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      college,
      course,
      verificationToken: verificationToken
    });

    // Save the user to the database
    await newUser.save();

    // Create verification link with localhost
    const verificationLink = `http://byte-hack.onrender.com/api/verify?token=${verificationToken}`;

    // Send verification link via email
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Email Verification',
      html: `Click <a href="${verificationLink}">here</a> to verify your email. This verification is for BYTE-HACK`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send verification email' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(201).json({ message: 'User created successfully. Please check your email for verification.' });
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


router.get('/api/verify', async (req, res) => {
  const { token } = req.query;

  try {
    // Find the user with the provided verification token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: 'Invalid verification token or user not found' });
    }

    // Update user's verification status in the database
    user.verified = true;
    user.verificationToken = undefined; // Clear the verification token
    await user.save();

    return res.status(200).redirect('/');
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

  

router.post('/api/user-login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const errorMessage = encodeURIComponent('Invalid email or password');
      return res.status(401).redirect(`/user-login?error=${errorMessage}`);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      const errorMessage = encodeURIComponent('Invalid email or password');
      return res.status(401).redirect(`/user-login?error=${errorMessage}`);
    }

    if (!user.verified) {
      const errorMessage = encodeURIComponent('Account not verified. Please check your email for verification.');
      return res.status(401).redirect(`/user-login?error=${errorMessage}`);
    }
    // Set the userId in the session
    req.session.userId = user._id;

    res.redirect('/user-dashboard'); // Redirect to the dashboard after successful login
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.post('/submit-contact', async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    // Compose email message
    const mailOptions = {
      from: 'eshan.dev.projects@gmail.com',
      to: 'eshan.singh.04.dev@gmail.com', // Change this to the recipient's email
      subject: `New Contact Form Submission: ${subject}`,
      text: `Email: ${email}\n\nMessage: ${message}`
    };

    // Send email using Nodemailer transporter
    await transporter.sendMail(mailOptions);

    // Redirect to the same page after sending the email
    return res.redirect('/contact?message=Message sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    return res.redirect('/contact?message=Failed to send message');
  }
});



module.exports = router;
