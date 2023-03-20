import db from '../../database'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('Test UserModel', () => {
    describe('Test methods exist', () => {
        it('Should have create method', () => {
            expect(userModel.create).toBeDefined()
        })

        it('Should have GetAllUsers method', () => {
            expect(userModel.getAllUsers).toBeDefined()
        })

        it('Should have GetOneUser method', () => {
            expect(userModel.getOne).toBeDefined()
        })

        it('Should have UpdateUser method', () => {
            expect(userModel.updateUser).toBeDefined()
        })

        it('Should have DeleteUser method', () => {
            expect(userModel.deleteUser).toBeDefined()
        })

        it('Should have AuthenticationUser method', () => {
            expect(userModel.auth).toBeDefined()
        })
    })

    describe('Test UserModel functionality', () => {
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

        it('Create function, should return created user', async () => {
            const createdUser = await userModel.create({
                username: 'mohsa2',
                first_name: 'mohamed2',
                last_name: 'saleh2',
                password: '12345',
            } as User)

            expect(createdUser).toEqual({
                id: createdUser?.id,
                username: 'mohsa2',
                first_name: 'mohamed2',
                last_name: 'saleh2',
            } as User)
        })
        it('GetAll function, should return all usres from DB', async () => {
            const users = await userModel.getAllUsers()
            expect(users.length).toBe(2)
        })
        it('GetByID function, should return user with passed id, from DB', async () => {
            const returnedUser = await userModel.getOne(
                user?.id as unknown as string
            )
            expect(returnedUser?.id).toBe(user.id)
            expect(returnedUser?.username).toBe(user.username)
            expect(returnedUser?.first_name).toBe(user.first_name)
            expect(returnedUser?.last_name).toBe(user.last_name)
        })
        it('Update function, should return updated user with passed id, from DB', async () => {
            const up = {
                username: 'mohsaupdated',
                first_name: 'mohamedupdated',
                last_name: 'salehupdated',
                password: 'updatedpassword',
            }
            const updatedUser = await userModel.updateUser(
                user.id as unknown as string,
                up.username,
                up.first_name,
                up.last_name,
                up.password
            )
            expect(updatedUser?.id).toBe(user.id)
            expect(updatedUser?.username).toBe('mohsaupdated')
            expect(updatedUser?.first_name).toBe('mohamedupdated')
            expect(updatedUser?.last_name).toBe('salehupdated')
        })
        it('Delete function, should deleted user with passed id, from DB', async () => {
            const deletedUser = await userModel.deleteUser(
                user?.id as unknown as string
            )
            expect(deletedUser?.id).toBe(user.id)
        })
    })
})
