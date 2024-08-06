import "dotenv/config"
var jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'secret';

interface IPayload {
    id: number;
    email: string;
}
//creando y validando jwt
export default {
    sign: (payload: IPayload) =>
        jwt.sign(payload, SECRET, { expiresIn: '1h', algorithm: 'HS256' }),

    verify: (token: string) => jwt.verify(token, SECRET),
};