const app = require('./app');
const { syncAndSeed } = require('./db');

syncAndSeed();

const port = 3000 || process.env.PORT;


app.listen(port, ()=> {
  console.log(`listening on port... ${port}`);
});
