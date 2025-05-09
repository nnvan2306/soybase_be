import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateSpeciesDto } from './create-species.dto';

// Class này để định nghĩa DTO (Data Transfer Object) cho species
export class UpdateSpeciesDto extends PartialType(CreateSpeciesDto) {
    @IsNotEmpty()
    @IsString()
    _id: string;
}
