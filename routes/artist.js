export default async function musicArtist(app, options){
    const artist = app.mongo.db.collection('artist');
    const album = app.mongo.db.collection('musicAlbum');

    app.post('/artist',
        {
            schema:{
                type: 'object',
                properties:{
                    name: { type: 'string' }
                },
                required: ['name']
            },
            config:{
                neededAuthentication: true
            }
        },
        async (request, reply) =>{
            const gName = request.body.name;
            await artist.insertOne({name: gName});
            return reply.code(201).send();
        }
    )

    app.get('/artist', 
        async (request, reply) =>{
        return await artist.find().toArray();
    })

    app.put('/artist/:id',
        {
            schema:{
                type: 'object',
                properties:{
                    name: 'string'
                }, 
                required: ['name']
            },
            config:{
                neededAuthentication: true,
                checkNonExistence:true
            }
        }, async (request, reply) =>{
            const ident = request.params.id;
            await artist.updateOne({_id: new app.mongo.ObjectId(ident)},
                {$set: {
                    name: request.body.name
                }}
            )
            return reply.code(204).send();
        }
    )

    app.delete('/artist/:id',{
        config: 
            {neededAuthentication: true,
                checkNonExistence: true
            }
        },
        async (request, reply) => {
            const ident = request.params.id;
            await artist.deleteOne({_id: new app.mongo.ObjectId(ident)});
            return reply.code(204).send();
        }
    )

    app.get('/artist/:name/musicAlbum', 
        async (request, reply) => {
            const nome = request.params.name;
            return await album.find({artist: nome}).toArray();
        }
    )
}