import { Injectable, Logger } from '@nestjs/common';
import * as serviceAccount from '../firebase.config.json';
import * as admin from 'firebase-admin';

const firebaseConfig = {
  type: serviceAccount.type,
  project_id: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientX509CertUrl: serviceAccount.client_x509_cert_url,
};

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);
  private firebaseApp: any;

  constructor() {
    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
    this.logger.log('Firebase initialized successfully');
  }

  getAuth() {
    return this.firebaseApp.auth();
  }

  getStorage() {
    return this.firebaseApp.storage();
  }
}
