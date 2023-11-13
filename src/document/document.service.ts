import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Doc } from '../models/document.model';
import { CreateDocumentDto } from './dto/document.dto';

// Thời gian giả định cho một lần in
const secondsPerPrint = 2;

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Doc.name)
    private documentModel: Model<Doc>,
  ) {}

  async findAllDocuments(): Promise<Doc[] | undefined> {
    // Return toàn bộ document trong collection dưới dạng array
    return this.documentModel.find().populate('userId', '_id').exec();
  }

  async createDocument(createDocumentDto: CreateDocumentDto): Promise<Doc> {
    // thời gian in = số copy * số trang * thời gian in một trang (giây)
    const printDuration: number = +createDocumentDto.pages * secondsPerPrint;

    // Chuyển startTime gửi lên thành dạng Date để lấy endTime và date -> Chuyển format start_print sang ISOString
    const startTime: Date = new Date(createDocumentDto.start_print);
    createDocumentDto.start_print = startTime.toISOString();

    // Tính endTime từ startTime -> Chuyển format end_print sang ISOString
    const endTime: Date = new Date(
      startTime.setSeconds(startTime.getSeconds() + printDuration),
    );
    createDocumentDto.end_print = endTime.toISOString();

    // Add vào Mongodb collection
    const createdDocument = new this.documentModel(createDocumentDto);
    return createdDocument.save();
  }

  async findDocumentById(id: string): Promise<Doc | undefined> {
    // Filter ra một tracking print thông qua _id
    return this.documentModel.findById(id).exec();
  }

  async findDocumentsByUserId(userId: string): Promise<Doc[] | undefined> {
    // Filter toàn bộ tracking print thông qua userId dưới dạng array
    return this.documentModel.find({ userId }).exec();
  }

  async findDocumentsByDocumentId(
    documentId: string,
  ): Promise<Doc[] | undefined> {
    // Filter toàn bộ tracking print thông qua documentId dưới dạng array
    return this.documentModel.find({ documentId }).exec();
  }
}
