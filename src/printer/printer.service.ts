import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Printer, PrinterDocument } from '../models/printer.model';
import { CreatePrinterDto } from './dto/createPrinter.dto';
import { UpdatePrinterDto } from './dto/updatePrinter.dto';

@Injectable()
export class PrinterService {
  constructor(
    @InjectModel(Printer.name)
    private printerModel: mongoose.Model<Printer>,
  ) {}

  async create(createPrinterDto: CreatePrinterDto): Promise<PrinterDocument> {
    const createPrinter = new this.printerModel({ ...createPrinterDto });
    return createPrinter.save();
  }

  async findAll(): Promise<PrinterDocument[]> {
    return this.printerModel.find().exec();
  }

  async findById(id: string): Promise<PrinterDocument> {
    const printer = this.printerModel.findById(id);

    if (!printer) {
      throw new NotFoundException('Printer not found.');
    }

    return printer;
  }

  async update(
    id: string,
    updatePrinterDto: UpdatePrinterDto,
  ): Promise<PrinterDocument> {
    const printerExist = await this.printerModel.findById(id);

    if (!printerExist) {
      throw new BadRequestException('Printer not found');
    }

    return this.printerModel
      .findByIdAndUpdate(id, updatePrinterDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<PrinterDocument> {
    const printerExist = await this.printerModel.findById(id);

    if (!printerExist) {
      throw new BadRequestException('Printer not found');
    }

    return this.printerModel.findByIdAndDelete(id).exec();
  }
}
