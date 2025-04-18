import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Species, SpeciesDocument } from 'src/schemas/species.schema';
import { Model, Types } from 'mongoose';
import { sendResponse } from 'src/helpers/response';

@Injectable()
export class SpeciesService {
    constructor(@InjectModel(Species.name) private readonly specieModel: Model<SpeciesDocument>) {}

    async create(createSpeciesDto: CreateSpeciesDto, res: Response) {
        try {
            const convertedGeneIds = (createSpeciesDto?.gene_id || [])
                .filter((id) => Types.ObjectId.isValid(id))
                .map((id) => new Types.ObjectId(id));

            const data = new this.specieModel({
                ...createSpeciesDto,
                gene_id: convertedGeneIds,
            });

            await data.save();
            return res.json(
                sendResponse({
                    data: null,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    async findAll(res: Response) {
        try {
            const species = await this.specieModel.find();
            return res.json(
                sendResponse({
                    data: species,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    async findOne(id: string, res: Response) {
        try {
            if (!id) {
                throw new NotFoundException('Not found');
            }
            const data = await this.specieModel.findById({ _id: id }).populate('gene_id').exec();
            return res.json(
                sendResponse({
                    data: data,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    async update(updateSpeciesDto: UpdateSpeciesDto, res: Response) {
        try {
            if (!updateSpeciesDto?._id) {
                throw new NotFoundException('Not found');
            }
            const data = await this.specieModel.findByIdAndUpdate(
                { _id: updateSpeciesDto._id },
                {
                    ...updateSpeciesDto,
                },
                { new: true },
            );
            return res.json(
                sendResponse({
                    data: data,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    async remove(id: string, res: Response) {
        try {
            if (!id) {
                throw new NotFoundException('Not found');
            }
            await this.specieModel.findByIdAndDelete({ id });
            return res.json(
                sendResponse({
                    data: null,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }
}
