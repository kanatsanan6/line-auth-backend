import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  login(@Query('id_token') idToken: string) {
    return this.authService.login(idToken);
  }
}
