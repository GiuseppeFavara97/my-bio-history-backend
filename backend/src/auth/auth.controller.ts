
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { Public } from './auth.decorator';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }


  @Post('upload-profile-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // cartella locale
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `profile-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadProfileImage(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const userId = req.user.sub;
    const imageUrl = `/uploads/${file.filename}`;

    await this.userService.updateProfileImage(userId, imageUrl); // salva in DB

    return { imageUrl };
  }


  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('Profile')
  async getProfile(@Request() req) {
    const userId = req.user?.sub || req.user?.userId;
    const user = await this.userService.findUserById(userId); // 👈 recupera dal DB

    if (!user) {
      throw new NotFoundException('Utente non trovato');
    }

    // Opzionale: rimuovi la password prima di rispondere
    const { password, ...userSafe } = user;
    return userSafe;
  }
}
