import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateToken from '../helpers/generateToken';
import resetPasswordTemplate from '../helpers/templates/userTemplates/resetPassword';
import sendEmail from '../helpers/sendEmail';

const isAuthenticated = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'you are not authorized to to access this resource, signup/login'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'you are not authorized to to access this resource, signup/login' });
  }
};

const generateHarsh = pwd => bcrypt.hashSync(pwd, bcrypt.genSaltSync(10));
const comparePassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);


const sendResetPasswordEmail = async (email, payload) => {
  const { name } = payload.user;
  const token = generateToken({ email, isVerified: true });
  await sendEmail({
    email,
    subject: 'Nisisi User Verification',
    text: 'Nisisi E-commerce',
    html: resetPasswordTemplate(`${process.env.FRONTEND_APP_URL}/verify?token=${token}`, name)
  });
};






export {
  isAuthenticated, sendResetPasswordEmail, generateHarsh, comparePassword
};
