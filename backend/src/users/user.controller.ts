import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Public } from 'src/auth/auth.decorator';
import { instanceToPlain } from 'class-transformer';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }
    @Public()
    @Post('create')
    async createUser(@Body() userDto: UserDto): Promise<any> {
        const user = await this.userService.createUser(userDto);
        return instanceToPlain(user);
    }
    @Public()
    @Get()
    async findAllUsers(): Promise<any> {
        const users = await this.userService.findAllUsers();
        return instanceToPlain(users);
    }
    @Public()
    @Get(':id')
    async findUserById(@Param('id') id: number): Promise<any> {
        const user = await this.userService.findUserById(id);
        return instanceToPlain(user);
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() userDto: UserDto): Promise<any> {
        return this.userService.updateUser(id, userDto);
    }
    @Public()
    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        return this.userService.deleteUser(id);
    }
}