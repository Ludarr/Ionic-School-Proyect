-- CREATE DATABASE inventario

-- USE inventario;

-- CREATE TABLE products
-- (
--     id INT IDENTITY(1,1) PRIMARY KEY,
--     name VARCHAR(100),
--     price DECIMAL(10, 2),
--     quantity INT,
--     description TEXT
-- );

-- INSERT INTO products (name, description, quantity, price) VALUES ('PC', 'pc gaming', 10, 1000)

USE inventario;
ALTER TABLE dbo.Customer
ADD direccion varchar(100) NOT NULL;
SELECT * FROM Cartegory
INSERT INTO Cartegory (nombre, descripcion) VALUES ('PC', 'Todo tipo de Pc');