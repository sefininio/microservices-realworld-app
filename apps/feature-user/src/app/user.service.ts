import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
} from '@microservices-realworld-example-app/models';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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
    return await this.userModel.create(body);
  }

  async update(body: UpdateUserDto): Promise<UserDto | null> {
    const update = {
      ...body,
      updatedAt: new Date(),
    };
    return await this.userModel.findOneAndUpdate({'email': body.email}, update, {new: true, useFindAndModify: false});
  }

}
