/** @type{import('fastify').FastifyPluginAsync<>} */
export default async function userManipulation(app, options){
    const usuar = app.mongo.db.collection('user');
    //Creating users
    app.post('/user', 
        {
        schema:{
            type: 'object',
            properties:{
                username: {type: 'string'},
                email: {type: 'string'},
                isAdmin: {type: 'boolean'}
            },
            required:['username', 'email']
        }
        }, async (request, reply) =>{
            const us = request.body.username
            const em = request.body.email
            var isAdm
            if(request.body.isAdmin) isAdm = true 
            else isAdm = false
            const jwt_token = app.jwt.sign(request.body);
            await usuar.insertOne({username: us, email: em, isAdmin: isAdm, token: jwt_token});
            return reply.code(201).send();
        }
    
    )
    app.get('/user', 
    async (request, reply) => {
        return await usuar.find().toArray();
    }
);

    app.get('/user/:id', async (request, reply) => {
        let id =  request.params.id;
        let user = await usuar.findOne({_id: new app.mongo.ObjectId(id)});
        
        return user;
    });


    //UPDATING isAdmin data
    app.put('/user/:id', {
        schema:{
            body:{
               properties:{ isAdmin: {type: 'boolean'}},
               type: 'object',
               required: ['isAdmin']
            }
        },
        config:{
            neededAuthentication: true
        }
    }, async (request, reply) =>{
        let id_ = request.params.id;
        let pers = request.body.isAdmin;

        await usuar.updateOne(
            {_id: new app.mongo.ObjectId(id_)},
            {$set:{
                isAdmin: pers
              }
        })
        return reply.code(200).send();
    }


    )

    //Adm deleting user 
    app.delete('/user/:id', {
        config:{
            neededAuthentication: true,
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        
        await usuar.deleteOne({_id: new app.mongo.ObjectId(id)});
        
        return reply.code(204).send();
    }
    )

    //Deleting your own user 
    app.delete('/user', {
        config:{
            checkExistence: true, // checa se o token passado no header existe no banco de dados
        }
    }, async (request, reply) => {
        await usuar.deleteOne({token: request.headers['x-access-token']})
        return reply.code(204).send();
    }
    )
}