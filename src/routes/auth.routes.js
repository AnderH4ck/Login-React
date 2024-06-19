//RUTAS PARA ENGLOBAR TODAS LA RUTAS DE AUTENTIFICACION
import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
  changeUserStatus,
  requestPasswordReset,
  resetPassword,
  verifyToken,
} from "../controllers/auth.controller.js";

import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

//CREANDO OBJETO
const router = Router();

//RUTAS DE RESPUESTA SEGUN LA FUNCION
router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/change-user-status", changeUserStatus);

router.post("/request-password-reset", requestPasswordReset);

router.post("/reset-password/:token", resetPassword);

router.post("/logout", logout);

router.get("/profile", authRequired, profile);

//EXPORTAMOS EL OBJETO
export default router;
