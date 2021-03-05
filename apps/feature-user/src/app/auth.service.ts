import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserDto } from '@microservices-realworld-example-app/models';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async login(body: LoginUserDto): Promise<User | null> {
    return await this.userModel.create(body);
  }

}
