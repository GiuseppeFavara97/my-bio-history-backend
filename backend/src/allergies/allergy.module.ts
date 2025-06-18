import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergy } from './allergy.entity';
import { AllergyService } from './allergy.service';
import { AllergyController } from './allergy.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Allergy])],
    providers: [AllergyService],
    controllers: [AllergyController],
})
export class AllergiesModule { }