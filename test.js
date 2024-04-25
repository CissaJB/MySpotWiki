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

    // TESTES DE SUCESSO PARA USUÁRIOS
        
        test('# PUT /user/:id', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/user/', //LEMBRAR DE CRIAR UM USUÁRIO E PEGAR O ID
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
                url: '/user/', //CRIAR UM OUTRO USUÁRIO E DEPOIS APAGAR
                headers:{
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpYSIsImVtYWlsIjoiYmlhQGhvdG1haWwuY29tIiwiaWF0IjoxNzEzNDgzODM4fQ.S9VNBjzcUweZGeHRXN39nOIOXQDKoHc8LEvRgGZ4Gew"
                }
            });
            equal(response.statusCode, 204);
        });

    // TESTES DE SUCESSO PARA ARTISTAS
        
        test('# POST /artist', async(t) => {  //ADICIONANDO O NEWJEANS
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

        test('# PUT /artist/:id', async(t) => {   //CONSERTAR O NOME DA MILEY
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

        test('# DELETE /artist/:id', async(t) => {  //DELETAR O RUEL
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

// TESTES DE SUCESSO PARA ALBUNS DE MUSICA
        
        test('# POST /musicAlbum', async(t) => {  //ADICIONANDO O EYES WIDE OPEN
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

        test('# PUT /musicAlbum/:id', async(t) => {  //CONSERTANDO O NOME DO ALBUM DA OLIVIA
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

        test('# DELETE /musicAlbum/:id', async(t) => {  //DELETE O ALBUM DO TWICE (FÓRMULA OU YOU-TH)
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

// TESTES DE SUCESSO PARA GÊNEROS MUSICAIS
        
        test('# POST /musicGenre', async(t) => {  // ADCIONANDO MAIS UM GÊNERO MUSICAL
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

        test('# PUT /musicGenre/:id', async(t) => { //ALTERANDO O RITMO MUSICAL BLUES PARA R&B
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

        test('# DELETE /musicGenre/:id', async(t) => { //APAGANDO O GÊNERO MUSICAL SAMBA
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
  describe('##Bad Requests', async(t) => {
      
       // TESTES DE ERROS PARA USUÁRIOS
        
        test('# PUT /user/:id', async(t) => { // TENTANDO ALTERAR SEM O HEADER
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/user/', //LEMBRAR DE CRIAR UM USUÁRIO E PEGAR O ID
                body:{
                    "isAdmin": true
                }
            });
            equal(response.statusCode, 400);
        });

       test('# PUT /user/:id', async(t) => { // USANDO UM HEADER NÃO EXISTENTE
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/user/', //LEMBRAR DE CRIAR UM USUÁRIO E PEGAR O ID
                 headers:{
                    "x-access-token": "ygJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpc3NhIiwiZW1haWwiOiJjaXNzYUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTQwMDEyMjN9.YuL3eegGBoymei4zhrGwVulDXuVdMgzp82c9WeMJ9RY"
                },
                body:{
                    "isAdmin": true
                }
            });
            equal(response.statusCode, 401);
        });

       test('# PUT /user/:id', async(t) => { // DELETANDO UM USUÁRIO QUE NÃO EXISTE
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/user/', //LEMBRAR DE CRIAR UM USUÁRIO E PEGAR O ID
                 headers:{
                    "x-access-token": "ygJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNpc3NhIiwiZW1haWwiOiJjaXNzYUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTQwMDEyMjN9.YuL3eegGBoymei4zhrGwVulDXuVdMgzp82c9WeMJ9RY"
                },
                body:{
                    "isAdmin": true
                }
            });
            equal(response.statusCode, 404);
        });

    //TESTES DE ERROS PARA ARTISTAS
       test('# POST /artist', async(t) => {  //TESTE CRIANDO UMA COISA QUE JÁ EXISTA
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
                    name: "Twice"
                }
            });
            equal(response.statusCode, 400);
        })

        test('# PUT /artist/:id', async(t) => {   // TESTE SEM O HEARDER
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/artists/6625014f7eff98a502ee0b13',
                body: {
                    name: "Miley Cyrus"
                }
            });
            equal(response.statusCode, 401);
        })

        test('# DELETE /artist/:id', async(t) => {  //DELETAR O RUEL QUE NÃO ESTÁ MAIS NA DATABASE
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
            equal(response.statusCode, 404);
        })

    // TESTES DE ERRO PARA ALBUNS DE MUSICA
        
        test('# POST /musicAlbum', async(t) => {  //ADICIONANDO O LOVER (QUE JÁ EXISTE)
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
            equal(response.statusCode, 400);
        })

        test('# PUT /musicAlbum/:id', async(t) => {  // USUÁRIO NÃO AUTORIZADO
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
            equal(response.statusCode, 401);
        })

        test('# DELETE /musicAlbum/:id', async(t) => {  //DELETE O ALBUM DO TWICE (FÓRMULA OU YOU-TH) ALBUM QUE NÃO ESTÁ NA DATABASE
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
            equal(response.statusCode, 404);
        })
 // TESTES DE ERRO PARA GÊNEROS MUSICAIS 
      test('# POST /musicGenre', async(t) => {  // ADCIONANDO MAIS UM GÊNERO MUSICAL (QUE JÁ EXISTE)
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
                    name: "Jazz",
                }
            });
            equal(response.statusCode, 400);
        })

        test('# PUT /musicGenre/:id', async(t) => {  //FAZENDO ALTERAÇÃO COM UM USUÁRIO QUE NÃO POSSUI ACESSO
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
            equal(response.statusCode, 401);
        })

        test('# DELETE /musicGenre/:id', async(t) => { //APAGANDO O GÊNERO MUSICAL SAMBA (QUE NÃO EXISTE NA DATABASE)
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
            equal(response.statusCode, 404);
        })

    })
      
  })

})
