import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// Class này để định nghĩa DTO (Data Transfer Object) cho gene_family
// DTO này sẽ được sử dụng để xác thực dữ liệu đầu vào khi tạo hoặc cập nhật gene_family
export class CreateGeneFamilyDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    path_detail: string[];
}
