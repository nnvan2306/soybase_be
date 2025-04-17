import { PartialType } from '@nestjs/mapped-types';
import { CreatePanGeneSetDto } from './create-pan_gene_set.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePanGeneSetDto extends PartialType(CreatePanGeneSetDto) {
    @IsNotEmpty()
    @IsString()
    _id: string;
}
