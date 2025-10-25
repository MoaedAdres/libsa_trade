import { MulterModuleOptions } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const getUploadConfig = (configService: ConfigService): MulterModuleOptions => ({
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = configService.get('UPLOAD_DIR', './uploads');
      const fileType = req.body.fileType || 'temp';
      cb(null, `${uploadDir}/${fileType}/`);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  limits: {
    fileSize: configService.get('MAX_FILE_SIZE', 5242880), // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedImageTypes = configService.get('ALLOWED_IMAGE_TYPES', 'image/jpeg,image/png,image/webp').split(',');
    const allowedDocTypes = configService.get('ALLOWED_DOC_TYPES', 'application/pdf').split(',');
    const allowedTypes = [...allowedImageTypes, ...allowedDocTypes];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
});
