const { app } = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Estoque API running on port ${port}`);
});
