import { PartialType } from '@nestjs/mapped-types';
import { CreateStudyDto } from './create-study.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStudyDto extends PartialType(CreateStudyDto) {
    @IsNotEmpty()
    @IsString()
    _id: string;
}
