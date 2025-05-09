import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { sendResponse } from 'src/helpers/response';
import { PanGeneSet, PanGeneSetDocument } from 'src/schemas/pan-gene-set.schema';
import { CreatePanGeneSetDto } from './dto/create-pan_gene_set.dto';
import { UpdatePanGeneSetDto } from './dto/update-pan_gene_set.dto';

// Service này xử lý các logic nghiệp vụ liên quan đến pan_gene_set
// Nó định nghĩa các phương thức để tương tác với cơ sở dữ liệu thông qua model PanGeneSet
@Injectable()
export class PanGeneSetService {
    // Inject model PanGeneSet vào service để sử dụng các phương thức của mongoose
    constructor(@InjectModel(PanGeneSet.name) private readonly panGeneSetModel: Model<PanGeneSetDocument>) { }

    // Tạo mới pan_gene_set
    // Endpoint này sẽ nhận dữ liệu từ client và gọi phương thức create trong PanGeneSetService để lưu pan_gene_set vào cơ sở dữ liệu
    async create(createPanGeneSetDto: CreatePanGeneSetDto, res: Response) {
        try {
            const data = new this.panGeneSetModel({ ...createPanGeneSetDto });
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

    // Lấy danh sách pan_gene_set theo tên
    // Endpoint này sẽ nhận danh sách tên pan_gene_set từ client và gọi phương thức findList trong PanGeneSetService để tìm kiếm các pan_gene_set tương ứng
    async findLimit(res: Response, page: string, pageSize: string) {
        try {
            const pageQuery = Number(page) ? Number(page) : 1;
            const pageSizeQuery = Number(pageSize) ? Number(pageSize) : 10;
            const skip = (pageQuery - 1) * pageSizeQuery;
            const [posts, totalItems] = await Promise.all([
                this.panGeneSetModel.find().skip(skip).limit(pageSizeQuery).exec(),
                this.panGeneSetModel.countDocuments(),
            ]);
            const totalPages = Math.ceil(totalItems / pageSizeQuery);
            return res.json(
                sendResponse({
                    data: {
                        page: pageQuery,
                        totalPages,
                        data: posts,
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

    // Lấy danh sách pan_gene_set với các tham số tìm kiếm
    // Endpoint này sẽ nhận các tham số tìm kiếm từ client và gọi phương thức findAll trong PanGeneSetService để lấy danh sách pan_gene_set
    async findAll(res: Response) {
        try {
            const data = await this.panGeneSetModel.find();
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

    // Lấy chi tiết pan_gene_set theo id
    // Endpoint này sẽ nhận id pan_gene_set từ client và gọi phương thức findOne trong PanGeneSetService để lấy chi tiết pan_gene_set
    async findOne(id: string, res: Response) {
        try {
            const data = await this.panGeneSetModel.findById({ _id: id });
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

    // Cập nhật pan_gene_set
    // Endpoint này sẽ nhận dữ liệu cập nhật từ client và gọi phương thức update trong PanGeneSetService để cập nhật pan_gene_set trong cơ sở dữ liệu
    async update(res: Response, updatePanGeneSetDto: UpdatePanGeneSetDto) {
        try {
            const data = await this.panGeneSetModel.findByIdAndUpdate(
                { _id: updatePanGeneSetDto?._id },
                { ...updatePanGeneSetDto },
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

    // Xóa pan_gene_set theo id
    // Endpoint này sẽ nhận id pan_gene_set từ client và gọi phương thức remove trong PanGeneSetService để xóa pan_gene_set khỏi cơ sở dữ liệu
    async remove(id: string, res: Response) {
        try {
            await this.panGeneSetModel.findByIdAndDelete({ _id: id });
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
