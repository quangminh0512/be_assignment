import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Doc } from '../models/document.model';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { readFileSync } from 'fs';
import countPages from 'page-count';
import { FileTypes } from 'page-count/dist/files-types/base.count';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Doc.name)
    private documentModel: Model<Doc>,
  ) {}

  async countPgs(file: Express.Multer.File): Promise<number> {
    const fileType: FileTypes = file.filename.slice(
      file.filename.lastIndexOf('.') + 1,
    ) as FileTypes;

    const fileBuffer = readFileSync(
      'src/document/uploads' + '/' + file.filename,
    );

    return countPages(fileBuffer, fileType);
  }

  async findAllDocuments(): Promise<Doc[] | undefined> {
    // Return toàn bộ document trong collection dưới dạng array
    return this.documentModel.find().populate('userId', '_id').exec();
  }

  async updateDocumentByDocumentId(
    documentId: string,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Doc> {
    const documentExist = await this.findDocumentsByDocumentId(documentId);
    if (!documentExist) {
      throw new BadRequestException('Document not found');
    }
    return this.documentModel
      .findOneAndUpdate({ documentId }, updateDocumentDto, { new: true })
      .exec();
  }

  async createDocument(createDocumentDto: CreateDocumentDto): Promise<Doc> {
    // Add vào Mongodb collection
    const createdDocument = new this.documentModel(createDocumentDto);
    return createdDocument.save();
  }

  async findDocumentById(id: string): Promise<Doc | undefined> {
    // Filter ra một document thông qua _id
    return this.documentModel.findById(id).exec();
  }

  async findDocumentsByUserId(userId: string): Promise<Doc[] | undefined> {
    // Filter toàn bộ documents thông qua userId dưới dạng array
    return this.documentModel.find({ userId }).exec();
  }

  async findDocumentsByDocumentId(
    documentId: string,
  ): Promise<Doc[] | undefined> {
    // Filter toàn bộ documents thông qua documentId dưới dạng array
    return this.documentModel.find({ documentId }).exec();
  }
}
