// controllers/productController.js

//importar todos los modelos
import * as productModel from '../models/productModel.js';

//Obtener todos los Productos
export const getAllProducts = async (req, res) => {
    try {
        const products = await  productModel.getProducts();
        console.log(products);
        res.status(201).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//obtener producto por id
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.getProductById(productId);
        if(product){
            res.status(201).json(product)
        }else{
            res.status(404).json({ message: 'Producto no Existe' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Crear Nuevo Producto
export const createNewProduct = async (req, res) => {
    try {
        const {name, price, description} = req.body;
        if (!name || !price || description){
            return res.status(400).json({ message: 'Faltan Datos'});
        }
        const productId = await productModel.createProduct({name, price, description});
        res.status(201).json({ id: productId, name, price, description });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//actualizar un producto existente
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await productModel.updateProduct(productId, [name, price, description]);
        res.status(200).json({ message: 'Producto Actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//eliminar un producto