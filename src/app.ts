import express, { Application, json } from "express"
import "dotenv/config"
import { moviesRouter } from "./routers/movies.routers"
import { error } from "./middlewares/handle.middleware"

const app: Application = express()
app.use(json())

app.use('/movies', moviesRouter)

app.use(error)

export default app