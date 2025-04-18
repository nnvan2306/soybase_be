import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePanGeneSetDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    path_detail: string;
}
