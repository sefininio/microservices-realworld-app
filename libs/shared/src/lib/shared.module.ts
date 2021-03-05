import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { StringUtilsService, PromisifyHttpService } from './services';
import configuration from './config/configuration';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [
    StringUtilsService,
    PromisifyHttpService,
  ],
  exports: [
    StringUtilsService,
    PromisifyHttpService,
  ],
})
export class SharedModule {}
