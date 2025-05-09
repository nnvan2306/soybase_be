import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateGeneDto } from './create-gene.dto';

// Class này để định nghĩa DTO (Data Transfer Object) cho gene
export class UpdateGeneDto extends PartialType(CreateGeneDto) {
    @IsNotEmpty()
    @IsString()
    _id: string;
}
