import { check } from 'express-validator';
import resultadosValidacion from './resultadoValidacion';
import moment from 'moment';

const validarPedido = [
    check('usuario')
        .notEmpty()
        .withMessage('El usuario del pedido es obligatorio')
        .isLength({ min: 4, max: 30 })
        .withMessage(
            'El nombre de usuario debe tener entre ( 4 y 30 ) caracteres'
        ),
    check('fecha')
        .notEmpty()
        .withMessage('La fecha es obligatoria')
        .custom((input) => {
            const result = moment(input, 'DD/MM/YY', true).isValid();
            console.log(result);
            if (result) {
                return true;
            } else {
                throw new Error(
                    'La fecha debe respetar el siguiente formato ( DD/MM/AA )'
                );
            }
        }),
    check('productosdelmenu')
        .notEmpty()
        .withMessage('Los productos son obligatorios'),
    check('estado')
        .notEmpty()
        .withMessage('El estado es obligatorio'),
        
    (req, res, next) => {
        resultadosValidacion(req, res, next);
    },
];
export default validarPedido;
