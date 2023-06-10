const morgan = require('morgan');
const express = require('express');
const app = express();

//ruta
const reservar = require('./routes/reservacion');
const registros = require('./routes/registros');

//middleware
const index = require('./routes/inicio');
const cors = require('./middleware/cors');
const notFound = require('./middleware/notFound');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('https://bucolic-sawine-99a070.netlify.app/', index);

app.use('https://bucolic-sawine-99a070.netlify.app/reservar', reservar);
app.use('https://bucolic-sawine-99a070.netlify.app/registros', registros);
app.use(express.static('public'));
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is runing in port 3000');
})

