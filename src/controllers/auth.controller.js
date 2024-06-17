import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

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

    res.cookie("token", token, {
      sameSite: "none",
      secure: false,
      path: "/",
    }, 
    {
      maxAge: 3600 * 24 * 60 * 60
    }
  );
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      password: userFound.password,
      status: userFound.status,
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
