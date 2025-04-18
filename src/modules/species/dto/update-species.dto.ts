import { PartialType } from '@nestjs/mapped-types';
import { CreateSpeciesDto } from './create-species.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSpeciesDto extends PartialType(CreateSpeciesDto) {
    @IsNotEmpty()
    @IsString()
    _id: string;
}
