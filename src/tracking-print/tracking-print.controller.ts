import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TrackingPrintService } from './tracking-print.service';
import { TrackingPrint } from '../models/tracking_print.model';
import { CreateTrackingPrintDto } from './dto/create-tracking-print.dto';

@Controller('tracking-print')
export class TrackingPrintController {
  constructor(private readonly trackingPrintService: TrackingPrintService) {}

  // [GET] /tracking-print
  @Get()
  async findAllTrackingPrints(): Promise<TrackingPrint[] | undefined> {
    return this.trackingPrintService.findAllTrackingPrints();
  }

  // [GET] /tracking-print/:id
  @Get(':id')
  async findTrackingPrintById(
    @Param('id') id: string,
  ): Promise<TrackingPrint | undefined> {
    return this.trackingPrintService.findTrackingPrintById(id);
  }

  // [GET] /tracking-print/filter/date/:date
  @Get('filter/date/:date')
  async findTrackingPrintsByDate(
    @Param('date') date: number,
  ): Promise<TrackingPrint[] | undefined> {
    return this.trackingPrintService.findTrackingPrintsByDate(date);
  }

  // [GET] /tracking-print/filter/user/:userId
  @Get('filter/user/:userId')
  async findTrackingPrintsByUserId(
    @Param('userId') userId: string,
  ): Promise<TrackingPrint[] | undefined> {
    return this.trackingPrintService.findTrackingPrintsByUserId(userId);
  }

  // [GET] /tracking-print/filter/printer/:printerId
  @Get('filter/printer/:printerId')
  async findTrackingPrintsByPrinterId(
    @Param('printerId') printerId: string,
  ): Promise<TrackingPrint[] | undefined> {
    return this.trackingPrintService.findTrackingPrintsByPrinterId(printerId);
  }

  // [GET] /tracking-print/filter/document/:documentId
  @Get('filter/document/:documentId')
  async findTrackingPrintsByDocumentId(
    @Param('documentId') documentId: string,
  ): Promise<TrackingPrint[] | undefined> {
    return this.trackingPrintService.findTrackingPrintsByDocumentId(documentId);
  }

  // [POST] /tracking-print
  @Post()
  async createTrackingPrint(
    @Body() createTrackingPrintDto: CreateTrackingPrintDto,
  ): Promise<TrackingPrint> {
    return this.trackingPrintService.createTrackingPrint(
      createTrackingPrintDto,
    );
  }
}
