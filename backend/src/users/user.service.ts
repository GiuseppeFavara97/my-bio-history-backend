import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './uesr.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
 
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
}
