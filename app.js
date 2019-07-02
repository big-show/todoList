const express = require('express');
const todoController = require('./controllers/todoController');
const app = express();

app.set('view engine','ejs');

app.use(express.static('./public'));
todoController(app);
app.listen(3001);

console.log('you are listen port 3001');