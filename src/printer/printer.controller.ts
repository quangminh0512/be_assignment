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
import { CreatePrinterDto } from './dto/createPrinter.dto';
import { UpdatePrinterDto } from './dto/updatePrinter.dto';

@Controller('printer')
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  @Post()
  async createPrinter(
    @Body()
    createPrinterDto: CreatePrinterDto,
  ) {
    return this.printerService.create(createPrinterDto);
  }

  @Get()
  async findAll() {
    return this.printerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.printerService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id')
    id: string,
    @Body()
    updatePrinterDto: UpdatePrinterDto,
  ) {
    return this.printerService.update(id, updatePrinterDto);
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ) {
    return this.printerService.delete(id);
  }
}
