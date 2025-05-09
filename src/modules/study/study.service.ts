import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model, Types } from 'mongoose';
import { sendResponse } from 'src/helpers/response';
import { Species, SpeciesDocument } from 'src/schemas/species.schema';
import { Study, StudyDocument } from 'src/schemas/study.schema';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';

// Kiểu dữ liệu cho các tham số tìm kiếm
// Các tham số này sẽ được sử dụng để lọc danh sách study trong phương thức findAll
type FilterType = {
    study_type?: string | { $regex: string; $options: string };
    publication_id?: string | { $regex: string; $options: string };
    author?: string | { $regex: string; $options: string };
    traits?: string | { $regex: string; $options: string };
    species?: string | { $regex: string; $options: string } | Types.ObjectId;
};

// StudyService là một service trong NestJS để xử lý các logic nghiệp vụ liên quan đến study
// Nó định nghĩa các phương thức để tương tác với cơ sở dữ liệu thông qua model Study
@Injectable()
export class StudyService {
    // Inject model Study và Species vào service để sử dụng các phương thức của mongoose
    constructor(
        @InjectModel(Study.name) private readonly studyModel: Model<StudyDocument>, // model để tương tác với collection study
        @InjectModel(Species.name) private readonly speciesModel: Model<SpeciesDocument>, // model để tương tác với collection species
    ) { }

    // Tạo mới study
    // Phương thức này sẽ nhận dữ liệu từ client và gọi model Study để lưu study vào cơ sở dữ liệu
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

    // Lấy danh sách tất cả study với các tham số tìm kiếm
    // Phương thức này sẽ nhận các tham số tìm kiếm từ client và gọi model Study để lấy danh sách study từ cơ sở dữ liệu
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

    // Lấy chi tiết study theo id
    // Phương thức này sẽ nhận id study từ client và gọi model Study để tìm study theo id từ cơ sở dữ liệu
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

    // Cập nhật study theo id
    // Phương thức này sẽ nhận dữ liệu cập nhật từ client và gọi model Study để cập nhật study theo id từ cơ sở dữ liệu
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

    // Xóa study theo id
    // Phương thức này sẽ nhận id study từ client và gọi model Study để xóa study theo id từ cơ sở dữ liệu
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
