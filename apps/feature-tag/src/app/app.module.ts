import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '@microservices-realworld-example-app/shared';

import { Tag, TagSchema } from './schemas/tag.schema';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { BullModule } from '@nestjs/bull';
import { Queues } from '@microservices-realworld-example-app/models';
import { join } from 'path';
import { EvaluateTagsConsumer } from './handlers/evaluateTags.consumer';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.uri'),
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Tag.name, schema: TagSchema }
    ]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('queue.host'),
          port: configService.get<number>('queue.port'),
        }
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: Queues.Tags,
    }),
  ],
  controllers: [TagController],
  providers: [
    TagService,
    EvaluateTagsConsumer,
  ],
})
export class AppModule {}
