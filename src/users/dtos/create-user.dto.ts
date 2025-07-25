import { IsString } from 'class-validator'

export class createUserdto{
    @IsString()
    email:string;

    @IsString()
    password:string
}