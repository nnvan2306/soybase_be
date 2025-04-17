import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePanGeneSetDto } from './dto/create-pan_gene_set.dto';
import { UpdatePanGeneSetDto } from './dto/update-pan_gene_set.dto';
import { Response } from 'express';
import { sendResponse } from 'src/helpers/response';
import { InjectModel } from '@nestjs/mongoose';
import { PanGeneSet, PanGeneSetDocument } from 'src/schemas/pan-gene-set.schema';
import { Model } from 'mongoose';

@Injectable()
export class PanGeneSetService {
    constructor(@InjectModel(PanGeneSet.name) private readonly panGeneSetModel: Model<PanGeneSetDocument>) {}

    async create(createPanGeneSetDto: CreatePanGeneSetDto, res: Response) {
        try {
            const data = new this.panGeneSetModel({ ...createPanGeneSetDto });
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

    async findLimit(res: Response, page: string, pageSize: string) {
        try {
            const pageQuery = Number(page) ? Number(page) : 1;
            const pageSizeQuery = Number(pageSize) ? Number(pageSize) : 10;
            const skip = (pageQuery - 1) * pageSizeQuery;
            const [posts, totalItems] = await Promise.all([
                this.panGeneSetModel.find().skip(skip).limit(pageSizeQuery).exec(),
                this.panGeneSetModel.countDocuments(),
            ]);
            const totalPages = Math.ceil(totalItems / pageSizeQuery);
            return res.json(
                sendResponse({
                    data: {
                        page: pageQuery,
                        totalPages,
                        data: posts,
                    },
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
            const data = await this.panGeneSetModel.find();
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
            const data = await this.panGeneSetModel.findById({ _id: id });
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

    async update(res: Response, updatePanGeneSetDto: UpdatePanGeneSetDto) {
        try {
            const data = await this.panGeneSetModel.findByIdAndUpdate(
                { _id: updatePanGeneSetDto?._id },
                { ...updatePanGeneSetDto },
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
            await this.panGeneSetModel.findByIdAndDelete({ _id: id });
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
