const { Router } = require('express');

const indexRouter = Router();
const { format } = require('date-fns');

const messages = [
    {
        text: 'Hi there!',
        user: 'Amando',
        added: new Date(),
    },
    {
        text: 'Hello World!',
        user: 'Charles',
        added: new Date(),
    },
];

indexRouter.get('/new', (req, res) => {
    res.render('form');
});

indexRouter.post('/new', (req, res) => {
    messages.push({
        text: req.body.messageText,
        user: req.body.authorName,
        added: new Date(),
    });
    res.redirect('/');
});

indexRouter.get('/', (req, res) => {
    res.render('index', {
        title: 'Mini Messageboard',
        messages: messages,
        format: format,
    });
});

module.exports = indexRouter;
