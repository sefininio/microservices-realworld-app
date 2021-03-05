import { Module } from '@nestjs/common';
import { PromisifyHttpService, StringUtilsService } from './services';

@Module({
  controllers: [],
  providers: [],
  exports: [
    PromisifyHttpService,
    StringUtilsService,
  ],
})
export class SharedModule {}
