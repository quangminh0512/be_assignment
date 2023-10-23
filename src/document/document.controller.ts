import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
// import { join } from 'path';
// import { Observable, of } from 'rxjs';
import { saveFileToStorage } from '../helpers/file-storage';
import { DocumentService } from './document.service';
import { Doc } from '../models/document.model';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { readFileSync } from 'fs';
import countPages from 'page-count';
// import { DocxCounter, OdtCounter, PdfCounter, PptxCounter } from "page-count";
import { FileTypes } from 'page-count/dist/files-types/base.count';

const secondsPerPrint = 2;

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  // [GET] /document
  @Get()
  async findAllDocuments(): Promise<Doc[] | undefined> {
    return this.documentService.findAllDocuments();
  }

  // [GET] /document/:id
  @Get(':id')
  async findDocumentById(@Param('id') id: string): Promise<Doc | undefined> {
    return this.documentService.findDocumentById(id);
  }

  // [GET] /document/filter/:documentId
  @Get('filter/:documentId')
  async findDocumentsByDocumentId(
    @Param('documentId') documentId: string,
  ): Promise<Doc[] | undefined> {
    return this.documentService.findDocumentsByDocumentId(documentId);
  }

  // [GET] /document/filter/user/:userId
  @Get('filter/user/:userId')
  async findDocumentsByUserId(
    @Param('userId') userId: string,
  ): Promise<Doc[] | undefined> {
    return this.documentService.findDocumentsByUserId(userId);
  }

  // [PUT] /document/print/:documentId
  @Put('print/:documentId')
  async printDocument(
    @Body() updateDocumentDto: UpdateDocumentDto,
    @Param('documentId') documentId: string,
  ): Promise<Doc> {
    // thời gian in = số copy * số trang * thời gian in một trang (giây)
    const printDuration: number = +updateDocumentDto.pages * secondsPerPrint;

    // Tạo startTime là ngày hôm nay
    const startTime: Date = new Date();
    updateDocumentDto.start_print = startTime.toISOString();

    // Tính endTime từ startTime -> Chuyển format end_print sang ISOString
    const endTime: Date = new Date(
      startTime.setSeconds(startTime.getSeconds() + printDuration),
    );
    updateDocumentDto.end_print = endTime.toISOString();
    return this.documentService.updateDocumentByDocumentId(
      documentId,
      updateDocumentDto,
    );
  }

  // [POST] /document/upload
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', saveFileToStorage))
  async uploadDocument(
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    // Đảm bảo file in là pdf hay là docx
    const fileName = file?.filename;

    if (!fileName) return { error: 'File must be a docx, pdf' };

    const fileType: FileTypes = file.filename.slice(
      file.filename.lastIndexOf('.') + 1,
    ) as FileTypes;
    const fileBuffer = readFileSync(
      'src/document/uploads' + '/' + file.filename,
    );
    const pages = await countPages(fileBuffer, fileType);

    createDocumentDto.fileName = file.filename;
    // return this.documentService.createDocument(createDocumentDto);
    return pages;
  }
}
