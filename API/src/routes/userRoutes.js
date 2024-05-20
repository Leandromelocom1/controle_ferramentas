import express from "express";
import * as userController from "../controllers/userController.js";
import * as authController from "../controllers/authControllers.js";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.post("/login", authController.login);
router.post("/verificaToken", authController.verificarToken, userController.authRoute);

export default router;
