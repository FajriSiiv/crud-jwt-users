import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchema } from './schema/posts.schema';
import { User, UserSchema } from 'src/users/schema/users.schema';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    MongooseModule.forFeature([
      { name: Posts.name, schema: PostsSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class PostsModule {}
