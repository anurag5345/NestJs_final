import { Injectable , BadRequestException,NotFoundException} from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt} from "crypto";
import { promisify } from "util";
 
const scrypt = promisify(_scrypt);
 
 
@Injectable()
export class AuthService {
 
    constructor(private usersService: UsersService) {}
 
    async signup(email: string, password: string) {
        // check if email is already in use
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('Email in use');
        }
 
        // hash the password
        // Genarate a salt
        const salt = randomBytes(8).toString('hex');
        // 16 characters is the length of the salt : jk12jk21kj12jk12
       
        // hash the password with the salt
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        // 32 is the length of the hash : 12345678901234567890123456789012345678901234567890
       
        // join the salt and password together
        const result = salt + '.' + hash.toString('hex');
        // 12345678901234567890123456789012345678901234567890.jk12jk21kj12jk12
 
 
        // save a new user in the database
        const user = await this.usersService.create(email, result);
 
 
        // return the user
        return user;
    }
 
    async signin(email: string, password: string) {
        // find the user by email
        const [user] = await this.usersService.find(email);
        // if user not found, throw an error
        if (!user) {
            throw new NotFoundException('User not found');
        }
 
        // check if the password is correct
        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Invalid password');
        }
 
        // return the user
        return user;
       
    }
 
}
 
 
 