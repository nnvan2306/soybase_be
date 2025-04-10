import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneFunctionDto } from './create-gene-function.dto';

export class UpdateGeneFunctionDto extends PartialType(CreateGeneFunctionDto) {}
