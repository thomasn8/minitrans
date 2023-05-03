import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { User } from 'src/users/entities/user.entity';
import { Element } from "src/elements/entities/element.entity";

const config: MysqlConnectionOptions = {
	type: "mariadb",
	host: "mariadb",
	port: 3306,
	username: process.env.MARIADB_USER,
	password: process.env.MARIADB_PASSWORD,
	database: process.env.MARIADB_DB,

	// synchronize: false,	// for PROD
	synchronize: true,			// for DEV
	logging: false,

	entities: [ User, Element],
	migrations: ['/app/dist/_typeorm/migrations/*.js'],
	subscribers: [],
}

export default config;
