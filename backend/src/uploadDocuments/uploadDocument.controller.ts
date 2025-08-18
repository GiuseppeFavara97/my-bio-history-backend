import { Body, Controller, Delete, Get, Param, Post, Put, Patch } from '@nestjs/common';
import { UploadDocumentService } from './uploadDocument.service';
import { UploadDocument } from './uploadDocument.entity';
import { UploadDocumentDto } from './dto/uploadDocument.dto';

@Controller('uploadDocuments')
export class UploadDocumentController {
    constructor(private readonly uploadDocumentService: UploadDocumentService) { }
    @Post('upload')
    async uploadDocument(@Body() uploadDocumentDto: UploadDocumentDto): Promise<UploadDocument> {
        return this.uploadDocumentService.uploadDocument(uploadDocumentDto);
    }
    @Get()
    async findAllDocuments(): Promise<UploadDocument[]> {
        return this.uploadDocumentService.findAllDocuments();
    }
    @Get(':id')
    async findDocumentById(@Param('id') id: number): Promise<UploadDocument> {
        return this.uploadDocumentService.findDocumentById(id);
    }
    @Put(':id')
    async updateDocument(@Param('id') id: number, @Body() uploadDocumentDto): Promise<UploadDocument> {
        return this.uploadDocumentService.updateDocument(id, uploadDocumentDto);
    }
    @Delete(':id')
    async deleteDocument(@Param('id') id: number): Promise<void> {
        return this.uploadDocumentService.deleteDocument(id);
    }

    @Patch(':id')
    async softDeleteDocument(@Param('id') id: number): Promise<UploadDocument> {
        return this.uploadDocumentService.softDeleteDocument(id);
    }   
}