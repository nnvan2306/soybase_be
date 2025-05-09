import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePanGeneSetDto } from './create-pan_gene_set.dto';

// Class này để định nghĩa DTO (Data Transfer Object) cho pan_gene_set
// DTO này sẽ được sử dụng để xác thực dữ liệu đầu vào khi tạo hoặc cập nhật pan_gene_set
export class UpdatePanGeneSetDto extends PartialType(CreatePanGeneSetDto) {
    @IsNotEmpty()
    @IsString()
    _id: string;
}
