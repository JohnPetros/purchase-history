import { type Options, Sequelize } from 'sequelize'

import { ENV } from '@constants'

const options: Options = {
  dialect: 'postgres',
  host: ENV.database.host,
  database: ENV.database.name,
  username: ENV.database.username,
  password: ENV.database.password,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
  define: {
    timestamps: true,
    underscored: true,
  },
}

export const sequelize = new Sequelize(options)
