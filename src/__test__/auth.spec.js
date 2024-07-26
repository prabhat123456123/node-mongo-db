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
describe('test Cases', () => {
    let req, res,next;
    beforeEach(() => {
        
        req = {
            body: {},
            get: jest.fn()
        },
            res = {
                status:jest.fn().mockReturnThis(),
                json:jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
                cookie: jest.fn()
            },
             next = jest.fn();
    })
    describe('signupHandler', () => {
        it('should return 409 if user already exists', async () => {
            req.body = { name: "ooo", email: "test@gmail.com", password: "password" };
            User.findOne.mockResolvedValue({ email: "test@gmail.com" });
            await signup(req, res);
            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({ message: "user already exist", status: 409 });
        })
        it('should return successful message with status code', async () => {
            req.body = { name: "ooo", email: "test@gmail.com", password: "password" };
            User.findOne.mockResolvedValue(null);
            await hashPassword.mockResolvedValue('password');
            User.create.mockResolvedValue({
                 name: "ooo", email: "test@gmail.com", password: "password" 
            })
            await signup(req, res);
            expect(hashPassword).toHaveBeenCalledWith('password');
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({message:"created successfuly",status:201});
        })
    })
      describe('Login', () => {
        it('should return 404 if user not exists', async () => {
            req.body = { email: "test@gmail.com", password: "password" };
            User.findOne.mockResolvedValue(null);
            await login(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User Not Exists", status: 404 });
        })
        it('should return invalid credential', async () => {
            req.body = { email: "test@gmail.com", password: "password" };
            User.findOne.mockResolvedValue({ email: "test@gmail.com", password: "hashedPassword"});
            await comparePassword.mockResolvedValue(false);
            await login(req, res);
            expect(comparePassword).toHaveBeenCalledWith('password','hashedPassword');
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({message:"invalid credential",status:401});
        })
           it('should return successful message with status code 200', async () => {
              
               mockUser = {id:1, name:"test",email: "test@gmail.com", password: "hashedPassword",role:"user",save: jest.fn().mockResolvedValue(true) }
            User.findOne.mockResolvedValue(mockUser);
               await comparePassword.mockResolvedValue(true);
               await createToken.mockResolvedValue("token")
              
            await login(req, res);
            expect(comparePassword).toHaveBeenCalledWith('password','hashedPassword');
            expect(req.get).toHaveBeenCalledWith('User-Agent');
            expect(mockUser.save).toHaveBeenCalledWith();
            expect(res.cookie).toHaveBeenCalledWith('token', 'token', { httpOnly: true, secure: true, sameSite: 'Strict' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({message:"logged in", status:200, token:'token'});
        })
    })
})