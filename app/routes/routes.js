const express = require('express');
const transactionRouter = express.Router();

module.exports = transactionRouter;
transactionRouter.get('/', async (request, response) => {
  const { query } = request;

  try {
    if (!query.period) {
      throw new Error(
        `É necessário informar o parâmetro "period", cujo o valor deve estar nor formato yyyy-mm`
      );
    }
    response.send({
      lenght: 2,
      transactions: ['transaction1', 'transaction2'],
    });
  } catch ({ message }) {
    console, log(message);
    response.status(400).send({ error: messege });
  }
});
