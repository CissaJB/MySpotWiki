# Trabalho2 do 1°Bimestre (Programação avançada para WEB)

### Alunas: Beatriz Brito Oliveira e Cecilia de Jesus Barros
### Professor: Wagner de Andrade Perin
### Turma: CC5MB

## _MySpotWiki_
### Contexto:

Este projeto é uma oportunidade para você demonstrar sua compreensão dos principais
conceitos de desenvolvimento web, incluindo autenticação de usuário, persistência de
dados e implementação de rotas seguras. Ao contrário do projeto "dositio", você tem a
liberdade de escolher o tema e os objetivos do seu próprio projeto, desde que atendam aos
critérios descritos abaixo:

### Requisitos Necessários no Projeto
- `Registro e autenticação do usuário`: Implemente uma rota para registros de novos
usuários, incluindo rota e funcionalidade de autenticação de usuário usando JWT
(JSON Web Tokens)
- `Persistência de dados`: Seu aplicativo deve permitir a persistência das
informações. Podem ser perfis de usuário, postagens de blog, listas de produtos ou
qualquer outra entidade relacionada ao tema do seu projeto. Implemente rotas para
recuperar uma lista de itens ou um item específico previamente cadastrado.
- `Rota autenticada`: Certifique-se de que pelo menos uma de suas rotas esteja
protegida e só possa ser acessada por usuários autenticados. Isso demonstrará sua
capacidade de proteger partes do seu aplicativo.
- `Códigos de status HTTP`: Seu aplicativo deve usar corretamente códigos de status
HTTP para indicar o sucesso ou a falha das solicitações.
- `Documentação`: Forneça um README detalhado em seu repositório descrevendo
como configurar e executar seu servidor de aplicativos. Isso deve incluir quaisquer
pré-requisitos, etapas de instalação e como acessar as rotas da API.
- `Cobertura de teste`: Inclua cobertura de teste para os endpoints do seu aplicativo.
Certifique-se de que seus testes validem a funcionalidade e a segurança de sua API.

### Para iniciar:
- faça um **cd** para a pasta **MySpotWiki-main**
- No terminal faça **npm install** para instalar todas as dependências utilizadas no projeto

### Para colocar os dados no servidor:
No Projeto existe uma pasta chamada dados...nela coloquei os arquivos JSON criados por mim para o meu banco de dados, como utilizar:
- Crie uma conexão com o Mongodb "mongodb://127.0.0.1/trabalhoB1"
- Crie uma database com o nome "trabalhoB1"
- Crie uma coleção com o nome "artist" e Importe o arquivo "trabalhoB1.artist.json"
- Crie agora uma coleção "gMusic" e Importe o arquivo "trabalhoB1.gMusic.json"
- Crie uma coleção "musicAlbum" e Importe o arquivo "trabalhoB1.musicAlbum.json"
- Crie uma coleção "user" e Importe o arquivo "trabalhoB1.user.json"

### Para fazer os testes
Com os arquivos já no servidor, agora é a hora de testar
- Utilize o comando **npm run test**
  
**NÃO** teste mais de 1 vez, pois como há testes de POST e DELETE os dados do servidor vão ser alterados, para testar novamente apague os dados no Mongo, carregue os arquivos novamente e inicie o teste.

### Utilizando o Thunderclient
A também uma maneira de adicionar os dados pelo thunderclient,mas antes é necessário "rodar" o servidor, no terminal faça **npm run dev**.

Com o servidor pronto:

### Criando um Usuário:
````
"username": "NovoUsuário"  
"email": "NovoUsuário@gmail.com"
"isAdmin": "true"

````
Ao criar um usuário um token é gerado, mesmo que todos os usuários tenham um token apenas usuários administradores (definidos pelo campo booleano isAdmin, que por padrão é falso) podem realizar ações como POST, PUT e DELETE de todos os usuários.

### Rotas Existentes e Ações Possíveis
- /artist -> POST e GET
  - /artist/:id -> PUT e DELETE 
  - /artist/:name/musicAlbum -> GET => mostra todos os albuns de um dado artista
- /musicAlbum -> POST e GET
  -/musicAlbum/:id -> PUT e DELETE
- /musicGenre -> POST e GET
  - /musicGenre/:id -> PUT e DELETE
  - /musicGenre/:id/musicAlbum -> GET => mostra todos os albuns pertencentes a um gênero musical especificado
- /user -> POST, GET e DELETE
  - /user/:id -> PUT, GET e DELETE

    
**`OBS:`** Ao usar o DELETE do /user significa que o próprio usuário está se deletando do banco. Enquanto todas as outras rotas de POST, PUT e DELETE tem que ser de um usuário administrador

Por exemplo para criar um novo artista, faça um POST em /artist e adicione no body:
````
{
   "name": "Ariana Grande"
}
```` 
**`OBS:`** Só será possível se o dado não estiver presente no servidor

Por exemplo para criar um novo álbum, faça um POST em /musicAlbum e adicione no body:
````
{
"name": "Eternal Sunshine"
"artist": "Ariana Grande"
"genre_id": "66244c9cce6de20b1248ca39"
"year": 2024
}
````
Por exemplo para criar um novo gênero musical, faça um POST em /musicGenre e adicione no body:
````
{
   "name": "Samba"
}
````
