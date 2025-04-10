import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneFunctionService } from './gene-function.service';
import { CreateGeneFunctionDto } from './dto/create-gene-function.dto';
import { UpdateGeneFunctionDto } from './dto/update-gene-function.dto';

@Controller('gene-function')
export class GeneFunctionController {
  constructor(private readonly geneFunctionService: GeneFunctionService) {}

  @Post()
  create(@Body() createGeneFunctionDto: CreateGeneFunctionDto) {
    return this.geneFunctionService.create(createGeneFunctionDto);
  }

  @Get()
  findAll() {
    return this.geneFunctionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geneFunctionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeneFunctionDto: UpdateGeneFunctionDto) {
    return this.geneFunctionService.update(+id, updateGeneFunctionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geneFunctionService.remove(+id);
  }
}
