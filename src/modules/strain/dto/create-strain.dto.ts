import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStrainDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
