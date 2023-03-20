import db from '../database'
import User from '../types/user.type'
import config from '../config'
import bcrypt from 'bcrypt'

const hashP = (password: string) => {
    const salt = parseInt(config.salt as string, 10)
    return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

class UserModel {
    //Create User
    async create(u: User): Promise<User | null> {
        try {
            const connection = await db.connect()
            const sql = `SELECT username FROM users WHERE username=$1`
            const result = await connection.query(sql, [u.username])
            if (result.rows.length) {
                return null
            } else {
                const sql = `INSERT INTO users (username, first_name, last_name, password)
        values ($1, $2, $3, $4) returning id, username, first_name, last_name `
                const result = await connection.query(sql, [
                    u.username,
                    u.first_name,
                    u.last_name,
                    hashP(u.password),
                ])
                connection.release()
                return result.rows[0]
            }
        } catch (error) {
            throw new Error(
                `Unable to create (${u.first_name}): ${
                    (error as Error).message
                }`
            )
        }
    }

    //Get All
    async getAllUsers(): Promise<User[]> {
        try {
            const connection = await db.connect()

            const sql = `SELECT id, username, first_name,last_name FROM users`

            const result = await connection.query(sql)
            connection.release()
            return result.rows
        } catch (error) {
            throw new Error(`Retrieving error ${(error as Error).message})`)
        }
    }

    //Get Specific user
    async getOne(id: string): Promise<User | null> {
        try {
            const connection = await db.connect()
            const sql = `SELECT id FROM users WHERE id=$1`
            const result = await connection.query(sql, [id])
            if (result.rows.length) {
                const sql = `SELECT id, username, first_name,last_name FROM users WHERE id=$1`
                const result = await connection.query(sql, [id])
                connection.release()
                return result.rows[0]
            } else {
                return null
            }
        } catch (error) {
            throw new Error(
                `Unable to get user ${id}, ${(error as Error).message})`
            )
        }
    }

    //Update user
    async updateUser(
        id: string,
        username: string,
        first_name: string,
        last_name: string,
        password: string
    ): Promise<User | null> {
        try {
            const connection = await db.connect()
            const sql = `SELECT id FROM users WHERE id=$1`
            const result = await connection.query(sql, [id])
            if (result.rows.length) {
                const sql = `UPDATE users SET username=$1, first_name=$2, last_name=$3, password=$4 WHERE id=$5 RETURNING id, username, first_name, last_name`
                const result = await connection.query(sql, [
                    username,
                    first_name,
                    last_name,
                    hashP(password),
                    id,
                ])
                connection.release()
                return result.rows[0]
            } else {
                return null
            }
        } catch (error) {
            throw new Error(
                `Unable to update user: ${first_name} , ${
                    (error as Error).message
                })`
            )
        }
    }

    //DELETE user
    async deleteUser(id: string): Promise<User | null> {
        try {
            const connection = await db.connect()
            const sql = `SELECT id FROM users WHERE id=$1`
            const result = await connection.query(sql, [id])
            if (result.rows.length) {
                const sql = `DELETE FROM users WHERE id=$1 RETURNING id, username, first_name, last_name`
                const result = await connection.query(sql, [id])
                connection.release()
                return result.rows[0]
            } else {
                return null
            }
        } catch (error) {
            throw new Error(
                `Unable to delete user ${id}, ${(error as Error).message})`
            )
        }
    }

    //Auth user
    async auth(username: string, password: string): Promise<User | null> {
        try {
            const connection = await db.connect()
            const sql = `SELECT password FROM users WHERE username=$1`
            const result = await connection.query(sql, [username])

            if (result.rows.length) {
                const { password: hashP } = result.rows[0]
                const ispassmatch = bcrypt.compareSync(
                    `${password}${config.pepper}`,
                    hashP
                )

                if (ispassmatch) {
                    const uInfo = await connection.query(
                        `SELECT id, username, first_name, last_name FROM users WHERE username=$1`,
                        [username]
                    )
                    return uInfo.rows[0]
                }
            }
            connection.release()
            return null
        } catch (error) {
            throw new Error(`Login error: ${(error as Error).message}`)
        }
    }
}

export default UserModel
