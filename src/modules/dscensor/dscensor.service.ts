import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sendResponse } from 'src/helpers/response';
import { Dscensor, DscensorDocument } from 'src/schemas/dscensor.schema';
import { DscensorDto } from './dto/handle.dto';

// Service này xử lý các logic nghiệp vụ liên quan đến dscensor
// Nó định nghĩa các phương thức để tương tác với cơ sở dữ liệu thông qua model Dscensor
// Các phương thức này sẽ được gọi từ controller để thực hiện các thao tác như lấy danh sách, chi tiết, tạo mới, cập nhật và xóa dscensor
@Injectable()
export class DscensorService {
    // Inject model Dscensor vào service để sử dụng các phương thức của mongoose
    constructor(@InjectModel(Dscensor.name) private readonly dscensorModel: Model<DscensorDocument>) { }

    // Lấy danh sách tất cả dscensor
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

    // Lấy chi tiết dscensor theo id
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

    // Tạo mới dscensor
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

    // Cập nhật dscensor
    // Cập nhật dscensor theo id                                        
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

    // Xóa dscensor
    // Xóa dscensor theo id
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
