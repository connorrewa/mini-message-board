const { Router } = require('express');

const indexRouter = Router();
const { format } = require('date-fns');
const db = require('../db/queries');

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

indexRouter.get('/:id', async (req, res) => {
    const messageId = req.params.id;
    const message = await db.getMessageById(messageId);
    console.log(message);
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

indexRouter.post('/new', async (req, res) => {
    await db.postNewMessage(req.body.messageText, req.body.authorName);
    res.redirect('/');
});

indexRouter.get('/', async (req, res) => {
    const messages = await db.getAllMessages();
    console.log(messages);

    res.render('index', {
        title: 'Mini Messageboard',
        messages: messages,
        format: format,
    });
});

module.exports = indexRouter;
