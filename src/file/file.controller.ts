import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { multerOptions } from './config';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('')
  @UseInterceptors(FilesInterceptor('files', null, multerOptions))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.fileService.handleUpload(files);
  }

  @Get(':imgPath')
  seeUploadFile(@Param('imgPath') image, @Res() res) {
    return this.fileService.seeUploadFile(image, res);
  }
}
