# Trybe Futebol Clube - TFC ⚽

O aplicativo TFC é um site informativo sobre partidas e classificações de futebol! ⚽️

<details>
<summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />

  Nesse projeto, construi **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. O desenvolvimento foi feito para **respeitar regras de negócio** providas no projeto e **a API foi capaz de ser consumida por um front-end**.

</details>

<details>
<summary><strong>🏟️ Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - É um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3306` do `localhost`;
  - Também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - A aplicação é inicializada a partir do arquivo `app/backend/src/server.ts`;
 - O `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;


3️⃣ **Front-end:**
  - O front já está concluído, não é necessário realizar modificações no mesmo. A única exceção será seu Dockerfile que precisará ser configurado.
  - Todos os testes a partir do requisito de login usam o `puppeteer` para simular uma pessoa acessando o site `http://localhost:3000/`;
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints construídos nos requisitos.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up`;
  - As `Dockerfiles` estão configuradas corretamente nas raízes do `front-end` e `back-end`, para conseguir inicializar a aplicação;

</details>

<details>
<summary><strong>👁️Confira como ficou</strong></summary><br />

![Leaderboard](https://github.com/user-attachments/assets/a61e1ca5-b751-4977-b257-03c6c92da00a)
![Partidas finalizadas](https://github.com/user-attachments/assets/9ad6a00b-9633-4ce5-bf32-5ec35f2ab5af)
![Partidas em andamento e finalizadas](https://github.com/user-attachments/assets/504f5f0d-dcab-4db2-ada2-fe90172bafb1)




https://github.com/user-attachments/assets/b9147bd0-9c17-4aba-8f85-6f9681fbe1a2



</details>

<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
