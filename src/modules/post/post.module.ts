import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas/post.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Post.name,
                useFactory: () => {
                    const schema = PostSchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}
