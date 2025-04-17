import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { PanGeneSetService } from './pan_gene_set.service';
import { CreatePanGeneSetDto } from './dto/create-pan_gene_set.dto';
import { UpdatePanGeneSetDto } from './dto/update-pan_gene_set.dto';
import { Response } from 'express';

@Controller('pan-gene-set')
export class PanGeneSetController {
    constructor(private readonly panGeneSetService: PanGeneSetService) {}

    @Post()
    create(@Body() createPanGeneSetDto: CreatePanGeneSetDto, @Res() res: Response) {
        return this.panGeneSetService.create(createPanGeneSetDto, res);
    }

    @Get('limit')
    findLimit(@Res() res: Response, @Query('page') page: string, @Query('pageSize') pageSize: string) {
        return this.panGeneSetService.findLimit(res, page, pageSize);
    }

    @Get('all')
    findAll(@Res() res: Response) {
        return this.panGeneSetService.findAll(res);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Res() res: Response) {
        return this.panGeneSetService.findOne(id, res);
    }

    @Patch(':id')
    update(@Res() res: Response, @Body() updatePanGeneSetDto: UpdatePanGeneSetDto) {
        return this.panGeneSetService.update(res, updatePanGeneSetDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        return this.panGeneSetService.remove(id, res);
    }
}
