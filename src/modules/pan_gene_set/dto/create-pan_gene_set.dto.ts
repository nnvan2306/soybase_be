import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePanGeneSetDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    url_detail: string[];
}
