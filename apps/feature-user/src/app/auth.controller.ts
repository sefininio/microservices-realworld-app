import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LoginUserDto } from '@microservices-realworld-example-app/models';

import { AuthService } from './auth.service';

@Controller('/users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: LoginUserDto) {
    return 'logged in';
  }

}
