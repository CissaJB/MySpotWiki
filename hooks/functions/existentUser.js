import createError from "@fastify/error";
import { NONE_EXISTENT_TOKEN } from "../../libs/erros.js";

export const existentUser = (app) => async (request, reply) => {
    const user = app.mongo.db.collection('user');

    if(await user.findOne({ token: request.headers['x-access-token']}))
        return
    else{
        throw new NONE_EXISTENT_TOKEN();
    }
        
}