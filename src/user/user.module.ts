import { Module } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { ProgressModule } from 'src/progress/progress.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[ProgressModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
