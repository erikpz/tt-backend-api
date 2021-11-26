import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'dto/create-user.dto';
import { UserRepository } from 'repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }
  async getUserByUsername(username: string) {
    return this.userRepository.getByUsername(username);
  }
  async getUserById(id: string) {
    return this.userRepository.getById(id);
  }
}
