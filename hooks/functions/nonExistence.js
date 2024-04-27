import { DOESNT_EXIST } from "../../libs/erros.js";

export const nonExistence = (app) => async (request, reply) =>{
    const genre = app.mongo.db.collection('gMusic');
    const artist = app.mongo.db.collection('artist');
    const album = app.mongo.db.collection('musicAlbum');
    const id = request.params.id;

    if(await genre.count({_id: new app.mongo.ObjectId(id)}) > 0 ||
        await album.count({_id: new app.mongo.ObjectId(id)}) > 0 ||
        await artist.count({_id: new app.mongo.ObjectId(id)}) > 0){
        return;
    }
    else{
        throw new DOESNT_EXIST();
    }
}