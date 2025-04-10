import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGeneFamilyDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    path_detail: string[];
}
