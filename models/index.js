const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

function generateSlug(title) {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define('page', {
  title: { type: Sequelize.STRING, allowNULL: false },
  slug: {
    type: Sequelize.STRING,
    allowNULL: false,
  },
  content: { type: Sequelize.TEXT, allowNULL: false },
  status: { type: Sequelize.ENUM('open', 'closed') },
});

Page.beforeValidate((page) => {
  page.slug = generateSlug(page.title);
});

const User = db.define('user', {
  name: { type: Sequelize.STRING, allowNULL: false },
  email: {
    type: Sequelize.STRING,
    allowNULL: false,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = { db, Page, User };
