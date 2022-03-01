<h1 align="center">api-vendas</h1>

## API Restful com Node.js, Express, Typescript, TypeORM, Postgres, Redis, Docker, etc ...

Uma aplicação backend para gestão de vendas com funcionalidades para criação de cadastro de produtos, cadastro de clientes, pedidos de compras e uma completa gestão de usuários da aplicação, com autenticação via Token JWT, recuperação de senha por email, atualização de perfil, atualização de avatar, e muito mais.

Através do TypeORM implementaremos Entidades e Repositórios para cada recurso a ser consumido na API.

## Rodando a aplicação no seu PC

Faça um clone deste repositório e instale no seu ambiente de desenvolvimento usando o seguinte comando no seu terminal (escolha um diretório apropriado):

```bash
git clone https://github.com/kalangoti/api-vendas.git
```

Após clonar o conteúdo do repositório, acesse o diretório criado e efetue a instalação das dependências:

```bash
cd api-vendas

yarn

# ou

npm install
```

Após essa instalação, crie o arquivo `ormconfig.json` a partir do `ormconfig-sample.json` e rode o docker local:

```bash
docker run --name pg-apivendas -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Execute a aplicação com o comando `yarn dev` ou `npm run dev`. O servidor estará em execução no endereço `http://localhost:3333`.
