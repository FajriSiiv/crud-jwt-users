import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt.guard';
import { TokenBlacklistService } from './token-blacklist.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}

  @Post('login')
  async login(@Body() user: { name: string }, @Res() res: Response) {
    const { access_token, user: userInfo } = await this.authService.login(
      user.name,
    );

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return res.status(HttpStatus.OK).json({
      message: 'Login successful',
      user: userInfo,
      access_token,
    });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies['access_token'];

    if (token) {
      this.tokenBlacklistService.addToBlacklist(token);
    }
    res.clearCookie('access_token');

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Successfully logged out' });
  }
}
