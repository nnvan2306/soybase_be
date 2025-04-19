import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class Identifier {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    path_detail: string;
}

class LocationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    path_detail: string;
}

export class CreateGeneDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    arabidopsis_hit: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    go_terms: string[];

    @IsString()
    gene_family: string;

    @Type(() => Identifier)
    identifier: Identifier;

    @Type(() => LocationDto)
    location: LocationDto;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    pan_gene_set: string;

    @IsString()
    @IsNotEmpty()
    species: string;

    @IsString()
    @IsNotEmpty()
    strain: string;
}
