import { Injectable } from '@nestjs/common';
import { CreateGeneFunctionDto } from './dto/create-gene-function.dto';
import { UpdateGeneFunctionDto } from './dto/update-gene-function.dto';

@Injectable()
export class GeneFunctionService {
  create(createGeneFunctionDto: CreateGeneFunctionDto) {
    return 'This action adds a new geneFunction';
  }

  findAll() {
    return `This action returns all geneFunction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} geneFunction`;
  }

  update(id: number, updateGeneFunctionDto: UpdateGeneFunctionDto) {
    return `This action updates a #${id} geneFunction`;
  }

  remove(id: number) {
    return `This action removes a #${id} geneFunction`;
  }
}
