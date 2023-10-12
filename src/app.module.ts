import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';
import { PrinterModule } from './printer/printer.module';
import { TrackingPrintModule } from './tracking-print/tracking-print.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, {
      dbName: 'dbAssignment',
    }),
    UserModule,
    DocumentModule,
    PrinterModule,
    TrackingPrintModule,
    RoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
