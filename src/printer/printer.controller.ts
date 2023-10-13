import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PrinterService } from './printer.service';
import { CreatePrinterDto } from './dto/create-printer.dto';
import { UpdatePrinterDto } from './dto/update-printer.dto';
import { Printer } from './schemas/printer.schema';



@Controller('printer')
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  @Post()
  async createPrinter(
    @Body()
    printer: CreatePrinterDto,
  ): Promise<Printer> {
    return this.printerService.create(printer);
  }

  @Get()
  async findAll(): Promise<Printer[]> {
    return this.printerService.findAll();
  }

  @Get(':id')
  findOne(@Param('idorstring') id: string ) {
    
    return this.printerService.findById(id);
    
    
  }

  @Put(':id')
  async updatePrinter(
    @Param('id')
    id: string,
    @Body()
    printer: UpdatePrinterDto,
  ): Promise<Printer> {
    return this.printerService.updateById(id, printer);
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ): Promise<Printer> {
    return this.printerService.deleteById(id);
  }
}


