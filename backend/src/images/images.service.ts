import * as process from 'process';

import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './interfaces/image.interface';

@Injectable()
export class ImagesService {
  constructor(private readonly httpService: HttpService) {}

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  async findAll(): Promise<Image[]> {
    const [[firstImages], [secondImages]] = await Promise.all([
      this.httpService.axiosRef.get(process.env.PHOTOS_API_ENDPOINT),
      this.httpService.axiosRef.get(process.env.IMAGES_API_ENDPOINT),
    ])
      .then((responses) => {
        return responses.map((res) => res.data);
      })
      .catch((err) => {
        throw new HttpException(err, 500);
      });

    return [...firstImages, ...secondImages];
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
