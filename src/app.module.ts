import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from 'nest-mongodb';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProgressModule } from './progress/progress.module';
import { ScoreModule } from './score/score.module';
import { AppRepository } from './repositories/app.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoModule.forRoot(process.env.MONGODB_URI, process.env.MONGODB_NAME),
    UserModule,
    ProgressModule,
    ScoreModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository],
})
export class AppModule {}
