import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadDocumentService } from './uploadDocument.service';
import { UploadDocumentController } from './uploadDocument.controller';
import { UploadDocument } from './uploadDocument.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UploadDocument])],
    providers: [UploadDocumentService],
    controllers: [UploadDocumentController],
    exports: [TypeOrmModule]
})
export class UploadDocumentModule { }