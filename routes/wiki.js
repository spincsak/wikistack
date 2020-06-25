const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const wikipage = require('../views/wikipage.js');
const { Page } = require('../models');

// brings to /wiki

router.get('/', (req, res, next) => {
  res.send('hello from wiki');
});

router.post('/', async (req, res, next) => {
  try {
    const author = req.body['author-name'];
    const authorEmail = req.body['author-email'];
    const title = req.body.title;
    const content = req.body.content;
    const status = req.body.status;
    res.json(req.body);

    const page = new Page({
      title: title,
      content: content,
    });
    console.log(page.dataValues);
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res) => {
  res.send(addPage(''));
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    // res.json(page);
    await Page.save();
    res.redirect(`/wiki/${page.slug}`);
    // res.send(wikipage(page));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
