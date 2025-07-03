import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DoctorModule } from 'src/doctors/doctor.module';
import { PatientModule } from 'src/patients/patient.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]),
        DoctorModule,
        PatientModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule { }