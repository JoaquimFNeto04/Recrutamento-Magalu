***** ReadMe - Aplicativo de Integração com MongoDB e API ***** 

Descrição:

    Este repositório contém um aplicativo de integração com o MongoDB e uma API de terceiros. O aplicativo é desenvolvido em Node.js e tem como objetivo realizar solicitações POST e GET para a API de terceiros, gravar os logs das solicitações em um arquivo de log local (log.txt) e também armazenar os logs no banco de dados MongoDB. Além disso, o aplicativo utiliza um módulo de ajuda (helpers.js) para converter as credenciais de autenticação em formato Basic.

* Arquivo app.js
    
    Funcionalidades
        1. Conexão com o MongoDB: O arquivo app.js inicia uma conexão com o MongoDB, utilizando as credenciais de usuário = "dev" e senha = "Magazine123" (Essas credenciais também são usadas para acessar o banco de dados via web no portal mongodb.com).
        
        2. Endpoints POST e GET: O aplicativo define dois endpoints principais: POST / e GET /.
            O endpoint POST / realiza uma solicitação POST para a API de terceiros fornecida para o desafio, registra o log da solicitação no arquivo log.txt e no banco de dados MongoDB.
            O endpoint GET / realiza uma solicitação GET para a API de terceiros fornecida para o desafio, registra o log da solicitação no arquivo log.txt e no banco de dados MongoDB.
        
        3. Registro de Logs: Os logs das solicitações são registrados em dois locais:
            Em um arquivo local log.txt, com data e hora da solicitação.
            No banco de dados MongoDB, utilizando um schema definido.

* Dependências
    
    express: Framework Node.js para criação de APIs.
    mongoose: Biblioteca para facilitar a interação com o MongoDB.
    request: Módulo para fazer solicitações HTTP para a API de terceiros.
    fs: Módulo para operações de sistema de arquivos.
    helpers.js: Um módulo de ajuda para converter as credenciais de autenticação em formato Basic.

* Arquivo helpers.js
    O arquivo helpers.js contém uma classe Helpers com um único método ConvertBasic. Esse método é utilizado no arquivo app.js para converter as credenciais de autenticação (nome de usuário e senha) em um formato Basic, que é comumente usado em cabeçalhos de autorização HTTP.