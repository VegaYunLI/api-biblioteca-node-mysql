# Recapitulada do Projeto

Este documento resume os principais conceitos estudados até agora.

---

# 1. Node.js

Node.js permite executar JavaScript fora do navegador.

No projeto, ele é usado para criar o servidor backend.

---

# 2. Express

Express é um framework para Node.js.

Framework é uma ferramenta que fornece uma estrutura pronta para facilitar o desenvolvimento.

Usamos Express para criar rotas como:

```http
GET /livros
POST /livros
PUT /livros/:id
DELETE /livros/:id
```

---

# 3. API REST

API é uma forma de comunicação entre sistemas.

REST é um estilo de organização de APIs baseado em recursos e métodos HTTP.

No projeto, o principal recurso é:

```text
/livros
```

Os métodos indicam a ação:

```text
GET     buscar dados
POST    criar dados
PUT     atualizar dados
PATCH   alterar parcialmente
DELETE  remover dados
```

---

# 4. JSON

JSON é um formato de troca de dados.

Exemplo:

```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis"
}
```

APIs REST geralmente recebem e devolvem dados nesse formato.

---

# 5. MySQL

MySQL é um sistema gerenciador de banco de dados relacional.

Ele guarda dados em tabelas.

No projeto, usamos a tabela:

```text
livros
```

---

# 6. Banco de dados relacional

Um banco relacional organiza dados em tabelas formadas por linhas e colunas.

Exemplo da tabela `livros`:

```text
id
titulo
autor
ano_publicacao
genero
disponivel
criado_em
atualizado_em
```

---

# 7. SQL

SQL é a linguagem usada para conversar com bancos relacionais.

Exemplos:

```sql
SELECT * FROM livros;

INSERT INTO livros (titulo, autor)
VALUES ('Dom Casmurro', 'Machado de Assis');

UPDATE livros
SET disponivel = FALSE
WHERE id = 1;

DELETE FROM livros
WHERE id = 1;
```

---

# 8. mysql2

mysql2 é a biblioteca que permite o Node.js conversar com o MySQL.

Usamos:

```js
import mysql from 'mysql2/promise';
```

A versão com `promise` permite usar `async/await`.

---

# 9. async/await

`async/await` é uma forma de lidar com operações assíncronas.

Operação assíncrona é uma ação que pode demorar, como consultar o banco.

Exemplo:

```js
const books = await findAllBooks();
```

A palavra `await` significa:

```text
espere essa operação terminar antes de continuar
```

---

# 10. Pool de conexões

Pool de conexões é um conjunto de conexões reutilizáveis com o banco.

Em vez de abrir uma conexão nova para cada requisição, o projeto reutiliza conexões já existentes.

Isso é mais eficiente.

---

# 11. Variáveis de ambiente

Variáveis de ambiente guardam configurações fora do código.

