import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGeneFamilyDto } from './dto/create-gene_family.dto';
import { UpdateGeneFamilyDto } from './dto/update-gene_family.dto';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { GeneFamily, GeneFamilyDocument } from 'src/schemas/gene-family.schema';
import { Model } from 'mongoose';
import { sendResponse } from 'src/helpers/response';

@Injectable()
export class GeneFamilyService {
    constructor(@InjectModel(GeneFamily.name) private readonly geneFamilyModel: Model<GeneFamilyDocument>) {}

    async create(createGeneFamilyDto: CreateGeneFamilyDto, res: Response) {
        try {
            const newData = new this.geneFamilyModel({
                ...createGeneFamilyDto,
            });

            await newData.save();
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
            const data = await this.geneFamilyModel.find();
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

    async findOne(id: string, res: Response) {
        try {
            if (!id) {
                throw new NotFoundException('Not found');
            }

            const data = await this.geneFamilyModel.findById(id);

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

    async update(updateGeneFamily: UpdateGeneFamilyDto, res: Response) {
        try {
            if (!updateGeneFamily._id) {
                throw new NotFoundException('Not found');
            }

            const data = await this.geneFamilyModel.findByIdAndUpdate(
                { _id: updateGeneFamily._id },
                { ...updateGeneFamily },
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

            await this.geneFamilyModel.findByIdAndDelete(id);
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
