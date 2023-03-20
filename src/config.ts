import dotenv from 'dotenv'

dotenv.config()

const {
    PORT,
    NODE_ENV,
    PGHOST,
    PGPORT,
    PGDATABASE,
    PGDATABASETEST,
    PGUSER,
    PGPASSWORD,
    TOKENSECRET,
    BCRYPTPASS,
    SALTROUNDS,
} = process.env

export default {
    port: PORT,
    host: PGHOST,
    dbPort: PGPORT,
    database: NODE_ENV === 'dev' ? PGDATABASE : PGDATABASETEST,
    user: PGUSER,
    password: PGPASSWORD,
    token: TOKENSECRET,
    pepper: BCRYPTPASS,
    salt: SALTROUNDS,
}
