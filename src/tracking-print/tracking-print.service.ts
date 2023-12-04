import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TrackingPrint } from '../models/tracking_print.model';
import { CreateTrackingPrintDto } from './dto/create-tracking-print.dto';

// Thời gian giả định cho một lần in
const secondsPerPrint = 2;

@Injectable()
export class TrackingPrintService {
  constructor(
    @InjectModel(TrackingPrint.name)
    private trackingPrintModel: Model<TrackingPrint>,
  ) {}

  async createTrackingPrint(
    createTrackingPrintDto: CreateTrackingPrintDto,
  ): Promise<TrackingPrint> {
    // thời gian in = số copy * số trang * thời gian in một trang (giây)
    const printDuration: number =
      +createTrackingPrintDto.copies *
      +createTrackingPrintDto.pages *
      secondsPerPrint;

    createTrackingPrintDto.time_started = new Date();

    // Chuyển startTime gửi lên thành dạng Date để lấy endTime và date -> Chuyển format time_started sang ISOString
    const startTime: Date = new Date(createTrackingPrintDto.time_started);
    createTrackingPrintDto.time_started = startTime.toISOString();

    // Lưu date để tiện filter các tracking print theo ngày
    createTrackingPrintDto.date = new Date();

    // Tính endTime từ startTime -> Chuyển format time_end sang ISOString
    const endTime: Date = new Date(
      startTime.setSeconds(startTime.getSeconds() + printDuration),
    );
    createTrackingPrintDto.time_end = endTime.toISOString();

    // Add vào Mongodb collection
    const createdTrackingPrint = new this.trackingPrintModel(
      createTrackingPrintDto,
    );
    return createdTrackingPrint.save();
  }

  async findAllTrackingPrints(): Promise<TrackingPrint[] | undefined> {
    // Return toàn bộ tracking print trong collection dưới dạng array
    return this.trackingPrintModel
      .find()
      .populate('printerId', '_id')
      .populate('userId', '_id')
      .exec();
  }

  async findTrackingPrintById(id: string): Promise<TrackingPrint | undefined> {
    // Filter ra một tracking print thông qua _id
    return this.trackingPrintModel.findById(id).exec();
  }

  async findTrackingPrintsByUserId(
    userId: string,
  ): Promise<TrackingPrint[] | undefined> {
    // Filter toàn bộ tracking print thông qua userId dưới dạng array
    return this.trackingPrintModel.find({ userId }).exec();
  }

  async findTrackingPrintsByPrinterId(
    printerId: string,
  ): Promise<TrackingPrint[] | undefined> {
    // Filter toàn bộ tracking print thông qua printerId dưới dạng array
    return this.trackingPrintModel.find({ printerId }).exec();
  }

  async findTrackingPrintsByDocumentId(
    documentId: string,
  ): Promise<TrackingPrint[] | undefined> {
    // Filter toàn bộ tracking print thông qua documentId dưới dạng array
    return this.trackingPrintModel.find({ documentId }).exec();
  }

  async findTrackingPrintsByDate(
    date: number,
  ): Promise<TrackingPrint[] | undefined> {
    // Filter toàn bộ tracking print thông qua date dưới dạng array
    return this.trackingPrintModel.find({ date }).exec();
  }
}
