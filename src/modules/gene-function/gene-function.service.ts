import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGeneFunctionDto } from './dto/create-gene-function.dto';
import { UpdateGeneFunctionDto } from './dto/update-gene-function.dto';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { GeneFunction, GeneFunctionDocument } from 'src/schemas/gene-function.schema';
import { Model } from 'mongoose';
import { sendResponse } from 'src/helpers/response';

@Injectable()
export class GeneFunctionService {
    constructor(@InjectModel(GeneFunction.name) private readonly geneFunctionModel: Model<GeneFunctionDocument>) {}

    async create(geneFunctionData: CreateGeneFunctionDto, res: Response) {
        try {
            const geneFunction = new this.geneFunctionModel({ ...geneFunctionData });

            await geneFunction.save();
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
            const geneFunctions = await this.geneFunctionModel.find({});
            return res.json(
                sendResponse({
                    data: geneFunctions,
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
            const geneFunction = await this.geneFunctionModel.findById({ id });
            return res.json(
                sendResponse({
                    data: geneFunction,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    async update(geneFunctionData: UpdateGeneFunctionDto, res: Response) {
        try {
            if (!geneFunctionData?._id) {
                throw new NotFoundException('Not found');
            }
            const geneFunction = await this.geneFunctionModel.findByIdAndUpdate(
                { _id: geneFunctionData._id },
                { ...geneFunctionData },
                { new: true },
            );
            return res.json(
                sendResponse({
                    data: geneFunction,
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
            await this.geneFunctionModel.findByIdAndDelete({ _id: id });
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
