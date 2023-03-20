import db from '../../database'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('Test authentication model', () => {
    describe('Test function exist', () => {
        it('Should have an authentication user method', () => {
            expect(userModel.auth).toBeDefined()
        })
    })
    describe('Test authentication funcation', () => {
        const user = {
            username: 'mohsa',
            first_name: 'mohamed',
            last_name: 'saleh',
            password: '1234',
        } as User

        beforeAll(async () => {
            const create = await userModel.create(user)
            user.id = create?.id
        })

        afterAll(async () => {
            const connection = await db.connect()
            const sql = `DELETE from users; ALTER SEQUENCE users_id_seq RESTART WITH 1;`
            await connection.query(sql)
            connection.release
        })

        it('Should return authenticated user', async () => {
            const auth = await userModel.auth(user.username, user.password)

            expect(auth?.username).toBe(user.username)
            expect(auth?.first_name).toBe(user.first_name)
            expect(auth?.last_name).toBe(user.last_name)
        })
        it('Should return null (Wrong username or passowrd)', async () => {
            const auth = await userModel.auth('Ali', '1235')

            expect(auth).toBe(null)
        })
    })
})
