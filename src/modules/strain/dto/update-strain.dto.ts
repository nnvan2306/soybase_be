import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateStrainDto } from './create-strain.dto';

// Class này để định nghĩa DTO (Data Transfer Object) cho strain
export class UpdateStrainDto extends PartialType(CreateStrainDto) {
    @IsNotEmpty()
    @IsString()
    _id: string;
}
