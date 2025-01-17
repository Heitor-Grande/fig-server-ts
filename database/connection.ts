import { Client } from "pg"
import { config } from "dotenv"
config()
const connection = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: parseInt(process.env.PORT_DB),
    database: process.env.DATABASE
})
try {
    connection.connect()
    console.log("Conectado ao banco com sucesso")
} catch (error) {
    console.error(error)
}
export default connection