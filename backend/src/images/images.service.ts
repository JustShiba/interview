import * as fs from 'fs';
import * as path from 'path';

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Multer } from 'multer';
import { Response } from 'express';

@Injectable()
export class ImagesService {
  private readonly imageFolder = path.resolve('images');

  findAll(): string[] {
    try {
      const imagesPath = this.imageFolder;
      const images = fs.readdirSync(imagesPath);

      if (!images.length) throw new NotFoundException('Image not found');

      return images;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(filename: string, res: Response): void {
    const imagePath = path.join(this.imageFolder, filename);

    if (!fs.existsSync(imagePath)) {
      throw new NotFoundException('Image not found');
    }
    const readStream = fs.createReadStream(imagePath);
    readStream.pipe(res);
  }

  update(filename: string, file: Multer.File): void {
    try {
      const imagePath = path.join(this.getImageFolder(), filename);

      if (!fs.existsSync(imagePath)) {
        throw new NotFoundException('Image not found');
      }

      const writeStream = fs.createWriteStream(imagePath);
      writeStream.write(file.buffer);
      writeStream.end();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(filename: string): Promise<void> {
    try {
      const imagePath = path.join(this.getImageFolder(), filename);

      fs.unlink(imagePath, (error) => {
        if (error) {
          throw new Error(`Failed to delete image ${filename}`);
        }
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  getImageFolder(): string {
    return this.imageFolder;
  }
}
