import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { StudyService } from './study.service';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { Response } from 'express';

@Controller('study')
export class StudyController {
    constructor(private readonly studyService: StudyService) {}

    @Post()
    create(@Body() createStudyDto: CreateStudyDto, @Res() res: Response) {
        return this.studyService.create(createStudyDto, res);
    }

    @Get()
    findAll(
        @Res() res: Response,
        @Query('page') page: string,
        @Query('pageSize') pageSize: string,
        @Query('study_type') study_type: string,
        @Query('publication_id') publication_id: string,
        @Query('author') author: string,
        @Query('traits') traits: string,
        @Query('species') species: string,
    ) {
        return this.studyService.findAll(res, page, pageSize, study_type, publication_id, author, traits, species);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Res() res: Response) {
        return this.studyService.findOne(id, res);
    }

    @Patch()
    update(@Body() updateStudyDto: UpdateStudyDto, @Res() res: Response) {
        return this.studyService.update(updateStudyDto, res);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        return this.studyService.remove(id, res);
    }
}
