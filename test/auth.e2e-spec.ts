import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
 
describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
 
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
 
    app = moduleFixture.createNestApplication();
    await app.init();
  });
 
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
 
 
 
  it('handle a signup request', () => {
    const email = 'root1122@gmail.com'
 
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({email,password:'1234',admin :true})
      .expect(201)
      .then((res)=>{
        const{id,email} = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email)
      })
     
  });
 
 
  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'asdf1122@asdf.com';
 
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asdf',admin:true })
      .expect(201);
 
    const cookie = res.get('Set-Cookie') as string[];
 
    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie',cookie)
      .expect(200);
 
    expect(body.email).toEqual(email);
  });
 
 
 
 
   
 
});
 
 
 