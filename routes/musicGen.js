import { config } from "dotenv";

export default async function musicGenre(app, options){
    const genre = app.mongo.db.collection('gMusic');
    const album = app.mongo.db.collection('musicAlbum');

    //Creating musical genre
    app.post('/musicGenre',
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
            await genre.insertOne({name: gName});
            return reply.code(201).send();
        }
    )

    app.get('/musicGenre', 
        async (request, reply) =>{
        return await genre.find().toArray();
    })

    app.put('/musicGenre/:id',
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
            await genre.updateOne({_id: new app.mongo.ObjectId(ident)},
                {$set: {
                    name: request.body.name
                }}
            )
            return reply.code(204).send();
        }
    )

    app.delete('/musicGenre/:id',{
        config: 
            {neededAuthentication: true,
                checkNonExistence: true
            }
        },
        async (request, reply) => {
            const ident = request.params.id;
            await genre.deleteOne({_id: new app.mongo.ObjectId(ident)});
            return reply.code(204).send();
        }
    )

    app.get('/musicGenre/:id/musicAlbum', 
        async (request, reply) =>{
            const id = request.params.id;
            return await album.find(
                {genre_id: id}).toArray();
    })
}
