import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'dto/create-user.dto';
import { UserRepository } from 'repositories/user.repository';
import { ProgressService } from 'src/progress/progress.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private progressService: ProgressService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userCreated = await this.userRepository.create(createUserDto);
    if (!userCreated) return new InternalServerErrorException();
    await this.progressService.createProgressByUserId(
      userCreated._id.toString(),
    );
    return userCreated;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.getByUsername(username);
    if (!user) throw new NotFoundException();
    return user;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundException();
  }

  async getAllUsers() {
    const users = await await this.userRepository.getAll();
    if (!users) throw new NotFoundException();
    return users;
  }
}
