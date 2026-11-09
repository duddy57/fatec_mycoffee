# MyCoffe

Aplicação web responsiva para venda e entrega de cafés. O cliente consulta o catálogo, seleciona produtos, informa o endereço e confirma o pedido. A equipe interna administra produtos, pedidos e usuários.

## 1. Introdução

### Objetivo

O MyCoffe reduz etapas no pedido de café. A aplicação reúne catálogo, carrinho, pagamento, endereço e acompanhamento em um único fluxo. A equipe usa uma área restrita para manter o catálogo e atender pedidos.

### Público-alvo

| Perfil | Necessidade atendida |
| --- | --- |
| Cliente | Encontrar cafés, montar um pedido e informar o endereço de entrega. |
| Funcionário | Consultar pedidos e manter cafés e tags do catálogo. |
| Administrador | Gerenciar usuários, produtos, tags e pedidos. |

O cliente usa computador ou navegador móvel. Funcionários e administradores usam a área interna com permissões por função.

### Tecnologia escolhida

O projeto usa React 18, TypeScript e Vite. React constrói interfaces por componentes reutilizáveis. TypeScript reduz erros de tipos. Vite oferece execução local e geração de arquivos de produção rápidos.

O projeto é uma aplicação web responsiva, com 2 versões mobile, uma em **Flutter** e outra utilizando o **React Native**.

## 2. Arquitetura do software

### Visão geral

A aplicação usa uma arquitetura em camadas:

1. **Apresentação:** páginas, componentes visuais e rotas React.
2. **Estado e regras do cliente:** contextos de autenticação, carrinho e endereço.
3. **Integração:** `ApiClient` centraliza as requisições HTTP para a API REST.
4. **Dados:** a API REST de terceiros persiste usuários, cafés, tags, pagamentos e pedidos.

O navegador se comunica com a API por HTTPS. O cliente envia o token Bearer após a autenticação. A API aplica as permissões de cliente, funcionário e administrador.

```text
┌───────────────────────────────────────────────┐
│ Navegador                                     │
│ React + React Router + Styled Components      │
└──────────────────────┬────────────────────────┘
                       │
             Contextos e ApiClient
                       │ HTTPS / JSON
                       ▼
┌───────────────────────────────────────────────┐
│ API REST de terceiros                         │
│ Autenticação, catálogo, usuários e pedidos    │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ Dados da API                                  │
│ Usuários, cafés, tags, pagamentos e pedidos   │
└───────────────────────────────────────────────┘

Serviço externo: ViaCEP consulta o endereço a partir do CEP informado.
```

### Compatibilidade entre plataformas

O Vite gera arquivos HTML, CSS e JavaScript compatíveis com navegadores modernos. O layout responsivo atende telas pequenas e grandes. O mesmo código atende navegadores móveis em iOS e Android.

A versão atual usa React Native e Flutter.

### Componentes principais

#### Interface

- **React Router:** define rotas públicas, rotas autenticadas e rotas por função.
- **Styled Components:** define os estilos dos componentes.
- **React Hook Form e Zod:** controlam e validam os formulários de cadastro e pedido.
- **Phosphor Icons:** fornece ícones da interface.

As telas principais são:

- Página inicial e catálogo de cafés.
- Login e cadastro.
- Carrinho e confirmação do pedido.
- Confirmação de entrega.
- Painel administrativo de usuários, cafés e pedidos.

#### Lógica de negócios

Os contextos React mantêm o estado compartilhado:

| Contexto | Responsabilidade |
| --- | --- |
| `AuthContext` | Mantém a sessão, o token e os dados do usuário autenticado. |
| `CartContext` | Adiciona produtos, altera quantidades, calcula o total e limpa o carrinho. |
| `DeliveryLocationContext` | Controla a seleção do endereço de entrega. |

O `ApiClient` em `src/services/api.ts` concentra as chamadas à API. Ele adiciona o token de autenticação, envia JSON ou `FormData` e converte respostas de erro.

O navegador armazena o carrinho e a sessão no `localStorage`. A aplicação consulta `/auth/me` ao iniciar uma sessão armazenada.

#### Acesso a recursos nativos

A versão atual não usa câmera, GPS, notificações push ou armazenamento nativo. A aplicação consulta o ViaCEP para preencher endereço pelo CEP. O usuário informa o número e o complemento do endereço.

### Tecnologias e ferramentas