Exemplo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=biblioteca_db
```

O arquivo `.env` não deve ir para o GitHub porque pode conter senhas.

Por isso criamos o `.env.example`.

---

# 12. MVC

MVC significa:

```text
Model
View
Controller
```

Neste projeto, como é uma API, usamos uma adaptação:

```text
routes → controllers → models → database
```

---

## Routes

Definem os caminhos da API.

Exemplo:

```js
router.get('/', listBooks);
router.post('/', storeBook);
```

---

## Controllers

Recebem a requisição, validam dados e enviam resposta.

Exemplo:

```js
export async function storeBook(req, res, next) {
  // valida dados
  // chama model
  // responde em JSON
}
```

---

## Models

Conversam com o banco de dados.

Exemplo:

```js
export async function findBookById(id) {
  const [rows] = await pool.query(
    'SELECT * FROM livros WHERE id = ?',
    [id]
  );

  return rows[0];
}
```

---

# 13. CRUD

CRUD é a base de muitos sistemas.

Significa:

```text
Create  → criar
Read    → ler
Update  → atualizar
Delete  → deletar
```

No projeto:

```text
POST /livros        → Create
GET /livros         → Read
GET /livros/:id     → Read
PUT /livros/:id     → Update
DELETE /livros/:id  → Delete
```

---

# 14. PUT

PUT é usado para atualizar os dados principais de um recurso.

Exemplo:

```http
PUT /livros/1
```

Usamos para alterar:

```text
titulo
autor
ano_publicacao
genero
```

---

# 15. PATCH

PATCH é usado para atualização parcial.

No projeto:

```http
PATCH /livros/1/emprestar
PATCH /livros/1/devolver
```

Essas rotas mudam apenas o estado de disponibilidade do livro.

---

# 16. Ação de negócio

Uma ação de negócio é uma operação que representa uma regra real do sistema.

Exemplos:

```text
emprestar livro
devolver livro
cancelar pedido
aprovar cadastro
```

Emprestar e devolver não são apenas atualizações genéricas. Elas têm significado dentro do sistema de biblioteca.

---

# 17. Params

Params são valores variáveis dentro da rota.

Exemplo:

```http
GET /livros/1
```

Na rota:

```js
router.get('/:id', showBook);
```

No controller:

```js
req.params.id
```

---

# 18. Query params

Query params são filtros enviados pela URL depois do `?`.

Exemplo:

```http
GET /livros?genero=romance&disponivel=true
```

No controller:

```js
req.query.genero
req.query.disponivel
```

Usamos query params para filtros porque eles deixam a rota flexível.

---

# 19. Middleware

Middleware é uma função que fica no meio do fluxo entre requisição e resposta.

Exemplo:

```js
app.use(express.json());
```

Esse middleware permite que o Express leia JSON no corpo da requisição.

---

# 20. Middleware 404

O middleware 404 responde quando a rota não existe.

Exemplo:

```json
{
  "message": "Rota não encontrada"
}
```

Isso é melhor do que deixar o Express retornar uma página HTML padrão.

---

# 21. Middleware de erro

Middleware de erro centraliza erros inesperados.

Ele recebe quatro parâmetros:

```js
(error, req, res, next)
```

Quando usamos:

```js
next(error);
```

O erro é enviado para esse middleware.

---

# 22. Status HTTP

Status HTTP indica o resultado de uma requisição.

Alguns exemplos usados:

```text
200 → sucesso
201 → criado com sucesso
400 → erro nos dados enviados
404 → recurso não encontrado
500 → erro interno do servidor
```

---

# 23. Prepared statements

Prepared statements usam `?` nas queries SQL.

Exemplo:

```js
pool.query(
  'SELECT * FROM livros WHERE id = ?',
  [id]
);
```

Isso ajuda a proteger contra SQL Injection.

---

# 24. SQL Injection

SQL Injection é quando alguém tenta enviar código SQL malicioso dentro de um campo comum.

Exemplo perigoso:

```js
`SELECT * FROM livros WHERE id = ${id}`
```

Forma mais segura:

```js
pool.query(
  'SELECT * FROM livros WHERE id = ?',
  [id]
);
```

---

# 25. Boolean no MySQL

No MySQL, `BOOLEAN` normalmente é tratado como `TINYINT(1)`.

Ou seja:

```text
TRUE  → 1
FALSE → 0
```

Por isso, no Model, convertemos:

```js
disponivel: Boolean(book.disponivel)
```

Assim a API responde com:

```json
{
  "disponivel": true
}
```

em vez de:

```json
{
  "disponivel": 1
}
```

---

# 26. Operador ??

O operador `??` é chamado de nullish coalescing.

Ele usa o valor da direita apenas quando o valor da esquerda é:

```text
null
undefined
```

Exemplo:

```js
false ?? null
```

Resultado:

```js
false
```

Isso foi útil porque `false` é um valor válido para o filtro `disponivel`.

Se usássemos `||`, teríamos problema:

```js
false || null
```

Resultado:

```js
null
```

---

# 27. Export e import

Usamos `export` para permitir que funções sejam usadas em outros arquivos.

Exemplo:

```js
export async function findAllBooks() {}
```

Importando:

```js
import { findAllBooks } from '../models/bookModel.js';
```

Isso permite separar o projeto em vários arquivos organizados.

---

# 28. Testes manuais

Criamos arquivos para testar a API:

```text
tests/livros.http
tests/powershell/livros-crud.ps1
```

Eles ajudam a verificar se as rotas continuam funcionando após mudanças.

---

# 29. Git e GitHub

Git é usado para versionar o projeto.

GitHub é usado para hospedar o repositório online.

Arquivos que não devem ir para o GitHub:

```text
node_modules
.env
```

Arquivos que devem ir:

```text
src
docs
database
tests
README.md
.env.example
package.json
```

---

# 30. Estado atual do projeto

O projeto atualmente possui:

```text
API REST com Express
Conexão com MySQL
CRUD de livros
Emprestar e devolver livros
Filtros por query params
Estrutura MVC
Middlewares
Documentação
Arquivos de teste manual
```

Próximos passos possíveis:

```text
cadastro de usuários
hash de senha com bcrypt
login
JWT
middleware de autenticação
tabela de empréstimos
relacionamentos entre usuários e livros
testes automatizados
```
