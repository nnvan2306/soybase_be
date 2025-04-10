import { PartialType } from '@nestjs/mapped-types';
import { CreatePanGeneSetDto } from './create-pan_gene_set.dto';

export class UpdatePanGeneSetDto extends PartialType(CreatePanGeneSetDto) {}
