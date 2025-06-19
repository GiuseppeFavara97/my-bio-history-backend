import { Module } from '@nestjs/common';
import { PathologyService } from './pathology.service';
import { PathologyController } from './pathology.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Pathology} from './entities/pathology.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Pathology])],
  controllers: [PathologyController],
  providers: [PathologyService],
})
export class PathologyModule {}
