import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSpeciesDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    gene_id: string[];

    @IsString()
    @IsNotEmpty()
    gene_family: string;
}
