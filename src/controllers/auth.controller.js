import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import nodemailer from "nodemailer";

// Registro de usuario
export const register = async (req, res) => {
  const { username, email, password, status } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      status,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      status: userSaved.status,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Inicio de sesión de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect Password" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      password: userFound.password,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cerrar sesión de usuario
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

// Perfil de usuario
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    password: userFound.password,
  });
};

// Cambiar el estado del usuario (activar/desactivar)
export const changeUserStatus = async (req, res) => {
  const { username, email, status } = req.body;

  console.log("Request Body:", req.body); // Log para depuración

  try {
    const user = await User.findOne({ username, email });
    if (!user) {
      console.log("User not found"); // Log para depuración
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user); // Log para depuración

    user.status = status;
    await user.save();

    console.log("User status updated successfully true"); // Log para depuración
    res.json({ message: "User status updated successfully true" });
  } catch (error) {
    console.error("Error:", error); // Log para depuración
    res.status(500).json({ message: error.message });
  }
};

// verficar TOKEN

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await user.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      status: userFound.status,
    });
  });
};

// Función para enviar el correo de recuperación de contraseña
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generar y guardar el token de restablecimiento de contraseña
    const token = jwt.sign({ _id: user._id }, TOKEN_SECRET, {
      expiresIn: "15m",
    });
    user.resetToken = token;
    await user.save();

    // Enviar correo electrónico de recuperación de contraseña
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      post: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Your Password for JAC Instant Messaging Service",
      html: `
<<<<<<< HEAD
        <h1>Reset Your Password</h1>
        <h3>Dear Usuario,</h3>
        <p>We have received a request to reset your password for your JAC Instant Messaging Service account. To proceed with resetting your password, please click on the link below:</p>
        <a href="http://localhost:5173/reset-password/${token}">click here to reset your password</a>
        <br></br> 
        <p>If you did not request this password reset, please disregard this email. Your account security is important to us, so we recommend choosing a strong password that you haven't used before.</p> 
        <br></br> 
        <p>Thank you,</p> 
        <h4>JAC Instant Messaging Service</h4>       
        `,
=======
        <h1>Reset your password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="http://localhost:5173/reset-password/${token}">Reset Password Link</a>
      `,
>>>>>>> a3211997be6b11812adc3edd6b6c185d41892ba6
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent: " + info.response);
      res.json({ message: "Email sent" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Función para restablecer la contraseña
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();

    res.json({ message: "Contraseña cambiada con exito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
