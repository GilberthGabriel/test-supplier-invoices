# SUPPLIER INVOICES HANDLER

O objetivo deste serviço é receber as informações de novas faturas através de um tópico no SNS, salvá-las em uma tabela no DynamoDB e disponibilizar uma API para buscar essas faturas.

O projeto deve ser desenvolvido em Node 16, utilizando esse _boilerplate_ com serverless framework. É esperado que o projeto rode localmente utilizando o plugin `serverless-offline`.

O único serviço da AWS que necessita de uma atenção especial é o DynamoDB, cuja integração pode ser feita utilizando:

-   A própria nuvem AWS. Não é esperado que sejam fornecidas credenciais para acesso, apenas que o serviço funcione levando em consideração a correta implementação (permissões e afins).
-   [Localstack](https://localstack.cloud).
-   [Serverless DynamoDB Local](https://www.serverless.com/plugins/serverless-dynamodb-local).
-   Qualquer plugin/serviço que consiga emular DynamoDB.

## Requisitos

É necessário ter pelo menos duas funções lambda rodando no projeto.

### SNS -> DynamoDB

-   Receber um payload JSON de um evento do SNS. O gatilho do SNS não precisa ser configurado, para isso foi disponibilizado um modelo de evento em `mock/sns.json`; portanto a configuração do evento ou fila SNS não é obrigatória.
-   Validação dos tipos implícitos no payload presente em `mock/sns.json`. Caso os tipos não coincidam com o modelo, a mensagem deve ser descartada.
-   Calcular a média de consumo usando as informações presentes no atributo `history_table`. Cada item nesse array representa um mês referência, o consumo e o intervalo de dias que aquele consumo representa. Deve-se calcular uma média do valor `kwh_consumption` de cada item considerando a proporcionalidade da quantidade de dias (média ponderada). Essa média deve ser salva no atributo `avg_kwh_consumption` em formato `Float`.
-   Todas as datas estão em unix epoch (`due_date`, `issue_date`) e devem ser salvas nesse formato, em **milissegundos**.
-   Criar uma tabela no DynamoDB chamada `SupplierInvoices` com os atributos e tipos conforme o payload em `mock/sns.json`. Deve-se levar em consideração o atributo adicionado chamado `avg_kwh_consumption` calculado acima. A `Partition key` será o atributo `installation_number` e a `Sort key` será o atributo `reference_month`. As demais configurações (ex.: provisionamento) podem ser feitas conforme o padrão, não serão avaliadas. Deve existir um script ou função que cria essa tabela com tais especificações.
-   Quando um novo registro for inserido na tabela, caso ele já exista, deve ser atualizado.

### DynamoDB -> API Gateway

-   Desenvolver uma API que recebe um request `GET` e retorna todos os itens da tabela `SupplierInvoices`

## Avaliação

O que será avaliado:

-   Funcionamento: a solução deve funcionar corretamente conforme os requisitos levantados.
-   Clareza e boas práticas: uso de comentários ou _self-documenting code_, nomeação de funções e variáveis, identações, reusabilidade, jsdoc, etc.
-   Uso de dependências: _trade-off_ entre usar ou não dependências.
-   Git: histórico de commits e melhores práticas.
-   AWS: implementação dos serviços e melhores práticas.

## Nice to have

Não é obrigatório, mas garante pontuação extra:

-   Schema JSON para tabela `SupplierInvoices`
-   Implementação com DynamoDB na nuvem da AWS e configuração correta das permissões
-   Gatilho SNS que recebe um payload em JSON e invoca a função para salvar os dados no DynamoDB (ou seja, sem utilizar o `mock/sns.json`)
-   Autenticação na API
-   Testes

# Entrega

É esperado que você entregue esse projeto zipado (exluindo a pasta `node_modules`) para os mesmos e-mails que enviaram o teste. Você também deve fornecer uma documentação com os passos de como rodar o serviço e verificar seu correto funcionamento.

# Considerações finais

Lembre-se de que não existe solução exata. Existem várias soluções para esse problema, cada uma com seus _trade-offs_.

Qualquer dúvida ou problema no projeto favor reportar por e-mail, esse repositório serve apenas para instruções.

Boa sorte!
