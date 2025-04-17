import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { StrainService } from './strain.service';
import { CreateStrainDto } from './dto/create-strain.dto';
import { UpdateStrainDto } from './dto/update-strain.dto';
import { Response } from 'express';

@Controller('strain')
export class StrainController {
    constructor(private readonly strainService: StrainService) {}

    @Post()
    create(@Body() createStrainDto: CreateStrainDto, @Res() res: Response) {
        return this.strainService.create(createStrainDto, res);
    }

    @Get()
    findAll(@Res() res: Response) {
        return this.strainService.findAll(res);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Res() res: Response) {
        return this.strainService.findOne(id, res);
    }

    @Patch()
    update(@Body() updateStrainDto: UpdateStrainDto, @Res() res: Response) {
        return this.strainService.update(updateStrainDto, res);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        return this.strainService.remove(id, res);
    }
}
