import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PrinterService } from './printer.service';
import { CreatePrinterDto } from './dto/createPrinter.dto';
import { UpdatePrinterDto } from './dto/updatePrinter.dto';
import { AccessTokenGuard } from 'src/auth/guards/tokens/accessToken.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/entities/user.entities';

@Controller('printer')
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}

  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles(Role.Admin)
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

  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles(Role.Admin)
  @Put('file-type/:id')
  async setFileType(
    @Param('id')
    id: string,
    @Body()
    updatePrinterDto: UpdatePrinterDto,
  ) {
    return this.printerService.update(id, updatePrinterDto);
  }

  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id')
    id: string,
    @Body()
    updatePrinterDto: UpdatePrinterDto,
  ) {
    return this.printerService.update(id, updatePrinterDto);
  }

  @UseGuards(AccessTokenGuard, RoleGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ) {
    return this.printerService.delete(id);
  }
}
