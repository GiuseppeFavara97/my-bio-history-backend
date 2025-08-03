import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './Jwt.Strategy'; // 👈 aggiungi questo

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    PassportModule, // 👈 necessario per usare Passport
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET') || process.env.JWT_SECRET;
        if (!secret) {
          throw new Error('JWT_SECRET is not defined');
        }
        return {
          secret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy, // registra la strategia
    Reflector,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // 👈 il tuo guard personalizzato (funziona se lo hai scritto correttamente)
    },
  ],
  exports: [AuthService],
})
export class AuthModule { }
