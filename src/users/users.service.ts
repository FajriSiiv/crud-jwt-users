import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Post } from 'src/schemas/posts.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: Types.ObjectId) {
    const userById = await this.userModel.findById(id);

    if (!userById) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const posts = await this.postModel
      .find({ user: new Types.ObjectId(id) })
      .exec();

    console.log('Searching for posts with user ID:', id, typeof id);

    return { user: { userById, posts } };
  }

  async update(
    id: Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; user: User | null }> {
    const objID = new Types.ObjectId(id);
    await this.userModel.findOneAndUpdate(objID, updateUserDto).exec();

    const user = await this.userModel.findById(objID).exec();

    return { message: 'Update user berhasil', user };
  }

  async remove(
    id: Types.ObjectId,
  ): Promise<{ message: string; deletedUser: User | null }> {
    const deletedUser = await this.userModel.findById(id);

    await this.userModel.findByIdAndDelete(id);

    return { message: 'Deleted user berhasil', deletedUser };
  }
}
