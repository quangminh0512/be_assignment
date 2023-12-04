export class CreateTrackingPrintDto {
  printerId: string;
  userId: string;
  documentId: string;
  type: string;
  content: string;
  pages: string;
  paperType: string;
  copies: string;
  time_started: string | Date;
  time_end: string;
  date: string | Date | number;
}
