import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('subscribe')
  subscribe(@Body() body: { userId: string }) {
    return this.authService.subscribe(body.userId);
  }

  @Post('buy-ats-service')
  buyAtsService(@Body() body: { userId: string }) {
    return this.authService.buyAtsService(body.userId);
  }
}
