const PORT = process.env.PORT
const DATABASE_HOST = process.env.DATABASE_HOST
const DATABASE_USERNAME = process.env.DATABASE_USERNAME
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_NAME = process.env.DATABASE_NAME

if (
  !PORT ||
  !DATABASE_HOST ||
  !DATABASE_USERNAME ||
  !DATABASE_PASSWORD ||
  !DATABASE_NAME
) {
  throw new Error('')
}

export const ENV = {
  database: {
    host: DATABASE_HOST,
    name: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
  },
  port: PORT,
}
