import { PartialType } from '@nestjs/swagger';
import { CreateStrainDto } from './create-strain.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStrainDto extends PartialType(CreateStrainDto) {
    @IsNotEmpty()
    @IsString()
    _id: string;
}
