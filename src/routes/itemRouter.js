const express = require('express');
const Item = require('../models/item');
const auth = require('../middleware/auth');

const itemRouter = express.Router();

itemRouter.post('/item', auth, async (req, res) => {
    const item = new Item(req.body);

    try{
        await item.save();
        res.status(201).send(item);
    }catch(e){
        res.status(500).send(e);
    }
});

itemRouter.get('/item/:id', auth, async (req, res) => {
    const itemId = req.params.id;

    try{
        const item = await Item.findById({ _id: itemId });
        if(!item){
            throw new Error('Cannot find item! Please check that you are using the correct ID!');
        }

        res.send(item);
    }catch(e){
        res.status(404).send(e);
    }
});

itemRouter.delete('/item/:id', auth, async(req, res) => {
    const itemId = req.params.id;

    try{
        const item = await Item.findByIdAndDelete({ _id: itemId });
        if(!item){
            throw new Error('Cannot find item! Please check that you are using the correct ID!');
        }

        res.send(item);
    }catch(e){
        res.status(404).send(e);
    }
});

itemRouter.patch('/item/:id', auth, async(req, res) => {
    const bodyKeys = Object.keys(req.body);
    const validProps = ['name', 'stock', 'location', 'price'];
    const isValidUpdate = bodyKeys.every(key => validProps.includes(key));

    try{
        const item = await Item.findById({ _id: req.params.id });
        if(!item){
            throw new Error('Cannot find item for update!');
        }

        bodyKeys.forEach(key => item[key] = req.body[key]);
        await item.save();
        res.send(item);
    }catch(e){
        res.status(404).send(e);
    }
});

module.exports = itemRouter;