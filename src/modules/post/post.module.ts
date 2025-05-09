import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas/post.schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';

// Module này định nghĩa các thành phần của module post
// Nó bao gồm các controller, service và schema cần thiết để xử lý các yêu cầu liên quan đến post
@Module({
    imports: [
        MongooseModule.forFeatureAsync([ // Kết nối đến MongoDB và định nghĩa schema cho post
            {
                name: Post.name,
                useFactory: () => {
                    const schema = PostSchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [PostController], // Đăng ký controller để xử lý các yêu cầu HTTP
    providers: [PostService], // Đăng ký service để xử lý các logic nghiệp vụ
})
export class PostModule { }
