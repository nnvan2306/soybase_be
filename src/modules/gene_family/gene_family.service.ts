import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { sendResponse } from 'src/helpers/response';
import { GeneFamily, GeneFamilyDocument } from 'src/schemas/gene-family.schema';
import { CreateGeneFamilyDto } from './dto/create-gene_family.dto';
import { UpdateGeneFamilyDto } from './dto/update-gene_family.dto';

//  Service này xử lý các logic nghiệp vụ liên quan đến gene_family
//  Nó định nghĩa các phương thức để tương tác với cơ sở dữ liệu thông qua model GeneFamily
@Injectable()
export class GeneFamilyService {
    // Inject model GeneFamily vào service để sử dụng các phương thức của mongoose
    constructor(@InjectModel(GeneFamily.name) private readonly geneFamilyModel: Model<GeneFamilyDocument>) { }

    // Lấy danh sách gene_family theo tên
    // Endpoint này sẽ nhận danh sách tên gene_family từ client và gọi phương thức findList trong GeneFamilyService để tìm kiếm các gene_family tương ứng
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

    // Lấy danh sách gene_family với các tham số tìm kiếm
    // Endpoint này sẽ nhận các tham số tìm kiếm từ client và gọi phương thức findAll trong GeneFamilyService để lấy danh sách gene_family
    async findLimit(res: Response, page: string, pageSize: string) {
        try {
            const pageQuery = Number(page) ? Number(page) : 1;
            const pageSizeQuery = Number(pageSize) ? Number(pageSize) : 10;
            const skip = (pageQuery - 1) * pageSizeQuery;
            const [data, totalItems] = await Promise.all([
                this.geneFamilyModel.find().skip(skip).limit(pageSizeQuery).exec(),
                this.geneFamilyModel.countDocuments(),
            ]);

            const totalPages = Math.ceil(totalItems / pageSizeQuery);

            return res.json(
                sendResponse({
                    data: {
                        page: pageQuery,
                        pageSize: pageSizeQuery,
                        totalItems,
                        totalPages,
                        data: data,
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


    // Lấy danh sách gene_family với các tham số tìm kiếm
    // Endpoint này sẽ nhận các tham số tìm kiếm từ client và gọi phương thức findAll trong GeneFamilyService để lấy danh sách gene_family
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

    // Lấy chi tiết gene_family theo id
    // Endpoint này sẽ nhận id gene_family từ client và gọi phương thức findOne trong GeneFamilyService để lấy chi tiết gene_family
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

    // Cập nhật gene_family
    // Cập nhật gene_family theo id
    // Endpoint này sẽ nhận dữ liệu cập nhật từ client và gọi phương thức update trong GeneFamilyService để cập nhật gene_family
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

    // Xóa gene_family theo id
    // Endpoint này sẽ nhận id gene_family từ client và gọi phương thức remove trong GeneFamilyService để xóa gene_family khỏi cơ sở dữ liệu
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
