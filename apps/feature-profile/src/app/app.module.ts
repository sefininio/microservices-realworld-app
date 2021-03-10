import { AuthModule } from '@microservices-realworld-example-app/auth';
import { Queues } from '@microservices-realworld-example-app/models';
import { SharedModule } from '@microservices-realworld-example-app/shared';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserConsumer } from './handlers/user.consumer';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile, ProfileSchema } from './schemas/profile.schema';


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
      { name: Profile.name, schema: ProfileSchema },
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
      name: Queues.Users,
    }),
    AuthModule,
  ],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    UserConsumer,
  ],
})
export class AppModule {}
