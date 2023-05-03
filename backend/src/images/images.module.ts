import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';

@Module({
  imports: [HttpModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