| Tecnologia | Uso no projeto |
| --- | --- |
| React 18 | Componentes e interface. |
| TypeScript | Tipagem estática. |
| Vite | Desenvolvimento e build. |
| React Router DOM | Navegação entre páginas. |
| Styled Components | Estilos da interface. |
| React Hook Form | Estado dos formulários. |
| Zod | Validação de dados dos formulários. |
| Immer | Atualização imutável do carrinho. |
| API REST | Dados de usuários, produtos, pagamentos e pedidos. |
| ViaCEP | Consulta de endereço por CEP. |

## 3. Justificativa para a escolha da tecnologia

React atende o escopo atual porque o projeto precisa de catálogo, formulários, carrinho e painéis administrativos. A tecnologia permite dividir a interface em componentes e reutilizar regras de apresentação.

TypeScript melhora a manutenção ao definir os formatos de usuário, café, pedido e resposta da API. React Hook Form e Zod reduzem código manual de formulário e validação.

| Tecnologia | Avaliação para este projeto |
| --- | --- |
| React web | Escolha atual. Atende o navegador, o catálogo e a integração REST. |
| React Native | Gera aplicativos móveis nativos. Exige adaptação da interface e do projeto atual. |
| Flutter | Gera aplicativos multiplataforma. Exige reescrita em Dart. |
| Kotlin ou Java | Atendem Android nativo. Exigem uma base separada para iOS. |
| Swift | Atende iOS nativo. Exige uma base separada para Android. |

React reduz o tempo de desenvolvimento porque a aplicação já usa JavaScript e TypeScript. A comunidade oferece ampla documentação para formulários, roteamento e integração HTTP.

## 4. Diagrama de arquitetura

```text
Cliente ou equipe
        │
        ▼
Interface React
  ├── Catálogo
  ├── Autenticação
  ├── Carrinho e pedido
  └── Administração
        │
        ▼
Contextos React
  ├── Autenticação
  ├── Carrinho
  └── Endereço
        │
        ▼
ApiClient
   ├── API REST de terceiros
  └── ViaCEP
        │
        ▼
Dados remotos e localStorage
```

## 5. Fluxo do usuário

### Fluxo de compra

```text
Início
  │
  ▼
Consulta o catálogo
  │
  ▼
Adiciona cafés ao carrinho
  │
  ▼
Faz login ou cadastro
  │
  ▼
Informa endereço e pagamento
  │
  ▼
Confirma o pedido
  │
  ▼
Recebe a confirmação da entrega
```

1. O cliente acessa a página inicial e consulta os cafés disponíveis.
2. O cliente adiciona produtos e quantidades ao carrinho.
3. O cliente entra ou cria uma conta antes de finalizar o pedido.
4. O cliente informa CEP, endereço, forma de pagamento e itens escolhidos.
5. A aplicação envia o pedido para a API REST.
6. A tela de entrega apresenta o resumo do pedido confirmado.

### Fluxo administrativo

1. O funcionário ou administrador faz login.
2. A aplicação verifica a função do usuário.
3. Funcionários acessam catálogo e pedidos.
4. Administradores acessam também a gestão de usuários.
5. A equipe cria ou desativa cafés, cria tags e atualiza pedidos.

## 6. Execução local

### Requisitos

- Bun 1.4.3.
- Acesso à API REST de terceiros.

### Instalação

```bash
bun install
bun run dev
```

O Vite mostra a URL local no terminal. Use `bun run typecheck` para validar os tipos. Use `bun run build` para validar o build de produção.

### Configuração da API

O cliente usa a URL padrão configurada em `src/services/api.ts`. Defina `VITE_API_URL` para usar outra URL de API durante o desenvolvimento.

```bash
VITE_API_URL=https://sua-api.exemplo.com bun run dev
```

## 7. Conclusão

O MyCoffe entrega um fluxo completo de compra de cafés pela web. O sistema integra autenticação, catálogo, carrinho, endereço, pagamento e pedido. A área administrativa permite a operação do catálogo e dos pedidos.

### Desafios e considerações

- A aplicação depende da disponibilidade da API REST de terceiros e do ViaCEP.
- O navegador armazena a sessão no `localStorage`.
- A responsividade precisa de validação em tamanhos reais de tela.
- A aplicação não oferece recursos nativos de dispositivo na versão atual.

### Melhorias futuras

- Criar aplicativo nativo com React Native ou Flutter.
- Adicionar notificações sobre alterações de status do pedido.
- Integrar rastreamento de entrega com localização autorizada.
- Adicionar pagamento online.
- Criar histórico de pedidos para o cliente.
- Adicionar testes automatizados de interface e integração.
