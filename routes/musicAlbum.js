export default async function musicAlbum(app, options){
    const album = app.mongo.db.collection('musicAlbum');

    app.post('/musicAlbum',
        {
            schema:{
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    artist: { type: 'string' },
                    genre_id: { type: 'string' },
                    year: { type: 'integer'}
                },
                required:['name', 'artist', 'genre']
            },
            config:{
                neededAuthentication: true
            }
        }, async (request, reply) => {
            let alb = request.body;
            await album.insertOne(alb);
            return reply.code(201).send();
        }
    )

    app.get('/musicAlbum', 
        async (request, reply) => {
            return await album.find().toArray();
    })

    app.put('/musicAlbum/:id',{
        schema:{
            type: 'object',
            properties: {
                name: { type: 'string' },
                artist: { type: 'string' },
                genre_id: { type: 'string' },
                year: { type: 'integer'}
            }
        },
        config:{
            neededAuthentication: true,
            checkNonExistence: true
        }},
        async(request, reply) => {
            const id = request.params.id;
            const alb = request.body;

            await album.updateOne(
                {_id: new app.mongo.ObjectId(id)},
                {$set: alb}
            )
            return reply.code(204).send();
        }
    )

    app.delete('/musicAlbum/:id',
        {config: 
            {neededAuthentication: true,
                checkNonExistence: true}},
        async(request, reply) =>{
            const id = request.params.id;
            await album.deleteOne({_id: new app.mongo.ObjectId(id)});
            return reply.code(204).send();
        }
    )
}