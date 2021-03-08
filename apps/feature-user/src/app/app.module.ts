import { SharedModule } from '@microservices-realworld-example-app/shared';
import { AuthModule } from '@microservices-realworld-example-app/auth';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.uri'),
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SharedModule,
    AuthModule,
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
  ],
})
export class AppModule {}
