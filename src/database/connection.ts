import { Client } from "pg"
import { config } from "dotenv"
config()

const connection = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT_DB),
    database: process.env.DB_NAME
})
try {
    connection.connect()
    console.log("Conectado ao banco com sucesso")
} catch (error) {
    console.error(error)
}
export default connection