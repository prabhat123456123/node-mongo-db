const {User} = require('../models')
const { bcryptServices: { hashPassword, comparePassword }, jwtServices: { createToken, verifyToken } } = require('../services')
const {authController:{signup,login,logout}} = require('../controller')


jest.mock('../models');
jest.mock('../services', () => ({
    bcryptServices: {
        hashPassword:jest.fn(),
        comparePassword:jest.fn()
    },
    jwtServices: {
        createToken:jest.fn(),
        verifyToken:jest.fn()
    }
}))
describe('handle', () => {
    let req, res;
    beforeEach(() => {
        req = {
            body:{}
        },
            res = {
                status:jest.fn().mockReturnThis(),
                json:jest.fn().mockReturnThis(),
                send:jest.fn().mockReturnThis(),
            }
    })
    describe('signupHandler', () => {
        it('should return 409 if user already exists', async () => {
            req.body = { name: "ooo", email: "test@gmail.com", password: "iooo" };
            User.findOne.mockResolvedValue({ email: "test@gmail.com" });
            await signup(req, res);
            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({ message: "user already exist", status: 409 });
        })
    })
})