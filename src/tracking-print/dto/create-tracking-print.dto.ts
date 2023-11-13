export class CreateTrackingPrintDto {
  printerId: string;
  userId: string;
  documentId: string;
  type: string;
  content: string;
  pages: string;
  paperType: string;
  copies: string;
  time_started: string;
  time_end: string;
  date: number;
}
