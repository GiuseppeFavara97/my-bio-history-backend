import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  BadRequestException,
  SetMetadata,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadDocumentService } from './uploadDocument.service';
import { UploadDocument } from './uploadDocument.entity';
import { UploadDocumentDto } from './dto/uploadDocument.dto';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('uploadDocuments')
export class UploadDocumentController {
  constructor(private readonly uploadDocumentService: UploadDocumentService) {}

  @Public()
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/documents',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
      fileFilter: (req, file, callback) => {
        const allowedMimes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (allowedMimes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('Tipo di file non supportato'), false);
        }
      },
    }),
  )
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body('patientId') patientId: string,
  ): Promise<UploadDocument> {
    if (!file) {
      throw new BadRequestException('Nessun file caricato');
    }

    const uploadDocumentDto: UploadDocumentDto = {
      name: file.filename,
      type: file.mimetype,
      size: file.size,
      url: `/uploads/documents/${file.filename}`,
      patientId: parseInt(patientId),
    };

    return this.uploadDocumentService.uploadDocument(uploadDocumentDto, file.originalname);
  }

  @Get('search')
  async findDocumentsByName(@Query('name') name: string): Promise<UploadDocument[]> {
    if (!name || name.trim() === '') {
      throw new BadRequestException('Il parametro "name" è obbligatorio');
    }
    return this.uploadDocumentService.findDocumentsByName(name);
  }

  @Get('latest')
  async findLatestDocuments(@Query('limit') limitParam?: string): Promise<UploadDocument[]> {
    const limit = parseInt(limitParam || '5', 10);
    return this.uploadDocumentService.findLatestDocuments(limit);
  }

  @Get()
  async findAllDocuments(): Promise<UploadDocument[]> {
    return this.uploadDocumentService.findAllDocuments();
  }

  @Get('patient/:patientId')
  async findDocumentsByPatient(
    @Param('patientId', ParseIntPipe) patientId: number,
  ): Promise<UploadDocument[]> {
    return this.uploadDocumentService.findDocumentsByPatient(patientId);
  }

  @Get(':id')
  async findDocumentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UploadDocument> {
    return this.uploadDocumentService.findDocumentById(id);
  }

  @Put(':id')
  async updateDocument(
    @Param('id', ParseIntPipe) id: number,
    @Body() uploadDocumentDto: UploadDocumentDto,
  ): Promise<UploadDocument> {
    return this.uploadDocumentService.updateDocument(id, uploadDocumentDto);
  }

  @Delete(':id')
  async deleteDocument(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.uploadDocumentService.deleteDocument(id);
  }

  @Patch(':id')
  async softDeleteDocument(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UploadDocument> {
    return this.uploadDocumentService.softDeleteDocument(id);
  }
}