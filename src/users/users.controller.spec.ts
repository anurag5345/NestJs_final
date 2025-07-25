import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';


describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService:Partial<UsersService>
  let fakeAuthSerice:Partial<AuthService>

  beforeEach(async () =>{
    fakeUsersService = {
      findOne: (id:number) => {
        return Promise.resolve({id,email:'asdf@asdf.com',password:'asdf'} as User)
      },

      find:(email:string) => {
        return Promise.resolve([{id:1,email,password:'asdf'} as User])
  
      },
      
      // remove:() => {},
      // update:() => {}

    };

    fakeAuthSerice ={
      // signup: () => {},
      signin: (email:string,password:string) => {
        return Promise.resolve({id:1,email,password} as User)
      }
    };
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[
        {
          provide:UsersService,
          useValue:fakeUsersService
        },
        {
          provide:AuthService,
          useValue:fakeAuthSerice
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be return list of users with the given email',async()=>{
  const users = await controller.findUsers('asdf@asdf.com');
  expect(users.length).toEqual(1)
  expect(users[0].email).toEqual('asdf@asdf.com')
  });

  it('finduser return a single user with given id',async()=>{
    const user = await controller.findUser('1');
    expect(user).toBeDefined()
  })

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => Promise.resolve(null);
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('signin should update session object and return user',async()=>{
    const session = {userId: -10}
    const user = await controller.signin(
      {email:'asdf@asdf.com',password:'asdf'},
      session
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1)
  })
});
