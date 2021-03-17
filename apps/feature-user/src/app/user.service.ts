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
import { trim } from 'lodash';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectQueue(Queues.Users) private usersQueue: Queue,
  ) {}

  async findAll(usernames?: string): Promise<UserDto[]> {
    if (usernames) {
      const usernameArray = usernames.split(',').map(item => trim(item));
      return await this.userModel.find({username: { $in: usernameArray}}).exec();
    } else {
      return await this.userModel.find().exec();
    }
  }

  async findByIds(ids: string) {
    const idArray = ids.split(',').map(item => trim(item));
    const users =  await this.userModel.find({_id: { $in: idArray}}).lean().exec();
    const map = idArray.reduce((acc, id) => {
      acc[id] = users.find(user => user._id.equals(id));
      return acc;
    }, {});
    return map;
  }

  async findById(id: string): Promise<UserDto | null> {
    return await this.userModel.findById({'_id': id}).exec();
  }

  async findOne(query): Promise<UserDto | null> {
    return await this.userModel.findOne(query).exec();
  }

  async upsert(body: UpdateUserDto | CreateUserDto): Promise<UserDto | null> {
    const update = {
      ...body,
      updatedAt: new Date(),
    };

    const user: User = await this.userModel.findOneAndUpdate(
      {'email': body.email},
      update,
      { new: true, useFindAndModify: false, upsert: true }
    );

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
