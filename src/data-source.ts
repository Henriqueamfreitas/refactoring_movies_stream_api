// src/data-source.ts
import 'dotenv/config';
import path from 'path';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}'); // vai procurar por todos os
//   arquivos que tenham a extensão js e ts dentro da pasta de enities
  const migrationPath: string = path.join(__dirname, './migrations/**.{ts,js}'); // vai procurar por todos os
  //   arquivos que tenham a extensão js e ts dentro da pasta de migrations

  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (nodeEnv === 'test') {
    return {
      type: 'sqlite', // tipo de banco de dados leve para testes
      database: ':memory:',
      synchronize: true, 
      entities: [entitiesPath],
    };
  }


  const dbUrl: string | undefined = process.env.DATABASE_URL;

  if (!dbUrl) throw new Error("Missing env var: 'DATABASE_URL'");

  return {
    type: 'postgres', // banco de dados
    url: dbUrl,
    synchronize: false, // Indica se as tabelas (entidades) devem ser criadas automaticamente toda vez que 
    // a aplicação for iniciada. 
    logging: true, // Se true, então, irá retornar no terminal todas as queries executadas e todos os erros 
    // (caso ocorra) da aplicação. 
    entities: [entitiesPath], // Recebe um array com todas as entidades (entities) da aplicação
    migrations: [migrationPath], // recebe um array com todas as migrações (migrations) da aplicação
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());