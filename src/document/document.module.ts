import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Doc, DocSchema } from 'src/models/document.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Doc.name, schema: DocSchema }])],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
