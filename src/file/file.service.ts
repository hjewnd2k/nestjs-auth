import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { serverUrl } from 'src/utils/contants';

@Injectable()
export class FileService {
  handleUpload(files: Array<Express.Multer.File>) {
    const newFiles = files.map((file) => ({
      url: `${serverUrl}/${file.filename}`,
    }));

    return { files: newFiles };
  }

  seeUploadFile(image, res: Response) {
    return res.sendFile(image, {
      root: 'uploads',
    });
  }
}
