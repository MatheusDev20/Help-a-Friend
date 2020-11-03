import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.join(__dirname, '..', '..', 'tmp');
// exportar o objeto de conf do multer
export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, cb) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      return cb(null, fileName);
    },
  }),
};
