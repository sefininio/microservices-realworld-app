import { UserDto } from '@microservices-realworld-example-app/models';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';


@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *
   * Note - we are storing the password in plain text in the DB for simplicity.
   * !!!!! DO NOT DO THIS FOR PRODUCTION !!!!!
   *
   * @param loginDto The login details, {email, password}
   */
   async validateUser(username: string, password: string): Promise<any> {
    const user: UserDto = await this.userService.findOne({email: username});

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
