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

itemRouter.get('/item/get/day', auth, async (req, res) => {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    try{
        const items = await Item.find({ dateAdded: { $gte: `${oneDayAgo}` } });
        if(!items){
            throw new Error('No new items added within the last 24 hours!');
        }

        res.send(items);
    }catch(e){
        res.status(404).send(e);
    }
});

itemRouter.get('/item/get/week', auth, async (req, res) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    try{
        const items = await Item.find({ dateAdded: { $gte: `${oneWeekAgo}` } });
        if(!items){
            throw new Error('No new items added within the last week!');
        }

        res.send(items);
    }catch(e){
        res.status(404).send(e);
    }
});

itemRouter.get('/item/search/:search', auth, async (req, res) => {
    const searchQuery = req.params.search;

    try{
        const items = await Item.find({ name: { $regex: `${searchQuery}`, $options: "i"} });
        if(!items){
            throw new Error('Cannot find any items! Please correct your search!');
        }

        res.send(items);
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
    const validProps = ['name', 'stock', 'floor', 'aisle', 'price'];
    const isValidUpdate = bodyKeys.every(key => validProps.includes(key));

    try{
        if(!isValidUpdate){
            throw new Error('Invalid values for update! Please send correct values!');
        }
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