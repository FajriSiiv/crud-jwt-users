import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from 'src/schemas/posts.schema';
import { User } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(postDto: {
    title: string;
    content: string;
    userId: Types.ObjectId;
  }): Promise<Post> {
    const user = await this.userModel.findOne(postDto.userId);

    const post = new this.postModel({
      title: postDto.title,
      content: postDto.content,
      user: user._id,
    });
    return post.save();
  }

  async findAllPosts(page: number = 1, limit: number = 4) {
    const skip = (page - 1) * limit;

    const posts = await this.postModel.find().skip(skip).limit(limit).exec();

    const totalPosts = await this.postModel.countDocuments();

    return {
      totalPosts,
      currentPage: page,
      totalPage: Math.ceil(totalPosts / limit),
      posts,
    };
  }

  async findByUser(userId: string): Promise<Post[]> {
    return this.postModel.find({ user: userId }).exec();
  }
}
