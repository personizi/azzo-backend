import { DataSource } from 'typeorm';

export const mongoDataSource = new DataSource({
  type: 'mongodb',
  host: '152.53.39.254',
  port: 27017,
  database: 'azzo-database',
  username: 'azzo-user',
  password: 'privus123',
  useUnifiedTopology: true,
  synchronize: true,
  entities: [`${__dirname}**/entities/*.{ts,js}`],
});

async function seedDatabase() {
  try {
    await mongoDataSource.initialize();
    console.log('Database connection established.');

    // Aqui você pode adicionar seus dados iniciais
    console.log('Seeding completed.');
    await mongoDataSource.destroy();
  } catch (error) {
    console.error('Error during database seeding:', error);
  }
}

seedDatabase();
