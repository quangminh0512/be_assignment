import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import * as mongoose from 'mongoose';
import { ReportDataDto } from './dto/report-data.dto';
import { ReportData, ReportDataDocument } from 'src/models/report_data.model';
import { TrackingPrintDocument } from 'src/models/tracking_print.model';
import { User } from 'src/models/user.model';
import { Doc } from 'src/models/document.model';
import { UserService } from 'src/user/user.service';
import { create } from 'domain';


@Injectable()
export class ReportDataService {
    constructor(
        @InjectModel(ReportData.name)
        private reportDataModel: mongoose.Model<ReportData>,
        @InjectModel('TrackingPrint') 
        private readonly tracking_print_documentModel: mongoose.Model<TrackingPrintDocument>,
        @InjectModel('Document') 
        private readonly documentModel: mongoose.Model<Document>,
        @InjectModel('User') 
        private readonly userModel: mongoose.Model<User>,
    ){}

    async createMonthlyReportData(
        month: number,
        year: number,
    ): Promise<ReportData> {
        const startDate= new Date(year, month -1, 1);
        const endDate= new Date(year,month,0);

        const Monthlydata = await this.tracking_print_documentModel
        .aggregate()
        .match({
            date: {
                $gte: startDate,
                $lte: endDate,
            },
        })
        .project({
            printerId: 1,
            userId:1,
            documentId: 1,
        });

        const report: ReportDataDto[]= Monthlydata
        .map((data) =>{
            const reportDto= new ReportDataDto();
            reportDto.printerId = data.printerId;
            reportDto.userId = data.userId;
            reportDto.documentId = data.documentId;
            reportDto.year = data.year;
            reportDto.month = data.month;
            return reportDto;
        });
        const createReportData= new this.reportDataModel(report)
        return createReportData.save();
    }

    async createYearlyReportData(
        year:number
        
    ): Promise<ReportData>{
        const yearlyReport= [];
        for(let month=1; month <=12;month++){
            try{
            yearlyReport.push(this.findReportbyMonth(month, year));
            }
            catch (error){
                console.error
                ('Cannot get report for ${month}/${year}');
            }
        }
        const createReportData= new this.reportDataModel(yearlyReport);
        return createReportData.save();
    }

    async createStudentMonthlyReportData(
        studentID: string,
        month: number,
        year: number,
    ): Promise<ReportData>{
        const startDate= new Date(year, month -1, 1);
        const endDate= new Date(year,month,0);
        const student= await this.userModel.findById(studentID);
        if(!student){
            throw new BadRequestException('Student ID not found');
        }
        const Monthlydata = await this.tracking_print_documentModel
        .aggregate()
        .match({
            date: {
                $gte: startDate,
                $lte: endDate,
            },
            userID: studentID,
        })
        .project({
            printerId: 1,
            documentId: 1,
        });

        const report: ReportData[]= Monthlydata
        .map((data) =>{
            const reportDto= new ReportData();
            reportDto.printerId = data.printerId;
            reportDto.userId = student;
            reportDto.documentId = data.documentId;
            reportDto.year = data.year;
            reportDto.month = data.month;
            return reportDto;
        });
        const createReportData= new this.reportDataModel(
            report,
        );
        return createReportData.save();
    }

    async createStudentYearlyReportData(
        studentID: string,
        year:number
        
    ): Promise<ReportData>{
        const student= await this.userModel.findById(studentID);
        if(!student){
            throw new BadRequestException('Student ID not found');
        }
        const name= student.name;
        const yearlyReport= [];
        for(let month=1; month <=12;month++){
            try{
                const monthlyData= 
            await this.createStudentMonthlyReportData(studentID, month, year);
            yearlyReport.push(this.findReportbyMonth(month, year));
            }
            catch (error){
                console.error
                ('Cannot get report of ${name} for ${month}/${year}');
            }
        }
        const createReportData= new this.reportDataModel(
            yearlyReport,
        );
        return createReportData.save();
        
    }

    async findAllReport(): Promise<ReportDataDocument[]>{
        return this.reportDataModel.find().exec();
    }

    async findReportbyID(id: string): Promise<ReportDataDocument> {
        const Report= this.reportDataModel.findById(id);
        if(!Report){
            throw new NotFoundException('Report not found');
        }
        return Report;
    }

    async findReportbyMonth(month:number, year:number): Promise<ReportDataDocument[]> {
        const report= this.reportDataModel.find({
            $and: [
                {month: month},
                {year: year},
            ]
        })
        if( !report){
            throw new NotFoundException('Report not found');
        }
        return report;
    }

    
}