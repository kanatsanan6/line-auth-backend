import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FirebaseModule } from 'lib/common/src';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [FirebaseModule, HttpModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
