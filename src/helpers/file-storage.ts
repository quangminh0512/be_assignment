import { diskStorage } from 'multer';
// import * as path from 'path';

type validMimeType = 'application/pdf';
// | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

const validMimeTypes: validMimeType[] = [
  // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/pdf',
];

export const saveFileToStorage = {
  storage: diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd() + '/src/document/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes: validMimeType[] = validMimeTypes;
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  },
};
