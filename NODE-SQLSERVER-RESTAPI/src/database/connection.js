import sql from 'mssql'

const dbSettings = {
    user: 'usuario1',
    password: '12345',
    server: 'SoLuGamer\\SQLEXPRESS',
    port: 1433,
    database: 'inventario',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

let pool;

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings)
        return pool;
    } catch (error) {
        console.error(error)
        throw error;
    }
}