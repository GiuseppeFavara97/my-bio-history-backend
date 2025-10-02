import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UploadDocumentController } from './uploadDocument.controller';
import { UploadDocumentService } from './uploadDocument.service';
import { UploadDocument } from './uploadDocument.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UploadDocument]),
        MulterModule.register({
            dest: './uploads/documents',
        }),
    ],
    controllers: [UploadDocumentController],
    providers: [UploadDocumentService],
    exports: [UploadDocumentService],
})
export class UploadDocumentModule {}