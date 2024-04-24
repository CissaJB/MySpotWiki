import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';

describe('###Tests for Server Configuration', async(t) => {
    test('Testing options configuration file', async (t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });

        deepEqual(options.stage, 'test');
        deepEqual(options.port, '3000');
        deepEqual(options.host, '127.0.0.1');
        deepEqual(options.jwt_secret, '##jwt_secret##');
        deepEqual(options.db_url, 'mongodb://127.0.0.1/trabalhoB1');
    });
});

describe('###Tests for Unauthenticated Routes', async(t) => {})
    describe('##Success Requests', async(t) => {
        test('# GET /artist', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/artist'
            });
            equal(response.statusCode, 200);
        });

        test('# GET /artist/:name/musicAlbum', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/artist/:name/musicAlbum'
            });
            equal(response.statusCode, 200);
        });

        test('# GET /musicAlbum', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/musicAlbum'
            });
            equal(response.statusCode, 200);
        });

        test('# GET /musicGenre', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/musicGenre'
            });
            equal(response.statusCode, 200);
        });
            
        test('# GET /musicGenre/:id/musicAlbum', async(t) => {
            const app = await build(options);
    
            t.after(async() => {
               await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/musicGenre/:id/musicAlbum'
            });
            equal(response.statusCode, 200);
        });

        test('# POST /user', async(t) => {
            const app = await build(options);
    
            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/user',
                body: {
                    username: "clarissa",
                    email: "claris@hotmail.com.br"
                }
            });
            equal(response.statusCode, 201);
        });

        test('# GET /user', async(t) => {
            const app = await build(options);
    
            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/user'
            });
            equal(response.statusCode, 200);
        });

    describe('##Bad Requests', async(t) => {
        test('# POST /user', async(t) => {
            const app = await build(options);
    
            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/user',
                body: {
                    username: "clarissa",
                    email: "claris@hotmail.com.br"
                }
            });
            equal(response.statusCode, 412);
        });
    });

});

describe('###Tests for Authenticated routes', async(t) => {
    describe('##Success Requests', async(t) => {
       /* test('# PUT /user/:id', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/user/6622ca3a8585e6c8a9637894',
                headers:{
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpYSIsImVtYWlsIjoiYmlhQGhvdG1haWwuY29tIiwiaWF0IjoxNzEzNDgzODM4fQ.S9VNBjzcUweZGeHRXN39nOIOXQDKoHc8LEvRgGZ4Gew"
                },
                body:{
                    "isAdmin": true
                }
            });

            equal(response.statusCode, 200);
        });
        test('# DELETE /user/:id', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'DELETE',
                url: '/user/6622ca3a8585e6c8a9637894',
                headers:{
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpYSIsImVtYWlsIjoiYmlhQGhvdG1haWwuY29tIiwiaWF0IjoxNzEzNDgzODM4fQ.S9VNBjzcUweZGeHRXN39nOIOXQDKoHc8LEvRgGZ4Gew"
                }
            });

            equal(response.statusCode, 204);
        });
        test('# DELETE /user', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'DELETE',
                url: '/user',
                headers:{
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcmlzY3JldWRlcyIsImVtYWlsIjoibWFyaUBnbWFpbC5jb20iLCJpYXQiOjE3MTM1NTIwNzR9.pa2_UUKrHbK7xLDVbof7BpWDI87LmKpvqmKdm_3SxgA"
                }
            });

            equal(response.statusCode, 204); 
        }); */

        test('# POST /artist', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/artist',
                headers:{
                    "x-access-token": ""
                },
                body: {
                    name: "NewJeans"
                }
            });
            equal(response.statusCode, 204);
        })

        test('# PUT /artist/:id', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/artist/',
                headers:{
                    "x-access-token": ""
                },
                body: {
                    name: ""
                }
            });
            equal(response.statusCode, 204);
        })

        test('# DELETE /artist/:id', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/artist/:id',
                headers:{
                    "x-access-token": ""
                }
            });
            equal(response.statusCode, 204);
        })

        test('# POST /musicAlbum', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/musicAlbum',
                headers:{
                    "x-access-token": ""
                },
                body: {
                    name: "Eyes Wide Open",
                    artist: "Twice",
                    genre_id: "KPOP",
                    year: 2020
                }
            });
            equal(response.statusCode, 204);
        })

        test('# PUT /musicAlbum/:id', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/musicAlbum',
                headers:{
                    "x-access-token": ""
                },
                body: {
                    name: "Eyes Wide Open",
                    artist: "Twice",
                    genre_id: "KPOP",
                    year: 2020
                }
            });
            equal(response.statusCode, 204);
        })

        test('# DELETE /musicAlbum/:id', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/musicAlbum',
                headers:{
                    "x-access-token": ""
                },
                body: {
                    name: "Eyes Wide Open",
                    artist: "Twice",
                    genre_id: "KPOP",
                    year: 2020
                }
            });
            equal(response.statusCode, 204);
        })


    })

})