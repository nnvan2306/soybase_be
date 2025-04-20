import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sendResponse } from 'src/helpers/response';
import { Dscensor, DscensorDocument } from 'src/schemas/dscensor.schema';
import { DscensorDto } from './dto/handle.dto';

@Injectable()
export class DscensorService {
    constructor(@InjectModel(Dscensor.name) private readonly dscensorModel: Model<DscensorDocument>) {}

    async getAllDscensor() {
        try {
            const dscensors = await this.dscensorModel.find();

            return sendResponse({
                data: dscensors,
                message: 'success',
                statusCode: HttpStatus.OK,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getDetailscensor(id: string) {
        try {
            const dscensor = await this.dscensorModel.findOne({
                _id: id,
            });

            return sendResponse({
                data: dscensor,
                message: 'success',
                statusCode: HttpStatus.OK,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async createDscensor(data: DscensorDto) {
        try {
            const dscensorCreate = new this.dscensorModel({
                ...data,
            });
            await dscensorCreate.save();

            return sendResponse({
                data: null,
                message: 'success',
                statusCode: HttpStatus.OK,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async updateDscensor(data: DscensorDto) {
        try {
            await this.dscensorModel.findByIdAndUpdate(
                {
                    _id: data._id,
                },
                {
                    ...data,
                },
                {
                    new: true,
                },
            );

            return sendResponse({
                data: null,
                message: 'success',
                statusCode: HttpStatus.OK,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async DeleteDscensor(id: string) {
        try {
            await this.dscensorModel.findByIdAndDelete({
                _id: id,
            });

            return sendResponse({
                data: null,
                message: 'success',
                statusCode: HttpStatus.OK,
            });
        } catch (error) {
            console.log(error);
        }
    }
}
