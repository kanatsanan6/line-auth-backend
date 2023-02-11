import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { FirebaseService } from 'lib/common/src';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly firebaseService: FirebaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string) {
    const decodedToken = await this.firebaseService
      .getAuth()
      .verifyIdToken(token);

    if (!decodedToken) {
      throw new UnauthorizedException();
    }

    return {
      user_id: decodedToken.user_id,
      expires_in: decodedToken.exp,
    };
  }
}
