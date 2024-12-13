import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Types } from 'mongoose';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(
    @Body()
    createPostDto: {
      title: string;
      content: string;
      userId: Types.ObjectId;
    },
  ) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 4,
  ) {
    return this.postsService.findAllPosts(Number(page), Number(limit));
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: string) {
    return this.postsService.findByUser(userId);
  }
}
