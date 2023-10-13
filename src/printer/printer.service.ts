import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Printer } from './schemas/printer.schema';

@Injectable()
export class PrinterService {
  constructor(
    @InjectModel(Printer.name)
    private printerModel: mongoose.Model<Printer>,
  ) {}

  async findAll(): Promise<Printer[]> {
    const printers = await this.printerModel.find();
    return printers;
  }

  async create(printer: Printer): Promise<Printer> {
    const res = await this.printerModel.create(printer);
    return res;
  }

  async findById(id: string): Promise<Printer> {
    const printer = await this.printerModel.findById(id);

    if (!printer) {
      throw new NotFoundException('Printer not found.');
    }

    return printer;
    
  }

  async updateById(id: string, printer: Printer): Promise<Printer> {
    return await this.printerModel.findByIdAndUpdate(id, printer, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Printer> {
    return await this.printerModel.findByIdAndDelete(id);
  }
}
