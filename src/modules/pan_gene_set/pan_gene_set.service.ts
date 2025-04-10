import { Injectable } from '@nestjs/common';
import { CreatePanGeneSetDto } from './dto/create-pan_gene_set.dto';
import { UpdatePanGeneSetDto } from './dto/update-pan_gene_set.dto';

@Injectable()
export class PanGeneSetService {
  create(createPanGeneSetDto: CreatePanGeneSetDto) {
    return 'This action adds a new panGeneSet';
  }

  findAll() {
    return `This action returns all panGeneSet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} panGeneSet`;
  }

  update(id: number, updatePanGeneSetDto: UpdatePanGeneSetDto) {
    return `This action updates a #${id} panGeneSet`;
  }

  remove(id: number) {
    return `This action removes a #${id} panGeneSet`;
  }
}
