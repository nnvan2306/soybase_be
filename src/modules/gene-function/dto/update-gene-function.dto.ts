import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneFunctionDto } from './create-gene-function.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateGeneFunctionDto extends PartialType(CreateGeneFunctionDto) {
    @IsNotEmpty()
    @IsString()
    _id: string;
}
