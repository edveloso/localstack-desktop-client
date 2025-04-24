# LocalStack Portal

Este é um portal de gerenciamento para serviços da AWS em execução no LocalStack. Ele permite visualizar e gerenciar serviços como S3, SQS, DynamoDB, Lambda e CloudWatch Logs em um ambiente local.

## Funcionalidades

- **S3 Buckets**: Listar buckets e visualizar objetos dentro de um bucket.
- **SQS Queues**: Listar filas, visualizar mensagens e receber mensagens de uma fila.
- **DynamoDB Tables**: Listar tabelas disponíveis.
- **Lambda Functions**: Listar funções Lambda.
- **CloudWatch Logs**: Listar grupos de logs e visualizar eventos de log.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [LocalStack](https://localstack.cloud/) configurado e em execução
- Gerenciador de pacotes como `npm`, `yarn` ou `pnpm`

## Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/localstack-portal.git
   cd localstack-portal
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. Certifique-se de que o LocalStack está em execução na porta padrão (`http://localhost:4566`).

4. Configure o arquivo `src/lib/aws/client.ts` para apontar para o endpoint do LocalStack, se necessário.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run start`: Inicia o servidor em modo de produção.
- `npm run lint`: Verifica problemas de lint no código.

## Como Usar

1. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

2. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

3. Navegue pelos serviços disponíveis:

   - **S3 Buckets**: Clique em um bucket para visualizar seus objetos.
   - **SQS Queues**: Clique em uma fila para visualizar mensagens.
   - **CloudWatch Logs**: Clique em um grupo de logs para visualizar eventos.
   - **DynamoDB Tables** e **Lambda Functions**: Visualize os itens listados.

## Estrutura do Projeto

- `src/app`: Contém as páginas e rotas da aplicação.
  - `api`: APIs para interagir com os serviços AWS simulados.
  - `buckets`: Página para listar objetos de buckets S3.
  - `logs`: Página para visualizar eventos de log.
  - `sqs`: Página para interagir com filas SQS.
- `src/components`: Componentes reutilizáveis, como o `Card`.
- `src/lib/aws`: Configuração dos clientes AWS SDK.
- `src/app/services.tsx`: Página principal para listar todos os serviços.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor.
- **AWS SDK**: Para interagir com os serviços AWS simulados pelo LocalStack.
- **Tailwind CSS**: Para estilização.
- **LocalStack**: Para simular serviços AWS localmente.

## Exemplos de Uso

### Listar Buckets S3

1. Certifique-se de que há buckets criados no LocalStack.
2. Acesse a página de buckets e clique em um bucket para visualizar seus objetos.

### Receber Mensagens de uma Fila SQS

1. Certifique-se de que há mensagens disponíveis na fila.
2. Acesse a página de detalhes da fila e visualize a mensagem recebida.

## Problemas Conhecidos

- Certifique-se de que o LocalStack está configurado corretamente e em execução.
- Verifique se as credenciais de acesso estão configuradas como `test`/`test`.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie um branch para sua feature ou correção: `git checkout -b minha-feature`.
3. Faça commit das suas alterações: `git commit -m 'Adiciona minha feature'`.
4. Envie para o branch remoto: `git push origin minha-feature`.
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.
