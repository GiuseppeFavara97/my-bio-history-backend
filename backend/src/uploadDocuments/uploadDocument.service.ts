import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadDocument } from './uploadDocument.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadDocumentDto } from './dto/uploadDocument.dto';

@Injectable()
export class UploadDocumentService {
    constructor(
        @InjectRepository(UploadDocument)
        private documentRepository: Repository<UploadDocument>,
    ) { }
    async uploadDocument(uploadDocumentDto: UploadDocumentDto): Promise<UploadDocument> {
        const document = this.documentRepository.create(uploadDocumentDto);
        return this.documentRepository.save(document);
    }
    async findAllDocuments(): Promise<UploadDocument[]> {
        return this.documentRepository.find();
    }
    async findDocumentById(id: number): Promise<UploadDocument> {
        const document = await this.documentRepository.findOne({ where: { id } });
        if (!document) {
            throw new NotFoundException(`Document with ID ${id} not found`);
        }
        return document;
    }
    async updateDocument(id: number, uploadDocumentDto: UploadDocumentDto): Promise<UploadDocument> {
        await this.documentRepository.update(id, uploadDocumentDto);
        return this.findDocumentById(id);
    }

    async softDeleteDocument(id: number): Promise<UploadDocument> {
        const document = await this.findDocumentById(id);
        document.softDeleted = true;
        return this.documentRepository.save(document);
    }

    async deleteDocument(id: number): Promise<void> {
        const result = await this.documentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Document with ID ${id} not found`);
        }
    }
}