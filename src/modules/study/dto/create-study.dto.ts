import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudyDto {
    @IsNotEmpty()
    @IsString()
    study_name: string;

    @IsNotEmpty()
    @IsString()
    link_detail_study: string;

    @IsNotEmpty()
    @IsString()
    study_type: string;

    @IsNotEmpty()
    @IsString()
    publication_id: string;

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    synopsis: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    genotypes: string;

    @IsNotEmpty()
    @IsString()
    traits: string;

    @IsNotEmpty()
    @IsString()
    species: string;
}
