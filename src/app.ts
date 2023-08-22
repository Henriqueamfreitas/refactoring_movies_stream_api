import express, { Application, json } from "express"
import "dotenv/config"


const app: Application = express()
app.use(json())

export default app