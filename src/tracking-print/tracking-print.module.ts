import { Module } from '@nestjs/common';
import { TrackingPrintService } from './tracking-print.service';
import { TrackingPrintController } from './tracking-print.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TrackingPrint,
  TrackingPrintSchema,
} from 'src/models/tracking_print.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrackingPrint.name, schema: TrackingPrintSchema },
    ]),
  ],
  providers: [TrackingPrintService],
  controllers: [TrackingPrintController],
})
export class TrackingPrintModule {}
