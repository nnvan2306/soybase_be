import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { GeneFunctionService } from './gene-function.service';
import { CreateGeneFunctionDto } from './dto/create-gene-function.dto';
import { UpdateGeneFunctionDto } from './dto/update-gene-function.dto';
import { Response } from 'express';

@Controller('gene-function')
export class GeneFunctionController {
    constructor(private readonly geneFunctionService: GeneFunctionService) {}

    @Post()
    create(@Body() createGeneData: CreateGeneFunctionDto, @Res() res: Response) {
        return this.geneFunctionService.create(createGeneData, res);
    }

    @Get()
    findAll(@Res() res: Response) {
        return this.geneFunctionService.findAll(res);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Res() res: Response) {
        return this.geneFunctionService.findOne(id, res);
    }

    @Patch(':id')
    update(@Body() updateGeneFunctionDto: UpdateGeneFunctionDto, @Res() res: Response) {
        return this.geneFunctionService.update(updateGeneFunctionDto, res);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        return this.geneFunctionService.remove(id, res);
    }
}
