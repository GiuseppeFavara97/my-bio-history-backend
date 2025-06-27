import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/uesr.entity';
import { UserService } from '../users/user.service';
import { UserController } from '../users/user.controller';


@Module({
    imports: [TypeOrmModule.forFeature([User]), UserModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule { }