import { TokenDto } from '@microservices-realworld-example-app/models';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  /**
   *
   * @param req the request
   *
   * @returns Promise<TokenDto>
   */
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<TokenDto> {
    return this.authService.login(req.user);
  }

}
