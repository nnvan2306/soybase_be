import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Study, StudyDocument } from 'src/schemas/study.schema';
import { Model, Types } from 'mongoose';
import { Response } from 'express';
import { sendResponse } from 'src/helpers/response';
import { Species, SpeciesDocument } from 'src/schemas/species.schema';

type FilterType = {
    study_type?: string | { $regex: string; $options: string };
    publication_id?: string | { $regex: string; $options: string };
    author?: string | { $regex: string; $options: string };
    traits?: string | { $regex: string; $options: string };
    species?: string | { $regex: string; $options: string } | Types.ObjectId;
};
@Injectable()
export class StudyService {
    constructor(
        @InjectModel(Study.name) private readonly studyModel: Model<StudyDocument>,
        @InjectModel(Species.name) private readonly speciesModel: Model<SpeciesDocument>,
    ) {}

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

    async findAll(
        res: Response,
        page: string,
        pageSize: string,
        study_type: string,
        publication_id: string,
        author: string,
        traits: string,
        species: string,
    ) {
        try {
            const pageQuery = Number(page) ? Number(page) : 1;
            const pageSizeQuery = Number(pageSize) ? Number(pageSize) : 10;
            const skip = (pageQuery - 1) * pageSizeQuery;
            const filter = {} as FilterType;

            if (study_type && typeof study_type === 'string') {
                filter.study_type = { $regex: study_type, $options: 'i' };
            }
            if (publication_id && typeof publication_id === 'string') {
                filter.publication_id = { $regex: publication_id, $options: 'i' };
            }
            if (author && typeof author === 'string') {
                filter.author = { $regex: author, $options: 'i' };
            }
            if (traits && typeof traits === 'string') {
                filter.traits = { $regex: traits, $options: 'i' };
            }

            if (species && typeof species === 'string') {
                if (Types.ObjectId.isValid(species)) {
                    filter.species = new Types.ObjectId(species);
                } else {
                    const speciesDoc = await this.speciesModel.findOne({
                        name: { $regex: species, $options: 'i' },
                    });
                    if (speciesDoc) {
                        filter.species = speciesDoc._id as Types.ObjectId;
                    }
                }
            }

            const [studies, totalItems] = await Promise.all([
                this.studyModel.find(filter).skip(skip).limit(pageSizeQuery).populate('species').exec(),
                this.studyModel.countDocuments(filter),
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
