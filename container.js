const fs = require('fs');

class Container {
    constructor(file) {
        this.file = file;
    }

    // recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save( element ) {
        try {
            const response = await fs.promises.readFile(`./${this.file}`, 'utf-8');

            const productList = JSON.parse(response);

            const newProduct = {
                id: productList[productList.length-1].id + 1,
                title: element.title,
                price: parseInt(element.price),
                thumbnail: element.thumbnail
            };

            productList.push(newProduct);

            try {
                await fs.promises.writeFile(`./${this.file}`, JSON.stringify(productList,null,2));
                return newProduct.id 
            }catch(err) {
                return {
                    status: 'Error', 
                    message: 'Error al cargar el producto.', 
                    error: err
                };
            };

        }catch(err) {
            const product = {
                id: 1,
                title: element.title,
                price: parseInt(element.price),
                thumbnail: element.thumbnail
            };

            try {
                await fs.promises.writeFile(`./${this.file}`,JSON.stringify([product],null,2));
                return product.id;
            } catch (err) {
                return {
                    status: 'Error', 
                    message: 'Error al crear el archivo y producto.', 
                    error: err
                }
            };
        }
    };

    // Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(id) {
        try{
            const response = await fs.promises.readFile(`./${this.file}`,'utf-8');
            const productList = JSON.parse(response);
            const productSelected = productList.find(e => e.id === id);

            if(!productSelected) throw new Error();
            
            return productSelected;

        }catch(err){
            return {
                status: 'Error',
                message: 'No se encontro el producto solicitado.', 
                error: err
            };
        };
    };

    // Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        console.log(this.file)
        try{
            const response = await fs.promises.readFile(`./${this.file}`,'utf-8');
            const list =  JSON.parse(response);

            return list;

        }catch(err){
            return {
                status: 'Error', 
                message: 'No se encontraron los productos solicitados.'
            };
        };
    };

    // Elimina del archivo el objeto con el id buscado.
    async deleteById( id ) {
        try{
            const response = await fs.promises.readFile(`./${this.file}`,'utf-8');
            const list =  JSON.parse(response);
            const existElement = list.find(e => e.id === id);

            if(!existElement) throw new Error();
            
            const updateProducts = list.filter( e => e.id !== id ); 
            
            try {
                await fs.promises.writeFile(`./${this.file}`,JSON.stringify(updateProducts,null,2));
                return {
                    status: 'Success', 
                    message: 'Producto eliminado con éxito.'
                };
            }catch(err){
                return {
                    status: 'Error', 
                    message: 'Hubo un problema al borrar el producto.'
                }
            };
        }catch(err){
            return {
                status: 'Error', 
                message: 'No se encontro el producto solicitado.'
            };
        };
    };    
    
    // Elimina todos los objetos presentes en el archivo..
    async deleteAll() {
        try{
            const filesDeleted = [];
            await fs.promises.writeFile(`./${this.file}`,JSON.stringify(filesDeleted,null,2))

            return {
                status: 'Success', 
                message: 'Se eliminaron todos los objetos del archivo.'
            }
        }catch(err){
            return {
                status: 'Error', 
                message: 'Hubo un error al intentar borrar los archivos.', 
                error: err
            };
        };
    };
};

const viewList = new Container('productos');

// // Prueba de Save
// viewList.save(
//     {
//         title: 'Instagram',
//         price: 88,
//         thumbnail: 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png',
//     }
// );

// // // Prueba de GET BY ID
// viewList.getById(1).then(data => console.log(data));

// // // Prueba de GET ALL
// viewList.getAll().then(data => console.log(data))

// // // PRUEBA BORRADO POR ID
// viewList.deleteById(1).then(data => console.log(data))

// //  Prueba de Borrar todos los productos
// viewList.deleteAll().then(data => console.log(data))

module.exports = Container;
