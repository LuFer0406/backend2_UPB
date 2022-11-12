import { validationResult } from "express-validator";
import { response } from "../helpers/response.js";

export const validarCampos = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return response(res, 400, false, "", error);
    }
    next();
};