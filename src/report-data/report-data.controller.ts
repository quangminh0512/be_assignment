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
import { ReportDataDto } from './dto/report-data.dto';
import { ReportDataService } from './report-data.service';
import { ReportData } from 'src/models/report_data.model';
import { AccessTokenGuard } from 'src/auth/guards/tokens/accessToken.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/entities/user.entities';

@Controller('report-data')
export class ReportDataController {
    constructor(private readonly reportDataService: ReportDataService) {}

    @UseGuards(AccessTokenGuard, RoleGuard)
    @Roles(Role.Admin)
    @Post()
    async createMonthlyReportData(
        @Param('month') month: number,
        @Param('year') year: number,
    ): Promise<ReportData> {
        return this.reportDataService.createMonthlyReportData(month, year);
    }

    @UseGuards(AccessTokenGuard, RoleGuard)
    @Roles(Role.Admin)
    @Post()
    async createYearlyReportData(
        @Param('year') year: number,
    ): Promise<ReportData> {
        return this.reportDataService.createYearlyReportData( year);
    }
    
    @Post()
    async createStudentMonthlyReportData(
        @Param('studentID') studentID: string,
        @Param('month') month: number,
        @Param('year') year: number,
    ): Promise<ReportData> {
        return this.reportDataService.createStudentMonthlyReportData(studentID, month, year);
    }

    
    @Post()
    async createStudentYearlyReportData(
        @Param('studentID') studentID: string,
        @Param('year') year: number,
    ): Promise<ReportData> {
        return this.reportDataService.createStudentYearlyReportData(studentID, year);
    }

    @Get()
    async findAllReport(): Promise<ReportData[]>{
        return this.reportDataService.findAllReport();
    }

    @Get(':id')
    async findReportbyID(
        @Param('id') id: string,
    ): Promise<ReportData | undefined> {
        return this.reportDataService.findReportbyID(id);
    }

    @Get(':month/:year')
    async findReportbyMonth(
        @Param('month') month: number,
        @Param('year') year: number,
    ): Promise<ReportData[] | undefined> {
        return this.reportDataService.findReportbyMonth(month,year);
    }


}