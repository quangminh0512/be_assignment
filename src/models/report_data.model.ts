import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Printer } from './printer.model';
import { User } from './user.model';

export type ReportDataDocument= ReportData & Document;
@Schema()
export class ReportData{
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Printer' })
    printerId: Printer;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop()
    documentId: string;

    @Prop()
    month: number

    @Prop()
    year: number

}

export const ReportDataSchema = SchemaFactory.createForClass(ReportData);