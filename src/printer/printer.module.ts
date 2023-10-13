import { Module } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { PrinterController } from './printer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Printer, PrinterSchema } from 'src/models/printer.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Printer.name, schema: PrinterSchema }]),
  ],
  providers: [PrinterService],
  controllers: [PrinterController],
})
export class PrinterModule {}

