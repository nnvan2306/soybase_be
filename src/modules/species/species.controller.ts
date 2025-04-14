import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { Response } from 'express';

@Controller('species')
export class SpeciesController {
    constructor(private readonly speciesService: SpeciesService) {}

    @Post()
    create(@Body() createSpeciesDto: CreateSpeciesDto, @Res() res: Response) {
        return this.speciesService.create(createSpeciesDto, res);
    }

    @Get()
    findAll(@Res() res: Response) {
        return this.speciesService.findAll(res);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Res() res: Response) {
        return this.speciesService.findOne(id, res);
    }

    @Patch()
    update(@Body() updateSpeciesDto: UpdateSpeciesDto, @Res() res: Response) {
        return this.speciesService.update(updateSpeciesDto, res);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        return this.speciesService.remove(id, res);
    }
}
