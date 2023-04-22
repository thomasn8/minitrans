import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from 'src/users/entities/user.entity';

const config: PostgresConnectionOptions = {
	type: "postgres",
	host: "postgres",
	port: 5432,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_DB,

	// synchronize: false,
	synchronize: true,
	logging: false,

	entities: [ User, ],
	migrations: ['dist/_typeorm/migrations/*.js'],
	subscribers: [],
}

export default config;
