import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './app/category/category.controller';
import { CategoryService } from './app/category/category.service';
import { FollowerController } from './app/follower/follower.controller';
import { FollowerService } from './app/follower/follower.service';
import { FollowingController } from './app/following/following.controller';
import { FollowingService } from './app/following/following.service';
import { TweetController } from './app/tweet/tweet.controller';
import { TweetService } from './app/tweet/tweet.service';
import { UserController } from './app/user/user.controller';
import { UserModule } from './app/user/user.module';
import { UserService } from './app/user/user.service';
import { DatabaseModule } from './shared/database/database.module';


@Module({
  imports: [DatabaseModule,UserModule],
  controllers: [AppController, CategoryController,FollowerController,FollowingController,TweetController,UserController],
  providers: [AppService,CategoryService,FollowerService,FollowingService,TweetService,UserService],
})
export class AppModule {}
