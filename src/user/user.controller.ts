import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
  @Get('username/:username')
  getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): any {
    return this.userService.createUser(createUserDto);
  }
}
