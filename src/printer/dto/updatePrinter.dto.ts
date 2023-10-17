import { PartialType } from '@nestjs/mapped-types';
import { CreatePrinterDto } from './createPrinter.dto';

export class UpdatePrinterDto extends PartialType(CreatePrinterDto) {}
