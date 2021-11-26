import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'dto/create-user.dto';
import { User } from 'interfaces/user.interface';

@Controller('user')
export class UserController {

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): User{
        return createUserDto as User
    }
}
