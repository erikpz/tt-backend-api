import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from 'nest-mongodb';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongoModule.forRoot(process.env.MONGODB_URI, process.env.MONGODB_NAME),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
