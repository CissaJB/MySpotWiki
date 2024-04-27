import { COMPONENT_EXIST } from "../../libs/erros.js";

export const checkExistence = (app) => async (request, reply) =>{
    const genre = app.mongo.db.collection('gMusic');
    const artist = app.mongo.db.collection('artist');
    const album = app.mongo.db.collection('musicAlbum');

    const comp = request.body
    const r = await genre.count({name: comp.name})  
    const rs = await artist.count({name: comp.name})  
    const res = await album.count({name: comp.name, artist: comp.artist})
    if(r > 0 || res > 0 || rs > 0){
        throw new COMPONENT_EXIST();
    } 
    else{
        return
    }
    
}