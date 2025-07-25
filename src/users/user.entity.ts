import {AfterInsert, AfterUpdate, AfterRemove,Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { Report } from "../reports/report.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    @Exclude()
    password:string;

    @Column({default: true})
    admin:boolean;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert(){
        console.log('Inserted User this id',this.id);   
    }

    @AfterUpdate()
    logUpdate(){
        console.log('Update User this id',this.id);   
    }

    @AfterRemove()
    logRemove(){
        console.log('Remove User this id',this.id);   
    }
}