const express = require('express');
const morgan = require('morgan');
const { db } = require('./models');
const layout = require('/Users/madisonbeatty/wikistack/views/layout.js')
const models = require('./models');
const wikiRouter = require('./routes/wiki.js');
const userRouter = require('./routes/user.js')


const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/wiki' , wikiRouter);
app.use('/user' , userRouter);



app.get('/', (req, res) => {
    res.send(layout(' '));
})

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const init = async () => {
    await models.db.sync({force:true})

    app.listen(1337 , () => {
        console.log('Listening on PORT 1337')
    });
}

init();



