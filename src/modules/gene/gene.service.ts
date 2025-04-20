import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGeneDto } from './dto/create-gene.dto';
import { UpdateGeneDto } from './dto/update-gene.dto';
import { Gene, GeneDocument } from 'src/schemas/gene.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response } from 'express';
import { sendResponse } from 'src/helpers/response';

@Injectable()
export class GeneService {
    constructor(@InjectModel(Gene.name) private readonly geneModel: Model<GeneDocument>) {}

    async create(geneData: CreateGeneDto, res: Response) {
        try {
            const gene = new this.geneModel({ ...geneData });
            await gene.save();
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

    async findAll(res: Response, textSearch: string, page: string, pageSize: string) {
        try {
            const pageQuery = Number(page) ? Number(page) : 1;
            const pageSizeQuery = Number(pageSize) ? Number(pageSize) : 10;
            const skip = (pageQuery - 1) * pageSizeQuery;
            const searchCondition = textSearch
                ? {
                      $or: [{ name: { $regex: textSearch, $options: 'i' } }],
                  }
                : {};
            const [genes, totalItems] = await Promise.all([
                this.geneModel
                    .find(searchCondition)
                    .skip(skip)
                    .limit(pageSizeQuery)
                    .populate([
                        { path: 'gene_family' },
                        { path: 'pan_gene_set' },
                        { path: 'species' },
                        { path: 'strain' },
                    ])
                    .exec(),
                this.geneModel.countDocuments(searchCondition),
            ]);
            return res.json(
                sendResponse({
                    data: {
                        page: pageQuery,
                        pageSize: pageSizeQuery,
                        totalItems,
                        data: genes,
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

    async findOne(id: string, res: Response) {
        try {
            if (!id) {
                throw new NotFoundException('Not found');
            }

            const gene = await this.geneModel.findById({ _id: id });
            return res.json(
                sendResponse({
                    data: gene,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    async findList(names: string[], res: Response) {
        try {
            if (!names || names.length === 0) {
                return res.json({
                    message: 'No names provided',
                    statusCode: HttpStatus.BAD_REQUEST,
                });
            }

            const geneList = await this.geneModel.find({
                name: { $in: names },
            });

            return res.json({
                message: 'success',
                data: geneList,
                statusCode: HttpStatus.OK,
            });
        } catch (error) {
            console.error(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    async update(geneData: UpdateGeneDto, res: Response) {
        try {
            if (!geneData?._id) {
                throw new NotFoundException('Not found');
            }
            const gene = await this.geneModel.findByIdAndUpdate({ _id: geneData._id }, { ...geneData }, { new: true });
            return res.json(
                sendResponse({
                    data: gene,
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
            await this.geneModel.findByIdAndDelete(id);
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
