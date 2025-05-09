import { IsNotEmpty, IsString } from 'class-validator';

// Class này để định nghĩa DTO (Data Transfer Object) cho pan_gene_set
// DTO này sẽ được sử dụng để xác thực dữ liệu đầu vào khi tạo hoặc cập nhật pan_gene_set
export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    sub_title: string;

    @IsString()
    author: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    type: string;
}
