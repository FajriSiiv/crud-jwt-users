import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);

    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();

    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(new Types.ObjectId(id)).exec();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      updateUserDto,
    );

    const userUpdate = await this.userModel.findById(new Types.ObjectId(id));

    return userUpdate;
  }

  async remove(id: string) {
    const user = await this.userModel
      .findByIdAndDelete(new Types.ObjectId(id))
      .exec();

    return { message: 'User telah dihapus', user };
  }
}
