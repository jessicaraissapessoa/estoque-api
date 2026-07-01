const express = require('express');

const app = express();

app.use(express.json());

let products = [];
let nextId = 1;

function resetInventory() {
  products = [];
  nextId = 1;
}

function findProduct(id) {
  return products.find((product) => product.id === Number(id));
}

function validateProductPayload(payload, partial = false) {
  const errors = [];

  if (!partial || Object.prototype.hasOwnProperty.call(payload, 'name')) {
    if (typeof payload.name !== 'string' || payload.name.trim().length < 2) {
      errors.push('name deve ter pelo menos 2 caracteres');
    }
  }

  if (!partial || Object.prototype.hasOwnProperty.call(payload, 'quantity')) {
    if (!Number.isInteger(payload.quantity) || payload.quantity < 0) {
      errors.push('quantity deve ser um número inteiro maior ou igual a zero');
    }
  }

  if (!partial || Object.prototype.hasOwnProperty.call(payload, 'price')) {
    if (typeof payload.price !== 'number' || payload.price < 0) {
      errors.push('price deve ser um número maior ou igual a zero');
    }
  }

  return errors;
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/products', (req, res) => {
  res.status(200).json(products);
});

app.get('/products/:id', (req, res) => {
  const product = findProduct(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  return res.status(200).json(product);
});

app.post('/products', (req, res) => {
  const errors = validateProductPayload(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Dados inválidos', errors });
  }

  const product = {
    id: nextId,
    name: req.body.name.trim(),
    quantity: req.body.quantity,
    price: req.body.price,
  };

  nextId += 1;
  products.push(product);

  return res.status(201).json(product);
});

app.put('/products/:id', (req, res) => {
  const product = findProduct(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  const errors = validateProductPayload(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Dados inválidos', errors });
  }

  product.name = req.body.name.trim();
  product.quantity = req.body.quantity;
  product.price = req.body.price;

  return res.status(200).json(product);
});

app.patch('/products/:id/quantity', (req, res) => {
  const product = findProduct(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  if (!Number.isInteger(req.body.quantity) || req.body.quantity < 0) {
    return res.status(400).json({
      message: 'Dados inválidos',
      errors: ['quantity deve ser um número inteiro maior ou igual a zero'],
    });
  }

  product.quantity = req.body.quantity;

  return res.status(200).json(product);
});

app.delete('/products/:id', (req, res) => {
  const product = findProduct(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  products = products.filter((currentProduct) => currentProduct.id !== product.id);

  return res.status(204).send();
});

module.exports = {
  app,
  resetInventory,
};
