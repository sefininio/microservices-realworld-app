import { JwtAuthGuard } from '@microservices-realworld-example-app/auth';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
} from '@microservices-realworld-example-app/models';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Returns the currently logged in user
   *
   * @param req the request
   * @returns user UserDto
   */
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getMe(@Req() req): Promise<UserDto> {
    return req.user;
  }

  /**
   * Returns all users
   *
   * @returns UserDto[]
   */
  @Get('/users')
  getUsers(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get('/users/:usernames')
  getUsersByIds(@Param('usernames') usernames: string): Promise<UserDto[]> {
    return this.userService.findAll(usernames);
  }

  /**
   * Returns user by id
   *
   * @param id id route param
   * @returns UserDto | null
   */
  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<UserDto | null> {
    return this.userService.findById(id);
  }

  /**
   * Returns user by username
   *
   * @param username username route param
   * @returns UserDto | null
   */
  @Get('/username/:username')
  getUserByUsername(@Param('username') username: string): Promise<UserDto | null> {
    return this.userService.findOne({ username });
  }

  /**
   * Returns user by email
   *
   * @param email email route param
   * @returns UserDto | null
   */
  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string): Promise<UserDto | null> {
    return this.userService.findOne({ email });
  }

  /**
   * Creates a new user
   *
   * @param body CreateUserDto
   * @returns UserDto | null
   */
  @Post('/')
  createUser(@Body() body: CreateUserDto): Promise<UserDto | null> {
    return this.userService.create(body);
  }

  /**
   * Updates a user
   *
   * @param body UpdateUserDto
   * @returns UserDto | null
   */
  @UseGuards(JwtAuthGuard)
  @Put('/')
  updateUser(@Body() body: UpdateUserDto): Promise<UserDto | null> {
    return this.userService.update(body);
  }
}
