const EXPRESS = require('express');

const Container = require('./container.js');
const RandomObj = require('./functions.js');

const app = EXPRESS();
const allProducts = new Container('./productos.txt');

const PORT = 8080 || process.env.PORT;

const server = app.listen(PORT, () => console.log(`Server runing success in port ${server.address().port}`));

server.on('ERROR', error => console.error(`Error in runing. ${error}`));

app.get('/productos', (req, res) => {
    allProducts.getAll().then((data) => res.send(`PRODUCTOS DISPONIBLES: ${JSON.stringify(data)}`))
                        .catch((err) => { throw err });
});

app.get('/productoRandom', (req, res) => {
    allProducts.getById(RandomObj()).then( (data) => res.send(`Productos random: ${JSON.stringify(data)}`))
                                    .catch( (err) =>{ throw err });
});
