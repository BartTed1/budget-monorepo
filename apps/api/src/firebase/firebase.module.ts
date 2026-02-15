import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        const filePath = process.env.FIREBASE_FILE_PATH;

        if (!filePath) {
          throw new Error('FIREBASE_FILE_PATH is not defined in .env');
        }

        if (admin.apps.length === 0) {
          const serviceAccount = JSON.parse(readFileSync(filePath, 'utf-8'));

          return admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });
        }

        return admin.app();
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
