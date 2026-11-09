# Fatec de Mauá

## Curso Superior de Tecnologia em Desenvolvimento de Software Multiplataforma

# Projeto de Extensão Comunitária

## Curricularização

### Desenvolvimento de um MVP para Gestão de Pedidos em Cafeterias

**Integrantes do projeto:**

- Aluno 01
- Aluno 02
- Aluno 03
- Aluno 04
- Aluno 05

**Mauá**
**Semestre X/202X**

---

## Sumário

1. [Características do Projeto de Extensão](#1-características-do-projeto-de-extensão)
2. [Informações da Equipe de Trabalho](#2-informações-da-equipe-de-trabalho)
3. [Etapa 1 – Desenvolvimento de documentação de Programação Mobile II](#3-etapa-1--desenvolvimento-de-documentação-de-programação-mobile-ii)
4. [Etapa 2 – Documentação de Segurança no Desenvolvimento de Aplicações](#4-etapa-2--documentação-de-segurança-no-desenvolvimento-de-aplicações)
5. [Etapa 3 – Documentação do Laboratório de Desenvolvimento de Dispositivos Móveis](#5-etapa-3--documentação-do-laboratório-de-desenvolvimento-de-dispositivos-móveis)
6. [Etapa 4 – Relato das ações e funções da equipe](#6-etapa-4--relato-das-ações-e-funções-da-equipe)
7. [Conclusão](#7-conclusão)

---

## 1. Características do Projeto de Extensão

| Item | Descrição |
| --- | --- |
| **Título** | Desenvolvimento de um MVP para gestão de pedidos em cafeterias. |
| **Temática** | ☒ Projetos. ☐ Programas. ☐ Cursos e oficinas. ☐ Eventos. ☐ Prestação de serviços. |
| **Descrição** | O projeto desenvolve o MyCoffe, uma aplicação para venda e gestão de pedidos de cafés. O MVP atende uma parte delimitada das regras de negócio de uma cafeteria. Ele permite consultar produtos, montar pedidos, informar endereço e acompanhar a operação interna. |
| **Carga horária** | Total de 240 horas-aula. |
| **Público-alvo** | Pequenas cafeterias, empreendedores locais, clientes das cafeterias e equipe de atendimento. |
| **Componentes curriculares** | Programação Mobile II, Segurança de Informações e Laboratório de Desenvolvimento de Dispositivos Móveis. |

### Objetivos

- Desenvolver uma solução digital para pedidos de cafés.
- Reduzir etapas no atendimento e registro de pedidos.
- Aplicar práticas de desenvolvimento seguro em uma aplicação integrada.
- Documentar decisões técnicas, riscos, testes e responsabilidades da equipe.
- Produzir material útil para uma cafeteria ou organização comunitária parceira.

### Ações e etapas de execução

1. Levantar o fluxo de venda e entrega de cafés.
2. Documentar requisitos e arquitetura do MVP.
3. Desenvolver as telas públicas, o carrinho e o fluxo de pedido.
4. Integrar o cliente web com uma API REST de terceiros.
5. Validar formulários, autenticação, permissões e tratamento de erros.
6. Testar a aplicação em navegadores de computador e dispositivos móveis.
7. Registrar as atividades e responsabilidades de cada integrante.

### Entregas

- Documento de requisitos, arquitetura, segurança e testes do MVP.
- Código-fonte do MyCoffe em repositório online.
- README com instruções de execução e arquitetura resumida.
- Relatório de equipe, responsabilidades e ações realizadas.
- Material de apresentação para a organização beneficiada.

### Instrumentos e procedimentos de avaliação

| Elemento avaliado | Critérios |
| --- | --- |
| Alunos | Participação, colaboração, qualidade técnica, documentação e entrega das tarefas. |
| MVP | Funcionamento do fluxo de pedido, organização do código, integração e adequação ao problema. |
| Extensão | Utilidade para a comunidade, clareza da apresentação e entrega dos resultados para a entidade beneficiada. |

### Formas de evidência

- Repositório com código-fonte e histórico de alterações.
- Documento técnico do projeto.
- Registros de testes de interface e integração.
- Registro de reunião, apresentação ou entrega para a organização parceira.
- Relato individual das atividades da equipe.

---

## 2. Informações da Equipe de Trabalho

| Nr. | Nome completo | E-mail | WhatsApp | Função principal |
| --- | --- | --- | --- | --- |
| 01 | Preencher nome | Preencher e-mail | Preencher contato | Coordenação e requisitos |
| 02 | Preencher nome | Preencher e-mail | Preencher contato | Interface e experiência do usuário |
| 03 | Preencher nome | Preencher e-mail | Preencher contato | Integração e regras do cliente |
| 04 | Preencher nome | Preencher e-mail | Preencher contato | Segurança e testes |
| 05 | Preencher nome | Preencher e-mail | Preencher contato | Documentação e validação |

**Nome do grupo:** MyCoffe

As funções orientam a divisão inicial do trabalho. Toda a equipe revisa as entregas antes da apresentação.

---

## 3. Etapa 1 – Desenvolvimento de documentação de Programação Mobile II

### Objetivo

Documentar a solução MyCoffe e registrar as decisões para uma interface responsiva. A aplicação atende navegadores móveis e computadores. Ela não gera pacotes nativos para Android ou iOS nesta versão.

### 3.1 Contexto e problema atendido

Pequenas cafeterias dependem de pedidos por mensagens, papel ou atendimento presencial. Esse processo dificulta a consulta de produtos, o cálculo do pedido e o acompanhamento do preparo. O MyCoffe centraliza o catálogo, o carrinho, o endereço e a confirmação do pedido.

### 3.2 Funcionalidades do MVP

| Área | Funcionalidades |
| --- | --- |
| Cliente | Cadastro, login, consulta de cafés, carrinho, endereço, pagamento e criação de pedido. |
| Funcionário | Consulta de pedidos, atualização de status e gestão de cafés e tags. |
| Administrador | Acesso às funcionalidades do funcionário e gestão de usuários. |

### 3.3 Arquitetura e tecnologias

O MyCoffe usa React, TypeScript e Vite. React Router controla as rotas. Styled Components organiza os estilos. React Hook Form e Zod controlam os formulários. Contextos React mantêm autenticação, carrinho e endereço.

O `ApiClient` concentra a comunicação com a API REST de terceiros. A aplicação usa ViaCEP para consultar dados de endereço pelo CEP. O navegador armazena carrinho e sessão no `localStorage`.

```text
Usuário
   │
   ▼
Interface React responsiva
   │
   ▼
Contextos e ApiClient
   │
   ├── API REST de terceiros
   └── ViaCEP
```

### 3.4 Navegação e validação da interface

O fluxo principal inicia no catálogo. O cliente adiciona cafés ao carrinho e acessa a finalização do pedido. A rota de finalização exige autenticação. O formulário coleta endereço e forma de pagamento. A aplicação apresenta uma confirmação após o envio do pedido.

As rotas administrativas exigem a função adequada. Funcionários acessam catálogo e pedidos. Administradores também acessam a gestão de usuários.

---

## 4. Etapa 2 – Documentação de Segurança no Desenvolvimento de Aplicações

### Objetivo

Identificar riscos de segurança no cliente web e registrar os controles aplicados ou necessários. A API é um serviço de terceiros. A equipe não controla a implementação interna desse serviço.

### 4.1 Ativos e riscos principais

| Ativo | Risco | Controle no cliente |
| --- | --- | --- |
| Credenciais | Envio indevido ou exposição de senha. | Formulários usam HTTPS pela URL da API e não registram senhas em mensagens da interface. |
| Token de acesso | Uso indevido após acesso ao navegador do cliente. | O token acompanha apenas requisições autenticadas. O usuário pode encerrar a sessão. |
| Dados de pedido | Alteração ou envio incompleto. | Formulários validam campos obrigatórios antes do envio. |
| Permissões | Acesso a telas internas sem função autorizada. | As rotas administrativas verificam autenticação e função do usuário. |
| Endereço | Consulta incorreta de CEP. | A aplicação valida oito dígitos antes da consulta ao ViaCEP. |

### 4.2 Autenticação e autorização

O cliente envia credenciais para o serviço de autenticação. A resposta inclui um token de acesso e os dados do usuário. O cliente envia o token no cabeçalho `Authorization: Bearer` em requisições protegidas.

As rotas usam os perfis `CLIENTE`, `FUNCIONARIO` e `ADMIN`. A interface bloqueia rotas não autorizadas. A API de terceiros deve validar permissões no servidor. A validação visual não substitui a autorização da API.

### 4.3 Validação e tratamento de dados

Os formulários validam campos antes do envio. O cadastro exige nome, e-mail e senha. O pedido exige itens, endereço e forma de pagamento. O CEP aceita oito dígitos. O cliente trata falhas de rede e apresenta mensagens para o usuário.

O cliente não deve confiar em valores recebidos do navegador. A API de terceiros deve validar preços, produtos, permissões e dados de pedido no servidor.

### 4.4 Melhorias de segurança planejadas

- Implementar expiração e renovação segura de sessão no serviço de autenticação.
- Avaliar armazenamento de sessão com cookies `HttpOnly` para reduzir exposição ao JavaScript.
- Adicionar testes automatizados para rotas protegidas e formulários.
- Definir política de privacidade e retenção de dados pessoais.
- Registrar eventos de segurança e erros sem incluir senhas ou tokens.

---

## 5. Etapa 3 – Documentação do Laboratório de Desenvolvimento de Dispositivos Móveis

### Objetivo

Validar a aplicação em telas móveis e documentar a integração de dados necessária ao MVP. A base persistente pertence à API REST de terceiros. O cliente web consome essa base por endpoints HTTP.

### 5.1 Estrutura de dados consumida

O MyCoffe trabalha com usuários, cafés, tags, formas de pagamento e pedidos. Um pedido contém itens, endereço, status, subtotal, taxa de entrega e total. O carrinho mantém itens e quantidades no navegador até a confirmação do pedido.

### 5.2 Integração com serviços

| Serviço | Uso |
| --- | --- |
| API REST de terceiros | Autenticação, usuários, catálogo, tags, pagamentos e pedidos. |
| ViaCEP | Consulta de logradouro, bairro, cidade e unidade federativa pelo CEP. |
| `localStorage` | Persistência local de carrinho e sessão no navegador. |

### 5.3 Compatibilidade móvel

O projeto usa uma interface responsiva. O navegador executa a mesma aplicação em computadores, celulares e tablets. Os testes devem cobrir largura reduzida, campos de formulário, navegação por toque e envio de pedido.

| Cenário | Resultado esperado |
| --- | --- |
| Tela pequena | Conteúdo permanece legível e os controles permanecem acessíveis. |
| Carrinho | O usuário altera quantidade e remove produtos. |
| Formulário | O usuário informa endereço e pagamento sem corte de campos. |
| Falha de rede | A aplicação mostra uma mensagem clara e permite nova tentativa. |

### 5.4 Execução e build

O projeto usa Bun como gerenciador de pacotes. Os comandos principais são:

```bash
bun install
bun run dev
bun run typecheck
bun run build
```

O comando de verificação usa TypeScript. O comando de build usa Vite. A equipe deve registrar os resultados de execução antes da entrega.

---

## 6. Etapa 4 – Relato das ações e funções da equipe

### Objetivo

Aplicar práticas de gerenciamento de equipe. A etapa registra habilidades técnicas e humanas, responsabilidades e resultados de cada integrante.

### 6.1 Organização do trabalho

O grupo divide o projeto em requisitos, interface, integração, segurança, testes e documentação. O grupo acompanha tarefas em uma lista compartilhada. Cada entrega recebe revisão de pelo menos outro integrante.

### 6.2 Funções e responsabilidades

| Integrante | Responsabilidades | Evidência esperada |
| --- | --- | --- |
| Aluno 01 | Coordenar reuniões, consolidar requisitos e acompanhar o cronograma. | Atas, lista de tarefas e revisão dos requisitos. |
| Aluno 02 | Construir telas responsivas e revisar a experiência do usuário. | Componentes, protótipos e testes de interface. |
| Aluno 03 | Implementar integrações e fluxos de autenticação e pedidos. | Chamadas à API e testes de integração. |
| Aluno 04 | Mapear riscos, revisar controles e executar testes de segurança. | Matriz de riscos e relatório de testes. |
| Aluno 05 | Manter a documentação e validar as entregas do grupo. | README, relatório de extensão e registros de validação. |

### 6.3 Habilidades aplicadas

| Tipo | Habilidades |
| --- | --- |
| Técnicas | React, TypeScript, formulários, rotas, integração REST, validação e controle de versão. |
| Humanas | Comunicação, planejamento, colaboração, revisão de pares e apresentação. |

### 6.4 Relato de execução

Cada integrante deve preencher seu relato antes da entrega final:

| Integrante | Atividades executadas | Dificuldades | Solução aplicada | Data |
| --- | --- | --- | --- | --- |
| Aluno 01 | Preencher | Preencher | Preencher | Preencher |
| Aluno 02 | Preencher | Preencher | Preencher | Preencher |
| Aluno 03 | Preencher | Preencher | Preencher | Preencher |
| Aluno 04 | Preencher | Preencher | Preencher | Preencher |
| Aluno 05 | Preencher | Preencher | Preencher | Preencher |

---

## 7. Conclusão

O MyCoffe demonstra a viabilidade de um MVP para gestão de pedidos em cafeterias. A solução organiza o catálogo, o carrinho, o endereço e o pedido em um fluxo único. A área administrativa apoia a manutenção de produtos, pedidos e usuários.

O projeto contribui para a comunidade ao propor uma alternativa digital para pequenos negócios que precisam organizar vendas e atendimento. A equipe aplica conhecimentos de interface, integração, segurança, responsividade e organização do trabalho.

Os principais desafios são a dependência de uma API de terceiros, a proteção de dados de sessão e a validação em dispositivos móveis reais. As próximas etapas incluem testes automatizados, validação com uma cafeteria parceira, pagamentos online, notificações de status e uma versão nativa para dispositivos móveis.
