# Estoque API

API simples para registro de estoque de uma loja, criada como trabalho individual de conclusão da disciplina. Como nao havia um projeto reaproveitado de outra disciplina da pos-graduacao, foi desenvolvida uma API propria e objetiva para demonstrar os conceitos de integracao continua, testes automatizados e publicacao de relatorio na pipeline.

A aplicação utiliza armazenamento em memoria e possui testes automatizados executados por uma pipeline de integracao continua no GitHub Actions.

## Tecnologias

- Node.js
- Express
- Mocha
- Chai
- Supertest
- Mochawesome
- GitHub Actions

## Funcionalidades da API

| Metodo | Rota | Descricao |
| --- | --- | --- |
| GET | `/health` | Verifica se a API esta respondendo |
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

Instale as dependencias:

```bash
npm install
```

Inicie a API:

```bash
npm start
```

A API ficara disponivel em:

```text
http://localhost:3000
```

## Como executar os testes

```bash
npm test
```

O comando executa os testes automatizados com Mocha, Chai e Supertest. Ao final, o Mochawesome gera um relatorio em:

```text
mochawesome-report/index.html
```

## Pipeline de CI com GitHub Actions

O arquivo da pipeline esta em:

```text
.github/workflows/ci.yml
```

A pipeline contempla os requisitos do trabalho:

- Execucao automatica a cada `push` nas branches `main` e `master`.
- Execucao manual pelo botao `Run workflow`, usando `workflow_dispatch`.
- Execucao agendada toda segunda-feira as 09:00 UTC, usando `schedule`.
- Instalacao das dependencias com `npm ci`.
- Execucao dos testes automatizados com `npm test`.
- Geracao de relatorio de testes com Mochawesome.
- Publicacao do relatorio como artefato da pipeline com `actions/upload-artifact`.

## Relatorio de testes na pipeline

Apos a execucao da pipeline no GitHub Actions:

1. Acesse a aba `Actions` do repositorio.
2. Abra uma execucao bem-sucedida do workflow `CI - Estoque API`.
3. No final da pagina da execucao, localize a secao `Artifacts`.
4. Baixe o artefato `mochawesome-report`.
5. Extraia o arquivo `.zip` baixado.
6. Abra o arquivo `index.html` para visualizar o relatorio dos testes.

O relatorio e gerado com `inlineAssets=true`, deixando o HTML autocontido para facilitar a abertura apos o download do artefato.

## Conceitos aplicados

### Integracao continua

Integracao continua e uma pratica em que alteracoes no codigo sao verificadas automaticamente por uma pipeline. Neste projeto, a cada envio de codigo para o GitHub, a pipeline instala as dependencias, executa os testes e publica o relatorio.

### Testes automatizados

Os testes validam o comportamento da API sem depender de verificacao manual. O Supertest faz requisicoes HTTP diretamente na aplicacao Express, enquanto Chai valida os resultados esperados.

### Relatorio de execucao

O Mochawesome transforma o resultado dos testes em um relatorio HTML e JSON. Esse relatorio e armazenado como artefato no GitHub Actions, servindo como evidencia da execucao.

### Execucao manual e agendada

A execucao manual permite rodar a pipeline sob demanda. A execucao agendada garante verificacoes periodicas mesmo quando nao ha novos commits.

## Evidencia para entrega

Para a entrega do trabalho, envie:

- URL do repositorio GitHub.
- Evidencia de uma execucao bem-sucedida na aba `Actions`, incluindo o workflow `CI - Estoque API` e o artefato `mochawesome-report`.
