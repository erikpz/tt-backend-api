import { Module } from '@nestjs/common';
import { ProgressRepository } from 'src/repositories/progress.repository';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';

@Module({
  controllers: [ProgressController],
  providers: [ProgressService, ProgressRepository],
  exports:[ProgressService]
})
export class ProgressModule {}
