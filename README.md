### api para listar games e filtrar por titulo, nome e plataforma

## Para instalas as dependencias

```bash
npm install
```
### Caso precise instalar as dependencias seguindo a versão exata do package.json use
```bash
npm ci
```

### Na raiz do projeto crie um arquivo .env e adicione as variaveis de ambiente
```bash
PORT=3000
```
e dados da conexão com o banco postgresql
- user: nome do usuario no banco
- password: senha do banco de dados
- localhost: url ou ip para bancos externos caso seja na propia maquina pode manter localhost
- 5432: Porta padrão caso use uma porta diferente altere para a porta em uso
- database_name: Nome do banco de dados
- schema: padrão é public mas use o nome da sua schema

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"
```

#### criando a tabela no banco usando prisma
```bash
npx prisma migrate dev --create-game init
```
e após
```bash
npx prisma generate
```

Ou caso queria cria a tabela diréto no banco execute o comando diréto no banco de dados
```bash
CREATE TABLE public.game (
    id serial4 NOT NULL,
    title varchar(250) NOT NULL,
    description text NOT NULL,
    platforms varchar NOT NULL,
    releasedate timestamp NOT NULL,
    rating float4 DEFAULT 0 NOT NULL,
    coverimage varchar NULL,
    CONSTRAINT game_pk PRIMARY KEY (id)
);
```

após criar a tabela direto no banco atualize o arquivo schema.prisma com o comando abaixo
```bash
npx prisma db pull
```

### Rodar o projeto em desenvolvimento sem usar o docker

```bash
npm run start:dev
```

### Rodar o projeto em desenvolvimento usando o docker
```bash
docker-compose up --build
```

### Testar api e visualizar documentação no Swagger
```bash
http://localhost:3000/api
```

## Rodar teste

```bash
npm run test:e2e
```

## Deploy em produção
```bash
npm run start:prod
```
ou mais recomendado
Instale o PM2 no servidor em produção
```bash
npm install -g pm2
```
Inicie a aplicação com name 'games'
```bash
pm2 start dist/main.js --name games --env production
```
Configure a reinicialização da aplicação
```bash
pm2 save
pm2 startup
```
