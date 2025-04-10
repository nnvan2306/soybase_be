import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneFamilyDto } from './create-gene_family.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateGeneFamilyDto extends PartialType(CreateGeneFamilyDto) {
    @IsNotEmpty()
    @IsMongoId()
    _id: string;
}
