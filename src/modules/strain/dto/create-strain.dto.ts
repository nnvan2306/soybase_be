import { IsNotEmpty, IsString } from 'class-validator';

// Class này để định nghĩa DTO (Data Transfer Object) cho strain
export class CreateStrainDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
