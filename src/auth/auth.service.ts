import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from 'lib/common/src';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly httpService: HttpService,
  ) {}

  private async validateUserWithLine(idToken: string) {
    const responseData = this.httpService.get(
      'https://api.line.me/v2/profile',
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      },
    );
    const response = await lastValueFrom(responseData);

    return response.data;
  }

  async login(idToken: string) {
    const decodedToken = await this.validateUserWithLine(idToken);

    this.logger.log(decodedToken);
    const userExists = await this.firebaseService
      .getAuth()
      .getUser(decodedToken.userId)
      .then(() => true)
      .catch(() => false);

    if (!userExists) {
      await this.firebaseService
        .getAuth()
        .createUser({
          uid: decodedToken.userId,
          displayName: decodedToken.displayName,
          photoURL: decodedToken.pictureUrl,
        })
        .then((userRecord) => {
          this.logger.log('Created new user successfully', userRecord.uid);
        })
        .catch((err) => {
          this.logger.log('Error craeted a new user:', err);
        });
    }
    const token = await this.firebaseService
      .getAuth()
      .createCustomToken(decodedToken.userId);

    return { token: token };
  }
}
