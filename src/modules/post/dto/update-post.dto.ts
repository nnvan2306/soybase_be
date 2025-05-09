import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

// Class này để định nghĩa DTO (Data Transfer Object) cho post
// DTO này sẽ được sử dụng để xác thực dữ liệu đầu vào khi tạo hoặc cập nhật post
export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsMongoId()
    @IsNotEmpty()
    _id: string;
}
