/** @type{import('fastify').FastifyPluginAsync<>} */
import { checkAuth } from './functions/checkAuth.js';
import { checkMail } from './functions/checkEmail.js';
import { checkExistence } from './functions/checkExistence.js';
import { existentUser } from './functions/existentUser.js';
import { nonExistence } from './functions/nonExistence.js';

export default async function onRouteHook(app, options) {
    app.addHook('onRoute', (routeOptions) => {
        if(routeOptions.onRequest && !Array.isArray(routeOptions.onRequest)){
            routeOptions.onRequest = [routeOptions.onRequest];
        }else{
            routeOptions.onRequest = [];
        }
        if(routeOptions.preHandler && !Array.isArray(routeOptions.preHandler)){
            routeOptions.preHandler = [routeOptions.preHandler];
        }else{
            routeOptions.preHandler = [];
        }
        if(routeOptions.url === '/user' && routeOptions.method === 'POST'){
            routeOptions.preHandler.push(checkMail(app));
        }
        if(routeOptions.config?.neededAuthentication){
            routeOptions.onRequest.push(checkAuth(app));
        }
        if(routeOptions.config?.checkExistence){
            routeOptions.onRequest.push(existentUser(app));
        }
        if(routeOptions.config?.checkNonExistence){
            routeOptions.onRequest.push(nonExistence(app));
        }
        if((routeOptions.url === '/musicGenre' || 
            routeOptions.url === '/musicAlbum' ||
            routeOptions.url === '/artist' ) 
            && routeOptions.method === 'POST'){
            routeOptions.preHandler.push(checkExistence(app));
        }
    });
}