import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PanGeneSetService } from './pan_gene_set.service';
import { CreatePanGeneSetDto } from './dto/create-pan_gene_set.dto';
import { UpdatePanGeneSetDto } from './dto/update-pan_gene_set.dto';

@Controller('pan-gene-set')
export class PanGeneSetController {
  constructor(private readonly panGeneSetService: PanGeneSetService) {}

  @Post()
  create(@Body() createPanGeneSetDto: CreatePanGeneSetDto) {
    return this.panGeneSetService.create(createPanGeneSetDto);
  }

  @Get()
  findAll() {
    return this.panGeneSetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.panGeneSetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePanGeneSetDto: UpdatePanGeneSetDto) {
    return this.panGeneSetService.update(+id, updatePanGeneSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.panGeneSetService.remove(+id);
  }
}
