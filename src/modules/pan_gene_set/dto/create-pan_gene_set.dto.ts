import { IsNotEmpty, IsString } from 'class-validator';

// Class này để định nghĩa DTO (Data Transfer Object) cho pan_gene_set
export class CreatePanGeneSetDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    path_detail: string;
}
