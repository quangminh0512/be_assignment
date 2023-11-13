import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { DocumentService } from './document.service';
import { Doc } from '../models/document.model';
import { CreateDocumentDto } from './dto/document.dto';

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

  // [POST] /document
  @Post()
  async createDocument(
    @Body() createDocumentDto: CreateDocumentDto,
  ): Promise<Doc> {
    return this.documentService.createDocument(createDocumentDto);
  }
}
