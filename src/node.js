import  express from "express";
import {createPool} from 'mysql2/promise'
import {config} from 'dotenv'

const app = express()

config()

const pool = createPool({
    host: process.env.MYSQLDB_HOST,
    user: 'root',
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    port : process.env.MYSQLDB_DOCKER_PORT,
})

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.get("/ping", async (req,res)=>{
    const info = await pool.query('SELECT NOW()')
    res.json(info[0])
})

app.listen(3000);