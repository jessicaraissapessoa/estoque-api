# Estoque API

API simples para registro de estoque de uma loja, criada como trabalho individual de conclusão da disciplina Integração Contínua para Automação de Testes, da pós-graduação em Automação de Testes. Foi desenvolvida uma API própria e objetiva para demonstrar os conceitos de integração contínua, testes automatizados e publicação de relatório na pipeline.

A aplicação utiliza armazenamento em memória e possui testes automatizados executados por uma pipeline de integração contínua no GitHub Actions.

## Tecnologias

- Node.js
- Express
- Mocha
- Chai
- Supertest
- Mochawesome
- GitHub Actions

## Funcionalidades da API

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/health` | Verifica se a API está respondendo |
| GET | `/products` | Lista todos os produtos |
| GET | `/products/:id` | Busca um produto pelo id |
| POST | `/products` | Cadastra um produto |
| PUT | `/products/:id` | Atualiza todos os dados de um produto |
| PATCH | `/products/:id/quantity` | Atualiza apenas a quantidade em estoque |
| DELETE | `/products/:id` | Remove um produto |

### Exemplo de produto

```json
{
  "name": "Camiseta",
  "quantity": 10,
  "price": 49.9
}
```

## Como executar localmente

Instale as dependências:

```bash
npm install
```

Inicie a API:

```bash
npm start
```

A API ficará disponível em:

```text
http://localhost:3000
```

## Como executar os testes

```bash
npm test
```

O comando executa os testes automatizados com Mocha, Chai e Supertest. Ao final, o Mochawesome gera um relatório em:

```text
mochawesome-report/index.html
```

## Pipeline de CI com GitHub Actions

O arquivo da pipeline está em:

```text
.github/workflows/ci.yml
```

A pipeline contempla os requisitos do trabalho:

- Execução automática a cada `push` nas branches `main` e `master`.
- Execução manual pelo botão `Run workflow`, usando `workflow_dispatch`.
- Execução agendada de hora em hora, usando `schedule`.
- Instalação das dependências com `npm ci`.
- Execução dos testes automatizados com `npm test`.
- Geração de relatório de testes com Mochawesome.
- Publicação do relatório como artefato da pipeline com `actions/upload-artifact`.

## Relatório de testes na pipeline

Após a execução da pipeline no GitHub Actions:

1. Acesse a aba `Actions` do repositório.
2. Abra uma execução bem-sucedida do workflow `CI - Estoque API`.
3. No final da página da execução, localize a seção `Artifacts`.
4. Baixe o artefato `mochawesome-report`.
5. Extraia o arquivo `.zip` baixado.
6. Abra o arquivo `index.html` para visualizar o relatório dos testes.

O relatório é gerado com `inlineAssets=true`, deixando o HTML autocontido para facilitar a abertura após o download do artefato.

## Conceitos aplicados

### Integração contínua

Integração contínua é uma prática em que alterações no código são verificadas automaticamente por uma pipeline. Neste projeto, a cada envio de código para o GitHub, a pipeline instala as dependências, executa os testes e publica o relatório.

### Testes automatizados

Os testes validam o comportamento da API sem depender de verificação manual. O Supertest faz requisições HTTP diretamente na aplicação Express, enquanto Chai valida os resultados esperados.

### Relatório de execução

O Mochawesome transforma o resultado dos testes em um relatório HTML e JSON. Esse relatório é armazenado como artefato no GitHub Actions, servindo como evidência da execução.

### Execução manual e agendada

A execução manual permite rodar a pipeline sob demanda. A execução agendada garante verificações periódicas mesmo quando não há novos commits.
