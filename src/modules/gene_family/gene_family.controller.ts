import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { GeneFamilyService } from './gene_family.service';
import { CreateGeneFamilyDto } from './dto/create-gene_family.dto';
import { UpdateGeneFamilyDto } from './dto/update-gene_family.dto';
import { Response } from 'express';

@Controller('gene-family')
export class GeneFamilyController {
    constructor(private readonly geneFamilyService: GeneFamilyService) {}

    @Post()
    create(@Body() createGeneFamilyDto: CreateGeneFamilyDto, @Res() res: Response) {
        return this.geneFamilyService.create(createGeneFamilyDto, res);
    }

    @Get('limit')
    findLimit(@Res() res: Response, @Query('page') page: string, @Query('pageSize') pageSize: string) {
        return this.geneFamilyService.findLimit(res, page, pageSize);
    }
    @Get()
    findAll(@Res() res: Response) {
        return this.geneFamilyService.findAll(res);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Res() res: Response) {
        return this.geneFamilyService.findOne(id, res);
    }

    @Patch('')
    update(@Body() updateGeneFamilyDto: UpdateGeneFamilyDto, @Res() res: Response) {
        return this.geneFamilyService.update(updateGeneFamilyDto, res);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        return this.geneFamilyService.remove(id, res);
    }
}
