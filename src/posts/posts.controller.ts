import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Types } from 'mongoose';
import { RolesGuard } from './guards/roles.guard';
import { UserPost } from './guards/userUpdate.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(RolesGuard)
  create(@Body() body: CreatePostDto) {
    return this.postsService.createPost(body);
  }

  @Get('/user/:userId')
  async getPostsByUser(@Param('userId') userId: string) {
    return this.postsService.getPostsByUser(userId);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @UseGuards(UserPost)
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(new Types.ObjectId(id), updatePostDto);
  }

  @Delete(':id')
  @UseGuards(UserPost)
  async remove(
    @Param('id') id: string,
    // @Body() deletePost: { userId: string },
  ) {
    return this.postsService.remove(new Types.ObjectId(id));
  }
}
