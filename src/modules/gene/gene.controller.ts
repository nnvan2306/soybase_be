import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { GeneService } from './gene.service';
import { CreateGeneDto } from './dto/create-gene.dto';
import { UpdateGeneDto } from './dto/update-gene.dto';
import { Response } from 'express';

@Controller('gene')
export class GeneController {
    constructor(private readonly geneService: GeneService) {}

    @Post()
    create(@Body() createGeneDto: CreateGeneDto, @Res() res: Response) {
        return this.geneService.create(createGeneDto, res);
    }

    @Get('/list')
    getList(@Query('names') names: string[], @Res() res: Response) {
        return this.geneService.findList(names, res);
    }
    @Get()
    findAll(@Res() res: Response) {
        return this.geneService.findAll(res);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Res() res: Response) {
        return this.geneService.findOne(id, res);
    }

    @Patch(':id')
    update(@Body() updateGeneDto: UpdateGeneDto, @Res() res: Response) {
        return this.geneService.update(updateGeneDto, res);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        return this.geneService.remove(id, res);
    }
}
