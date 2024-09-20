import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>
  ) { }
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.UserModel.findOne({ email })
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.UserModel.create(createUserDto)
    return user;
  }
}
