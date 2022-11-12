import { Router } from "express";
import { check } from "express-validator";
import empleadoCtrl from "../controllers/empleado.controller.js";
import { validarCampos } from "../middleware/validarCampos.js";
import { seedDb } from "../seed/seedDb.js";

const route = Router();

// Seed -> para poblar la base de datos
route.get("/seed", seedDb);

route.get("/", empleadoCtrl.listar);
route.get("/:id", empleadoCtrl.listById);
route.post(
  "/",
  // Middleware
  [
    check("nombres", "El campo nombres es obligatorio.")
      .notEmpty()
      .isLength({ min: 4, max: 50 }),
    check("apellidos").optional({ checkFalsy: true}).isLength({ min: 4, max: 50 }),
    check("correo").isEmail(),
    check("edad", "El campo edad es obligatorio")
      .notEmpty()
      .isLength({ min: 1, max: 3 }),
    check("salario", "El campo salario es obligatorio").notEmpty(),
    check("cargo", "El campo cargo es obligatorio").notEmpty(),
  ],
  validarCampos,
  empleadoCtrl.guardar
);

route.put("/:id", empleadoCtrl.actualizar);
route.delete("/:id", empleadoCtrl.eliminar);

export default route;
