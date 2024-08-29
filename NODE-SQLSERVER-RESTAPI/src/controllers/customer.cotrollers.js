import { getConnection } from '../database/connection.js';
import sql from 'mssql';

export const getCustomers = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Customer');
    res.json(result.recordset);
};

export const getCustomer = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query("SELECT * FROM Customer WHERE _idCustomer = @id");

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Customer not found" });
    }

    return res.json(result.recordset[0]);
};

export const createCustomer = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("name", sql.VarChar, req.body.nombre)
        .input("telefono", sql.VarChar, req.body.telefono)
        .input("direccion", sql.VarChar, req.body.direccion)
        .query(
            "INSERT INTO Customer (nombre, telefono, direccion) VALUES (@name, @telefono, @direccion); SELECT SCOPE_IDENTITY() AS id"
        );

    res.json({
        id: result.recordset[0].id,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
    });
};

export const updateCustomer = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .input("name", sql.VarChar, req.body.nombre)
        .input("telefono", sql.VarChar, req.body.telefono)
        .input("direccion", sql.VarChar, req.body.direccion)
        .query(
            "UPDATE Customer SET nombre = @name, telefono = @telefono, direccion = @direccion WHERE _idCustomer = @id"
        );

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Customer not found" });
    }

    res.json({
        id: req.params.id,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
    });
};

export const deleteCustomer = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query("DELETE FROM Customer WHERE _idCustomer = @id");

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Customer not found" });
    }

    return res.json({ message: "Customer deleted" });
};