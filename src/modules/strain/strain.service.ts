import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { sendResponse } from 'src/helpers/response';
import { Strain, StrainDocument } from 'src/schemas/strain.schema';
import { CreateStrainDto } from './dto/create-strain.dto';
import { UpdateStrainDto } from './dto/update-strain.dto';

// StrainService là một service trong NestJS để xử lý các logic nghiệp vụ liên quan đến strain
@Injectable()
export class StrainService {
    // Inject model Strain vào service để sử dụng các phương thức của mongoose
    constructor(@InjectModel(Strain.name) private readonly strainModel: Model<StrainDocument>) { }

    // Các phương thức trong service này sẽ được gọi từ controller để thực hiện các thao tác như tạo mới, tìm kiếm, cập nhật và xóa strain
    async create(CreateStrainDto: CreateStrainDto, res: Response) {
        try {
            const strain = new this.strainModel({ ...CreateStrainDto });
            await strain.save();
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

    // Lấy danh sách tất cả strain
    // Phương thức này sẽ gọi model Strain để lấy danh sách strain từ cơ sở dữ liệu
    async findAll(res: Response) {
        try {
            const strains = await this.strainModel.find();
            return res.json(
                sendResponse({
                    data: strains,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    // Lấy chi tiết strain theo id
    // Phương thức này sẽ gọi model Strain để tìm strain theo id từ cơ sở dữ liệu
    async findOne(id: string, res: Response) {
        try {
            if (!id) {
                throw new NotFoundException('Not found');
            }
            const strain = await this.strainModel.findById({ _id: id });
            return res.json(
                sendResponse({
                    data: strain,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    // Cập nhật strain theo id
    // Phương thức này sẽ gọi model Strain để cập nhật strain theo id từ cơ sở dữ liệu
    async update(data: UpdateStrainDto, res: Response) {
        try {
            if (!data?._id) {
                throw new NotFoundException('Not found');
            }
            const strain = await this.strainModel.findByIdAndUpdate(
                {
                    _id: data._id,
                },
                { ...data },
                { new: true },
            );
            return res.json(
                sendResponse({
                    data: strain,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    // Xóa strain theo id
    // Phương thức này sẽ gọi model Strain để xóa strain theo id từ cơ sở dữ liệu
    async remove(id: string, res: Response) {
        try {
            if (!id) {
                throw new NotFoundException('Not found');
            }
            await this.strainModel.findByIdAndDelete({ _id: id });
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
