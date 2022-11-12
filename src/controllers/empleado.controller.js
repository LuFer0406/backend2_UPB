import { response } from "../helpers/response.js"
import { empleadoModel } from "../models/empleado.model.js"
response

const empleadoCtrl = {}

    // Función para listar todos los empleados
    empleadoCtrl.listar = async(req, res) => {

        try {
            // const empleados = await empleadoModel.find()
            // response(res, 200, true, empleados, "Lista de empleados");

            // const limit = parseInt(req.query.limit) || 10;

            // const page = parseInt(req.query.page) || 1;

            const opciones = {
                limit: parseInt(req.query.limit) || 10,
                page: parseInt(req.query.page) || 1,
            };

            const empleados = await empleadoModel.paginate({}, opciones);

            response(res, 200, true, empleados, "Lista de empleados");
            
        } catch (error) {
           response(res, 500, false, "", error.message);
        }
    };

    // Función para listar por id
    empleadoCtrl.listById = async (req, res) => {
        try {
            const {id} = req.params;
            const empleado = await empleadoModel.findById(id);

            if (!empleado){
                return response(res, 404, false, "", "El empleado no ha sido encontrado");
            }

            response(res, 200, true, empleado, "Empleado encontrado con éxito.")
        } catch (error) {
            response(res, 500, false, "", error.message);
        }
    };

    // Función para guardar
    empleadoCtrl.guardar = async(req, res) => {
        try {

            const {correo} = req.body;

            const empleado = await empleadoModel.findOne({ correo });

            if (empleado) {
                return response(res, 400, false, "", `El correo ${correo} ya existe, inténtalo de nuevo.`)
            }

            const nuevoEmpleado = await empleadoModel.create(req.body);

            // const nuevoEmpleado = new empleadoModel({
            //     nombres, 
            //     apellidos, 
            //     correo, 
            //     salario, 
            //     edad, 
            //     cargo,
            // });

            // await nuevoEmpleado.save();

            response(res, 201, true, nuevoEmpleado, "El empleado ha sido creado con éxito.")

        } catch (error) {
            response(res, 500, false, "", error.message);
        }
    };

        // Función para actualizar
        empleadoCtrl.actualizar = async(req, res) => {
            try {
                const {id} = req.params;

                const {correo} = req.body;

                const empleado = await empleadoModel.findById(id)

                if (!empleado) {
                    return response (res, 404, false, "", "El registro no ha sido encontrado.")
                }

                if (empleado.correo != correo) {
                    const empleadoCorreo = await empleadoModel.findOne({correo});

                    if (empleadoCorreo) {
                        return response(res, 400, false, "", `El correo ${correo} ya existe, intente de nuevo.`)
                    }
                }

                await empleado.updateOne(req.body);

                // await empleadoModel.findByIdAndUpdate({_id: id}, req.body);

                response(res, 200, true, "", "El registro se ha actuzalizado correctamente.");

            } catch (error) {
                response(res, 500, false, "", error.message);
            }
        }

        // Función para eliminar
        empleadoCtrl.eliminar = async (req, res) => {
            try {
                const {id} = req.params;
                const empleado = await empleadoModel.findById(id);
    
                if (!empleado){
                    return response(res, 404, false, "", "El empleado no ha sido encontrado");
                }

                await empleado.deleteOne();
    
                response(res, 200, true, empleado, "El empleado se ha eliminado con éxito.")
            } catch (error) {
                response(res, 500, false, "", error.message);
            }
        };

    export default empleadoCtrl;
