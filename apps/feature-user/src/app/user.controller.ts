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
import { ApiHeader, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
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
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiOkResponse({
    description: 'Current logged in user.',
    type: UserDto,
  })
  getMe(@Req() req): Promise<UserDto> {
    return req.user;
  }

  /**
   * Returns all users
   *
   * @returns UserDto[]
   */
  @Get('/users')
  @ApiOkResponse({
    description: 'All users.',
    type: [UserDto],
  })
  getUsers(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get('/users/:usernames')
  @ApiOkResponse({
    description: 'Get users by comma delimited list of usernames.',
    type: [UserDto],
  })
  getUsersByUsernames(@Param('usernames') usernames: string): Promise<UserDto[]> {
    return this.userService.findAll(usernames);
  }

  @Get('/users/ids/:ids')
  @ApiOkResponse({
    description: 'Get users by comma delimited list of ids.',
    type: [UserDto],
  })
  getUsersByIds(@Param('ids') ids: string) {
    return this.userService.findByIds(ids);
  }

  /**
   * Returns user by id
   *
   * @param id id route param
   * @returns UserDto | null
   */
  @Get('/:id')
  @ApiOkResponse({
    description: 'Get user by id.',
    type: UserDto,
  })
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
  @ApiOkResponse({
    description: 'Get user by username.',
    type: UserDto,
  })
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
  @ApiOkResponse({
    description: 'Get user by email.',
    type: UserDto,
  })
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
  @ApiOkResponse({
    description: 'Create user.',
    type: UserDto,
  })
  createUser(@Body() body: CreateUserDto): Promise<UserDto | null> {
    return this.userService.upsert(body);
  }

  /**
   * Updates a user
   *
   * @param body UpdateUserDto
   * @returns UserDto | null
   */
  @UseGuards(JwtAuthGuard)
  @Put('/')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized'
  })
  @ApiOkResponse({
    description: 'Updaterrent logged in user.',
    type: UserDto,
  })
  updateUser(@Body() body: UpdateUserDto): Promise<UserDto | null> {
    return this.userService.upsert(body);
  }
}
