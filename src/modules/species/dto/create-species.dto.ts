import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// Class này để định nghĩa DTO (Data Transfer Object) cho species
export class CreateSpeciesDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    gene_id: string[];
}
