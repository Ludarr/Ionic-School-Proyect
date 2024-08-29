import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const getCartegories = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Cartegory');
    res.json(result.recordset);
};

export const getCartegory = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query("SELECT * FROM Cartegory WHERE _idCategory = @id");

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Category not found" });
    }

    return res.json(result.recordset[0]);
};

export const createCartegory = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("name", sql.VarChar, req.body.nombre)
        .input("description", sql.VarChar, req.body.descripcion)
        .query(
            "INSERT INTO Cartegory (nombre, descripcion) VALUES (@name, @description); SELECT SCOPE_IDENTITY() AS id"
        );

    res.json({
        id: result.recordset[0].id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
    });
};

export const updateCartegory = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .input("name", sql.VarChar, req.body.nombre)
        .input("description", sql.VarChar, req.body.descripcion)
        .query(
            "UPDATE Cartegory SET nombre = @name, descripcion = @description WHERE _idCategory = @id"
        );

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Category not found" });
    }

    res.json({
        id: req.params.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
    });
};

export const deleteCartegory = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query("DELETE FROM Cartegory WHERE _idCategory = @id");

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Category not found" });
    }

    return res.json({ message: "Category deleted" });
};