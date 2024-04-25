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
                url: '/artist/Twice/musicAlbum'
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
                url: '/musicGenre/66299aa71d577d2218a052b8/musicAlbum'
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
            equal(response.statusCode, 403);
        });
    });

});

describe('###Tests for Authenticated routes', async(t) => {
    describe('##Success Requests', async(t) => {
        test('# PUT /user/:id', async(t) => {
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

        test('# POST /artist', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/artist',
                headers:{
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpc3NhIiwiZW1haWwiOiJjaXNzYUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTQwMDEyMjN9.YuL3eegGBoymei4zhrGwVulDXuVdMgzp82c9WeMJ9RY"
                },
                body: {
                    name: "NewJeans"
                }
            });
            equal(response.statusCode, 201);
        })

        test('# PUT /artist/:id', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/artist/6625014f7eff98a502ee0b13',
                headers:{
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpc3NhIiwiZW1haWwiOiJjaXNzYUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTQwMDEyMjN9.YuL3eegGBoymei4zhrGwVulDXuVdMgzp82c9WeMJ9RY"
                },
                body: {
                    name: "Miley Cyrus"
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
                method: 'DELETE',
                url: '/artist/662501227eff98a502ee0b11',
                headers:{
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpc3NhIiwiZW1haWwiOiJjaXNzYUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTQwMDEyMjN9.YuL3eegGBoymei4zhrGwVulDXuVdMgzp82c9WeMJ9RY"
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
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpc3NhIiwiZW1haWwiOiJjaXNzYUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTQwMDEyMjN9.YuL3eegGBoymei4zhrGwVulDXuVdMgzp82c9WeMJ9RY"
                },
                body: {
                    name: "Eyes Wide Open",
                    artist: "Twice",
                    genre_id: "KPOP",
                    year: 2020
                }
            });
            equal(response.statusCode, 201);
        })

        test('# PUT /musicAlbum/:id', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/musicAlbum/662468fe1da2db7a6c2ce1c6',
                headers:{
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpc3NhIiwiZW1haWwiOiJjaXNzYUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTQwMDEyMjN9.YuL3eegGBoymei4zhrGwVulDXuVdMgzp82c9WeMJ9RY"
                },
                body: {
                    name: "Sour"
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
                method: 'DELETE',
                url: '/musicAlbum/6629a2d61d577d2218a052bf',
                headers:{
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpc3NhIiwiZW1haWwiOiJjaXNzYUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTQwMDEyMjN9.YuL3eegGBoymei4zhrGwVulDXuVdMgzp82c9WeMJ9RY"
                }
            });
            equal(response.statusCode, 204);
        })

        test('# POST /musicGenre', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/musicGenre',
                headers:{
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpc3NhIiwiZW1haWwiOiJjaXNzYUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTQwMDEyMjN9.YuL3eegGBoymei4zhrGwVulDXuVdMgzp82c9WeMJ9RY"
                },
                body: {
                    name: "MPB",
                }
            });
            equal(response.statusCode, 201);
        })

        test('# PUT /musicGenre/:id', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/musicGenre/66244cecce6de20b1248ca3d',
                headers:{
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpc3NhIiwiZW1haWwiOiJjaXNzYUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTQwMDEyMjN9.YuL3eegGBoymei4zhrGwVulDXuVdMgzp82c9WeMJ9RY"
                },
                body: {
                    name: "R&B"
                }
            });
            equal(response.statusCode, 204);
        })

        test('# DELETE /musicGenre/:id', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'DELETE',
                url: '/musicGenre/66244cddce6de20b1248ca3b',
                headers:{
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpc3NhIiwiZW1haWwiOiJjaXNzYUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTQwMDEyMjN9.YuL3eegGBoymei4zhrGwVulDXuVdMgzp82c9WeMJ9RY"
                }
            });
            equal(response.statusCode, 204);
        })

    })

})
