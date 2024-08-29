import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const getProducts = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Producto');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getProduct = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query("SELECT * FROM Producto WHERE _idProducto = @id");

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Product not found" });
    }

    return res.json(result.recordset[0]);
};

export const createProduct = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("name", sql.VarChar, req.body.nombre)
        .input("description", sql.VarChar, req.body.descripcion)
        .input("price", sql.Float, req.body.precio)
        .input("idCategory", sql.Int, req.body.idCategory)
        .query(
            "INSERT INTO Producto (nombre, descripcion, precio, idCategory) VALUES (@name, @description, @price, @idCategory); SELECT SCOPE_IDENTITY() AS id"
        );

    res.json({
        id: result.recordset[0].id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        idCategory: req.body.idCategory,
    });
};

export const updateProduct = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .input("name", sql.VarChar, req.body.nombre)
        .input("description", sql.VarChar, req.body.descripcion)
        .input("price", sql.Float, req.body.precio)
        .input("idCategory", sql.Int, req.body.idCategory)
        .query(
            "UPDATE Producto SET nombre = @name, descripcion = @description, precio = @price, idCategory = @idCategory WHERE _idProducto = @id"
        );

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json({
        id: req.params.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        idCategory: req.body.idCategory,
    });
};

export const deleteProduct = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query("DELETE FROM Producto WHERE _idProducto = @id");

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Product not found" });
    }

    return res.json({ message: "Product deleted" });
};