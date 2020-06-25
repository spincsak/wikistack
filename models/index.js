const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');


const Page = db.define('page', {
    title: {type: Sequelize.STRING,
        allowNULL: false
    },
    slug: {type: Sequelize.STRING, allowNULL: false} ,
    content: {type: Sequelize.TEXT, allowNULL: false},
    status: {type: Sequelize.ENUM('open', 'closed')}
});

const User = db.define('user', {
    name: {type: Sequelize.STRING, 
        allowNULL: false
    },
    email: {type: Sequelize.STRING, 
        allowNULL: false,
        validate: {
            isEmail: true
          }
    }
})






module.exports = { db, Page, User };

