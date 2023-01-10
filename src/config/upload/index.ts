import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', '..', 'uploads');

const tempFolder = path.resolve(__dirname, '..', '..', '..', 'temp');

interface IUploadConfig {
  driver: 'disk' | 's3';

  directory: string;
  tempFolder: string;
  multer: {
    storage: StorageEngine;
  };

  config: {
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',

  directory: uploadFolder,
  tempFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');

        const filename = `${fileHash}-${file.originalname}`;

        callback(null, filename);
      },
    }),
  },

  config: {
    aws: {
      bucket: process.env.AWS_BUCKET,
    },
  },
} as IUploadConfig;
