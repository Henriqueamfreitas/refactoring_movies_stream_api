// src/server.ts
import { AppDataSource } from "./data-source";
import app from "./app"


AppDataSource.initialize() // Inicia conexão com banco de dados
  .then(async () => {
    console.log("Database connected.")

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`App is running on https://localhost:${PORT}`)
    })
  })
  .catch((err:any) => console.error(err));