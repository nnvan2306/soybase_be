import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneDto } from './create-gene.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateGeneDto extends PartialType(CreateGeneDto) {
    @IsNotEmpty()
    @IsString()
    _id: string;
}
