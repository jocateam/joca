import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  login(@Request() req: { user: User }) {
    return req.user;
  }

  @Post('/auth/register')
  register(@Body() registerDto: RegisterDto) {
    return this._authService.register(registerDto);
  }

  @Post('/refresh')
  refresh(@Req() req: Request, @Body() refreshToken: string) {
    return this._authService.refresh(refreshToken, '');
  }
}
