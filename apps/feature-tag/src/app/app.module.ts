import { Queues } from '@microservices-realworld-example-app/models';
import { SharedModule } from '@microservices-realworld-example-app/shared';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EvaluateTagsConsumer } from './handlers/evaluateTags.consumer';
import { Tag, TagSchema } from './schemas/tag.schema';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';


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
