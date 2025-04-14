import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGeneFunctionDto {
    @IsString()
    @IsNotEmpty()
    identifier: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    strain: string;

    @IsString()
    pan_gene_set_id: string;

    @IsString()
    @IsNotEmpty()
    gene_id: string;
}
