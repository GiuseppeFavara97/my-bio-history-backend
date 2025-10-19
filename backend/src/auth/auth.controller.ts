
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
  Res,
  Put,
} from '@nestjs/common';
import { Public } from './auth.decorator';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';


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
    const userId = req.user.userId;
    const imageUrl = `/uploads/${file.filename}`;

    await this.userService.updateProfileImage(userId, imageUrl); // salva in DB

    return { imageUrl };
  }


  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {

    const { access_token, user } = await this.authService.signIn(body.email, body.password);
    res.cookie('auth_token', access_token, {
      httpOnly: true,
      secure: false, //true solo in produzione
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return { user };

  }

  @UseGuards(AuthGuard)
  @Get('Profile')
  async getProfile(@Request() req) {
    const userId = req.user?.sub;
    const user = await this.userService.findUserById(userId); // recupera dal DB

    if (!user) {
      throw new NotFoundException('Utente non trovato');
    }

    // Opzionale: rimuovi la password prima di rispondere
    const { password, ...userSafe } = user;
    return userSafe;
  }
  
  @UseGuards(AuthGuard)
  @Get('userID')
  userID(@Req() req) {
    return { id: req.user.sub, email: req.user.email, role: req.user.role }
  }
  @Put('update-profile')
  async updateProfile(@Req() req, @Body() body: any) {
    const userId = req.user?.sub;
    const updatedUser = await this.userService.updateUser(userId, body);
    if (!updatedUser) {
      throw new NotFoundException('Utente non trovato');
    }

}
}
