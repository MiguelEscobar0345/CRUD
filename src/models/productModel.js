//models/productModel.js
//creacion modelo producto


import { dbConfig } from './../config/db.config';
import mysql from 'mysql2/promise';

const pool = mysql.createPool(dbConfig);

//obtener todos los productos 
//getAll 

export const getProducts = async () =>{
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
};

// obtener un producto por su id
// getById

export const getProductById = async(productId) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE id=?', [productId]);
    return rows[0];
}

//agregar nuevo producto 
// create

export const createProduct = async (productData) => {
    const { name, price, description } = productData;
    const [ result ] = await pool.query('INSERT INTO products (name, price, description) VALUES (?,?,?)', [name, price, description]);
    return result,insertId;
}

//Actualizar un Producto existente
//update

export const updateProduct = async (productId, productData) => {
    const { name, price, description } = productData;
    await pool.query('UPDATE products SET name = ?, price = ?, description = ? WHERE Id = ?', [name, price, description, productId]);
}

//Eliminar un Producto Existente
//Delete

export const deleteProduct = async (productId) => {
    await pool.query('DELETE FROM products WHERE Id = ?',[productId])
}
