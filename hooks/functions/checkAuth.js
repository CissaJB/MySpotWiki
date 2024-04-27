import createError from "@fastify/error";
import {NOT_AUTHORIZED, TOKEN_NOTFOUND} from '../../libs/erros.js'

export const checkAuth = (app) => async (request, reply) => {
    const user = app.mongo.db.collection('user');

    if(!request.headers['x-access-token']){
        throw new TOKEN_NOTFOUND();
    } //garantindo que existe um token de acesso no header
         

    if(await user.findOne({
        token: request.headers['x-access-token'],
        isAdmin:  true  //checando se ele está no banco de dados
    }))
        return
    else{
        throw new NOT_AUTHORIZED();
    }

};