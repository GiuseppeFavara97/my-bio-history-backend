import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Public } from 'src/auth/auth.decorator';
import { instanceToPlain } from 'class-transformer';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from './enum/userRole.enum';
import { User } from './user.entity';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Public()
    @Post('create')
    async createUser(@Body() userDto: UserDto): Promise<any> {
        const user = await this.userService.createUser(userDto);
        return instanceToPlain(user);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
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
    async deleteUser(@Param('id') id: number): Promise<User> {
        return this.userService.softDeleteUser(id);
    }

    @Public()
    @Post('generateTaxCode')
    async generateTaxCode(@Body() userDto: UserDto): Promise<string> {
        const taxCode = await this.userService.generateTaxCode(userDto);
        return taxCode;
    }
}