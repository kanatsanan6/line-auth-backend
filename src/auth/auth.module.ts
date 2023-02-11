import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FirebaseModule } from 'lib/common/src';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';

@Module({
  imports: [
    FirebaseModule,
    HttpModule,
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
