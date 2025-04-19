import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Study, StudyDocument } from 'src/schemas/study.schema';
import { Model } from 'mongoose';
import { Response } from 'express';
import { sendResponse } from 'src/helpers/response';

@Injectable()
export class StudyService {
    constructor(@InjectModel(Study.name) private readonly studyModel: Model<StudyDocument>) {}

    async create(createStudyDto: CreateStudyDto, res: Response) {
        try {
            const study = new this.studyModel({ ...createStudyDto });
            await study.save();
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

    async findAll(res: Response, page: string, pageSize: string) {
        try {
            const pageQuery = Number(page) ? Number(page) : 1;
            const pageSizeQuery = Number(pageSize) ? Number(pageSize) : 10;
            const skip = (pageQuery - 1) * pageSizeQuery;

            const [studies, totalItems] = await Promise.all([
                this.studyModel.find().skip(skip).limit(pageSizeQuery).exec(),
                this.studyModel.countDocuments(),
            ]);
            const totalPages = Math.ceil(totalItems / pageSizeQuery);
            return res.json(
                sendResponse({
                    data: {
                        page: pageQuery,
                        totalPages,
                        data: studies,
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
            const study = await this.studyModel.findById({ _id: id });
            return res.json(
                sendResponse({
                    data: study,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    async update(updateStudyDto: UpdateStudyDto, res: Response) {
        try {
            if (!updateStudyDto._id) {
                throw new NotFoundException('Not found');
            }
            const study = await this.studyModel.findByIdAndUpdate(
                { _id: updateStudyDto._id },
                { ...updateStudyDto },
                { new: true },
            );
            return res.json(
                sendResponse({
                    data: study,
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
            await this.studyModel.findByIdAndDelete({ _id: id });
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
