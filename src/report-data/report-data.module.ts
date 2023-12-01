import { Module } from '@nestjs/common';
import { ReportDataService } from './report-data.service';
import { ReportDataController } from './report-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { 
    ReportData, 
    ReportDataSchema, 
} from 'src/models/report_data.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ReportData.name,
                schema: ReportDataSchema,
            },
        ]),
    ],
    providers: [ReportDataService],
    controllers: [ReportDataController],
})
export class ReportDataModule {}