# API Biblioteca

API REST para gerenciamento de livros de uma biblioteca, desenvolvida com Node.js, Express e MySQL.

Este projeto foi criado com foco em aprendizado profissional de backend, usando organização em camadas, conexão com banco de dados relacional, rotas REST, CRUD, filtros e tratamento de erros.

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- mysql2
- dotenv
- nodemon

## Funcionalidades atuais

- Listar livros
- Buscar livro por ID
- Cadastrar livro
- Atualizar livro
- Deletar livro
- Emprestar livro
- Devolver livro
- Filtrar livros por título, autor, gênero e disponibilidade
- Tratamento de rota não encontrada
- Tratamento global de erros

## Estrutura de pastas

```text
api-biblioteca
├── database
│   ├── schema.sql
│   └── seed.sql
│
├── docs
│   ├── API.md
│   └── RECAP.md
│
├── src
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   └── bookController.js
│   │
│   ├── middlewares
│   │   ├── errorHandler.js
│   │   └── notFoundHandler.js
│   │
│   ├── models
│   │   └── bookModel.js
│   │
│   ├── routes
│   │   └── bookRoutes.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests
│   └── livros.http
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
