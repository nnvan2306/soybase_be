import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStrainDto } from './dto/create-strain.dto';
import { UpdateStrainDto } from './dto/update-strain.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Strain, StrainDocument } from 'src/schemas/strain.schema';
import { Model } from 'mongoose';
import { Response } from 'express';
import { sendResponse } from 'src/helpers/response';

@Injectable()
export class StrainService {
    constructor(@InjectModel(Strain.name) private readonly strainModel: Model<StrainDocument>) {}

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
