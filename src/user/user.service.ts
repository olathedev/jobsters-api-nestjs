import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<userDocument>
  ) { }
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.UserModel.findOne({ email })
  }
}
