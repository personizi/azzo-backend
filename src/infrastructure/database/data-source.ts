import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'usuario',
  password: process.env.DB_PASSWORD || 'senha',
  database: process.env.DB_NAME || 'meu_banco',
  entities: [`${__dirname}**/entities/*.{ts,js}`],
  migrations: ['dist/infrastructure/database/migrations/*.js'],
  synchronize: false, // Defina como false em produção e use migrações
  logging: process.env.DB_LOGGING === 'true', // Controle de logging via variável de ambiente
});
