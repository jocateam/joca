import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { User } from '../user/user.entity';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { HttpException } from '../../shared/exceptions/http.exception';
import { NO_TOKEN_PROVIDED } from '../../shared/constants/errors';

@Controller()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  login(@Req() req: { user: User }) {
    return req.user;
  }

  @Post('/auth/register')
  register(@Body() registerDto: RegisterDto) {
    return this._authService.register(registerDto);
  }

  @ApiBearerAuth()
  @Post('/refresh')
  refresh(@Req() req: Request, @Body('refreshToken') refreshToken: string) {
    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!jwt) {
      throw new HttpException(NO_TOKEN_PROVIDED, [], HttpStatus.BAD_REQUEST);
    }
    return this._authService.refresh(refreshToken, jwt);
  }
}
