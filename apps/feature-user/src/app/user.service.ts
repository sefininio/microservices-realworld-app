import {
  CreateUserDto,
  QueueEvents,
  Queues,
  UpdateUserDto,
  UserDto
} from '@microservices-realworld-example-app/models';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectQueue(Queues.Users) private usersQueue: Queue,
  ) {}

  async findAll(): Promise<UserDto[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserDto | null> {
    return await this.userModel.findById({'_id': id}).exec();
  }

  async findOne(query): Promise<UserDto | null> {
    return await this.userModel.findOne(query).exec();
  }

  async create(body: CreateUserDto): Promise<UserDto | null> {
    const user: User = await this.userModel.create(body);

    if (user) {
      // publish the created user in a message on the Users queue
      await this.usersQueue.add(QueueEvents.UserCreated, {
        username: user.username,
        bio: user.bio,
        image: user.image,
      });
    }

    return user;
  }

  async update(body: UpdateUserDto): Promise<UserDto | null> {
    const update = {
      ...body,
      updatedAt: new Date(),
    };
    const user: User = await this.userModel.findOneAndUpdate({'email': body.email}, update, {new: true, useFindAndModify: false});

    if (user) {
      // publish the updated user in a message on the Users queue
      await this.usersQueue.add(QueueEvents.UserUpdated, {
        username: user.username,
        bio: user.bio,
        image: user.image,
      });
    }

    return user;
  }
}
