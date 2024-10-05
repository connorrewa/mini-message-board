let ejs = require('ejs');
let path = require('path');
const express = require('express');
const indexRouter = require('./routes/indexRouter.js');
const newRouter = require('./routes/newRouter.js');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
