import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
} from '@microservices-realworld-example-app/models';

import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  getUsers(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<UserDto | null> {
    return this.userService.findById(id);
  }

  @Get('/username/:username')
  getUserByUsername(@Param('username') username: string): Promise<UserDto | null> {
    return this.userService.findOne({username});
  }

  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string): Promise<UserDto | null> {
    return this.userService.findOne({email});
  }

  @Post('/')
  createUser(@Body() body: CreateUserDto): Promise<UserDto | null> {
    return this.userService.create(body);
  }

  @Put('/')
  updateUser(@Body() body: UpdateUserDto): Promise<UserDto | null> {
    return this.userService.update(body);
  }

}
