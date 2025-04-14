import { Injectable } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { Response } from 'express';

@Injectable()
export class SpeciesService {
    create(createSpeciesDto: CreateSpeciesDto, res: Response) {
        // try {
        // } catch (error) {
        //     console.log(error);
        //     throw new BadRequestException('Có lỗi xảy ra');
        // }
    }

    findAll(res: Response) {
        return `This action returns all species`;
    }

    findOne(id: string, res: Response) {
        return `This action returns a #${id} species`;
    }

    update(updateSpeciesDto: UpdateSpeciesDto, res: Response) {
        return `This action updates a species`;
    }

    remove(id: string, res: Response) {
        return `This action removes a #${id} species`;
    }
}
