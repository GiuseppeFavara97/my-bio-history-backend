import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadDocument } from './uploadDocument.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadDocumentDto } from './dto/uploadDocument.dto';
import { Patient } from 'src/patients/patient.entity';

@Injectable()
export class UploadDocumentService {
    constructor(
        @InjectRepository(UploadDocument)
        private documentRepository: Repository<UploadDocument>,
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
    ) { }
    async uploadDocument(uploadDocumentDto: UploadDocumentDto): Promise<UploadDocument> {
        const patient = await this.patientRepository.findOne({
            where: { id: uploadDocumentDto.patientId },
            relations: ["medicalRecord"]
        });

        if (!patient) {
            throw new NotFoundException(`Patient with ID ${uploadDocumentDto.patientId} not found`);
        }
        const document = this.documentRepository.create({
            name: uploadDocumentDto.name,
            type: uploadDocumentDto.type,
            size: uploadDocumentDto.size,
            url: uploadDocumentDto.url,
            patient: { id: patient.id },
            medicalRecord: { id: patient.medicalRecord.id }

        });
        this.documentRepository.save(document);
        return document;
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

<<<<<<< HEAD
    async softDeleteDocument(id: number): Promise<UploadDocument> {
        const document = await this.findDocumentById(id);
        document.softDeleted = true;
        return this.documentRepository.save(document);
    }

=======
>>>>>>> main
    async deleteDocument(id: number): Promise<void> {
        const result = await this.documentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Document with ID ${id} not found`);
        }
    }
}