import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadDocument } from './uploadDocument.entity';
import { UploadDocumentDto } from './dto/uploadDocument.dto';
import * as fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class UploadDocumentService {
  constructor(
    @InjectRepository(UploadDocument)
    private documentRepository: Repository<UploadDocument>,
  ) {}

  async uploadDocument(uploadDocumentDto: UploadDocumentDto, originalName: string): Promise<UploadDocument> {
    const document = this.documentRepository.create({
      ...uploadDocumentDto,
      originalName,
    });
    return await this.documentRepository.save(document);
  }

  async findAllDocuments(): Promise<UploadDocument[]> {
    return await this.documentRepository.find({
      where: { softDeleted: false },
      relations: ['patient'],
      order: { createdAt: 'DESC' },
    });
  }

  async findDocumentsByPatient(patientId: number): Promise<UploadDocument[]> {
    return await this.documentRepository.find({
      where: { patientId, softDeleted: false },
      order: { createdAt: 'DESC' },
    });
  }

  async findDocumentById(id: number): Promise<UploadDocument> {
    const document = await this.documentRepository.findOne({
      where: { id, softDeleted: false },
      relations: ['patient'],
    });

    if (!document) {
      throw new NotFoundException(`Documento con ID ${id} non trovato`);
    }

    return document;
  }

  async updateDocument(
    id: number,
    uploadDocumentDto: Partial<UploadDocumentDto>,
  ): Promise<UploadDocument> {
    const document = await this.findDocumentById(id);
    Object.assign(document, uploadDocumentDto);
    return await this.documentRepository.save(document);
  }

  async deleteDocument(id: number): Promise<void> {
    const document = await this.findDocumentById(id);

    try {
      const filePath = `.${document.url}`;
      if (fs.existsSync(filePath)) {
        await unlinkAsync(filePath);
      }
    } catch (error) {
      console.error("Errore nell'eliminazione del file:", error);
    }

    await this.documentRepository.remove(document);
  }

  async softDeleteDocument(id: number): Promise<UploadDocument> {
    const document = await this.findDocumentById(id);
    document.softDeleted = true;
    return await this.documentRepository.save(document);
  }

  async findLatestDocuments(limit: number): Promise<UploadDocument[]> {
    return await this.documentRepository.find({
      where: { softDeleted: false },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async findDocumentsByName(name: string): Promise<UploadDocument[]> {
    return await this.documentRepository
      .createQueryBuilder('doc')
      .where('doc.softDeleted = :deleted', { deleted: false })
      .andWhere('doc.originalName ILIKE :search', { search: `%${name}%` })
      .orderBy('doc.createdAt', 'DESC')
      .getMany();
  }
}