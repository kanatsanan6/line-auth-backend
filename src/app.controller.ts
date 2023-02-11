import {
  Controller,
  Get,
  Req,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from './auth/firebase-auth.guard';

@Controller()
export class AppController {
  @UseGuards(FirebaseAuthGuard)
  @Get()
  getHello(@Request() req, @Response() res): string {
    const user = req.user;

    return res.set({ expiry: user.expires_in }).json({ success: true });
  }
}
