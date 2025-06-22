import { Module } from '@nestjs/common';
import { VaccinesService } from './vaccines.service';
import { VaccinesController } from './vaccines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaccines } from './vaccines.entity';


@Module({
  
imports: [TypeOrmModule.forFeature([Vaccines])],
  controllers: [VaccinesController],
  providers: [VaccinesService],
})
export class VaccinesModule {}
