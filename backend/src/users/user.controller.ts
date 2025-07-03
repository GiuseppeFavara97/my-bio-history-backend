import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('create')
    async createUser(@Body() userDto: UserDto): Promise<User> {
        return this.userService.createUser(userDto);
    }

    @Get('all')
    async findAllUsers(): Promise<User[]> {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    async findUserById(@Param('id') id: number): Promise<User> {
        return this.userService.findUserById(id);
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() userDto: UserDto): Promise<User> {
        return this.userService.updateUser(id, userDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        return this.userService.deleteUser(id);
    }
}