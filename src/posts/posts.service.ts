import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Posts, PostsDocument } from './schema/posts.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private postsModel: Model<PostsDocument>,
  ) {}

  createPost(createPostDto: CreatePostDto) {
    const newPost = new this.postsModel({
      ...createPostDto,
      user: createPostDto.userId,
    });
    return newPost.save();
  }

  async getPostsByUser(userId: string) {
    return this.postsModel.find({ user: userId }).populate('user').exec();
  }

  async findAll() {
    return this.postsModel.find().exec();
  }

  async findOne(id: Types.ObjectId) {
    const findPost = await this.postsModel
      .findById(new Types.ObjectId(id))
      .exec();

    return findPost;
  }

  async update(id: Types.ObjectId, updatePostDto: UpdatePostDto) {
    await this.postsModel.findByIdAndUpdate(id, updatePostDto);

    const post = await this.postsModel.findById(new Types.ObjectId(id));

    return post;
  }

  async remove(id: Types.ObjectId) {
    return await this.postsModel.findByIdAndDelete(id);
  }
}
