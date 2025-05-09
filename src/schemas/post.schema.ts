import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// kiểu dữ liệu cho Post

export type PostDocument = HydratedDocument<Post>;

// Định nghĩa schema cho Post
// @Schema({ collection: 'post' }) // Đặt tên collection trong MongoDB là 'post'
@Schema({
    timestamps: true,
})
export class Post {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    sub_title: string;

    @Prop()
    author: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    type: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
