const { Router } = require('express');

const newRouter = Router();

newRouter.get('/', (req, res) => {
    res.render('form', { arg: 1 });
});

newRouter.post('/', (req, res) => {
    console.log(req.body);
});

module.exports = newRouter;
