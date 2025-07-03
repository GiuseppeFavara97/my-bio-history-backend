import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import *as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    users: any;
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createUser(userDto: UserDto): Promise<User> {
        const user = this.userRepository.create(userDto);
        return this.userRepository.save(user);
    }

    async findAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findUsersByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    async updateUser(id: number, userDto: UserDto): Promise<User> {
        await this.userRepository.update(id, userDto);
        return this.findUserById(id);
    }

    async deleteUser(id: number): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }

    async findOne(email: string, password: string): Promise<User | undefined> {
        // logica per trovare l'utente
        const user = await this.userRepository.findOne({ where: { email } });
        return user === null ? undefined : user;
    }
}