import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PromisifyHttpService, StringUtilsService } from './services';


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
