import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt.guard';
import { TokenBlacklistService } from './token-blacklist.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, description: 'Login successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async login(@Body() createAuthDto: CreateAuthDto, @Res() res: Response) {
    const { access_token, userRespond: userInfo } =
      await this.authService.login(createAuthDto);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async userMe(@Req() req: Request) {
    return await this.authService.userMe(req);
  }
}
