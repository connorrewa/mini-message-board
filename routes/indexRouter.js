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

indexRouter.get('/:id', (req, res) => {
    const messageId = req.params.id;
    const message = messages[messageId];
    if (message) {
        res.render('message', {
            title: `Message ${messageId}`,
            message: message,
            format: format,
        });
    } else {
        res.status(404).send('Message not found');
    }
    console.log(messageId);
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
