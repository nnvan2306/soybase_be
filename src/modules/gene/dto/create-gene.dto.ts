import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
    @IsNotEmpty()
    gene_family_id: string;
}
