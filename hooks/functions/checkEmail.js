import createError from '@fastify/error';
import {USER_EXIST} from '../../libs/erros.js'

export const checkMail = (app) => async (request, reply) => {
    const user = app.mongo.db.collection('user');
    
    let usuario = request.body;

    let result = await user.count({email: usuario.email});

    if(result > 0 ) {
       throw new USER_EXIST();
    }
}