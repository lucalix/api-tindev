O Tindev utiliza a API do github para configurar os dados dos usuários (nome, avatar, bio, etc).
Dessa forma, o usuário do tindev precisa apenas digitar seu username do github no momento do cadastro.

Essa API não possui nenhum modelo de autenticaço.

A API foi criada e configurada para utilizar o MongoDB Atlas (https://cloud.mongodb.com/).
Eles disponibilizam um cluster gratuíto com até 500mb de armazenamento.
Para connectar a API do Tindev em seu banco de dados MongoDB, no arquivo server.js, insira a URL de conexão gerada em seu cluster do MongoDB.

Para iniciar o servidor, basta executar o comando "yarn dev".
