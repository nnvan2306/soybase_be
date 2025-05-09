import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model, Types } from 'mongoose';
import { sendResponse } from 'src/helpers/response';
import { Species, SpeciesDocument } from 'src/schemas/species.schema';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';

// Class này để định nghĩa service cho species
// Nó chứa các phương thức để xử lý các yêu cầu liên quan đến species
// Các phương thức này sẽ được gọi từ controller để thực hiện các thao tác như tạo mới, tìm kiếm, cập nhật và xóa species
@Injectable()
export class SpeciesService {
    constructor(@InjectModel(Species.name) private readonly specieModel: Model<SpeciesDocument>) { }

    // Tạo mới species
    // Endpoint này sẽ nhận dữ liệu từ client và gọi phương thức create trong SpeciesService để lưu species vào cơ sở dữ liệu
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

    // Lấy danh sách species với các tham số tìm kiếm
    // Endpoint này sẽ nhận các tham số tìm kiếm từ client và gọi phương thức findAll trong SpeciesService để lấy danh sách species
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

    // Lấy chi tiết species theo id
    // Endpoint này sẽ nhận id species từ client và gọi phương thức findOne trong SpeciesService để lấy chi tiết species
    async findOne(id: string, res: Response) {
        try {
            if (!id) {
                throw new NotFoundException('Not found');
            }
            const data = await this.specieModel.findById({ _id: id });
            // .populate('gene_id').exec()
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

    // Cập nhật species
    // Endpoint này sẽ nhận dữ liệu cập nhật từ client và gọi phương thức update trong SpeciesService để cập nhật species trong cơ sở dữ liệu
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

    // Xóa species theo id
    // Endpoint này sẽ nhận id species từ client và gọi phương thức remove trong SpeciesService để xóa species khỏi cơ sở dữ liệu
    async remove(id: string, res: Response) {
        try {
            if (!id) {
                throw new NotFoundException('Not found');
            }
            await this.specieModel.findByIdAndDelete({ _id: id });
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
