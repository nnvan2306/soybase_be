import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateGeneFamilyDto } from './create-gene_family.dto';

// Class này để định nghĩa DTO (Data Transfer Object) cho gene_family
// DTO này sẽ được sử dụng để xác thực dữ liệu đầu vào khi tạo hoặc cập nhật gene_family
export class UpdateGeneFamilyDto extends PartialType(CreateGeneFamilyDto) {
    @IsNotEmpty()
    @IsMongoId()
    _id: string;
}
