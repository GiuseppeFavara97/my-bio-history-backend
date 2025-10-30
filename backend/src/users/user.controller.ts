import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Req, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Public } from 'src/auth/auth.decorator';
import { instanceToPlain } from 'class-transformer';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/auth.decorator';
import { UserRole } from './enum/userRole.enum';
import { User } from './user.entity';


class VerifyTaxCodeDto {
    taxCode: string;
}

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Public()
    @Post('create')
    async createUser(@Body() userDto: UserDto): Promise<any> {
        const user = await this.userService.createUser(userDto);
        return instanceToPlain(user);
    }

    @UseGuards(AuthGuard)
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

    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() userDto: UserDto): Promise<any> {
        console.log("cosa arriva",userDto )
        // return this.userService.updateUser(id, userDto);
    }

    @Public()
    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<User> {
        return this.userService.softDeleteUser(id);
    }
    @Public()
    @Post('taxCode')
    async generateTaxCode(@Body() userDto: UserDto) {
        return await this.userService.generateTaxCode(userDto);
        
    }

    @UseGuards(AuthGuard)
    @Get('user/me')
    async loggedUser (@Req() req) {
    return this.userService.loggedUser(req.user.sub)

    }
}