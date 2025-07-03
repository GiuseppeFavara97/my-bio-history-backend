import { Module } from '@nestjs/common';
import { CareService } from './care.service';
import { CareController } from './care.controller';
import { Care } from './care.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forFeature([Care]), // permette di utilizzare il repository Care
  ],
  controllers: [CareController],
  providers: [CareService],
})
export class CareModule { }

