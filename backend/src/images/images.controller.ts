import * as path from 'path';

import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage, Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: path.resolve('images'),
        filename: (req, file, callback) => {
          const { originalname } = file;

          const ext = path.extname(originalname);
          callback(null, `${Date.now()}_${originalname.split('.')[0]}${ext}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  async create(
    @UploadedFile() file: Multer.File,
  ): Promise<{ filename: string }> {
    if (!file) {
      throw new BadRequestException('No image provided');
    }

    return { filename: file.filename };
  }

  @Get()
  @HttpCode(200)
  findAll(): string[] {
    return this.imagesService.findAll();
  }

  @Get(':filename')
  @HttpCode(200)
  findOne(@Param('filename') filename: string, @Res() res: Response): void {
    this.imagesService.findOne(filename, res);
  }

  @Patch(':filename')
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  async update(
    @Param('filename') filename: string,
    @UploadedFile() file: Multer.File,
  ): Promise<{ filename: string }> {
    if (!file) {
      throw new BadRequestException('No image provided');
    }

    await this.imagesService.update(filename, file);

    return { filename: filename };
  }

  @Delete(':filename')
  @HttpCode(200)
  remove(@Param('filename') filename: string): Promise<void> {
    return this.imagesService.remove(filename);
  }
}
