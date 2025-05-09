import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose'; // Use Model from mongoose
import { sendResponse } from 'src/helpers/response';
import { Post, PostDocument } from '../../schemas/post.schema'; // Adjusted relative path
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

// Service này xử lý các logic nghiệp vụ liên quan đến post
// Nó định nghĩa các phương thức để tương tác với cơ sở dữ liệu thông qua model Post
@Injectable()
export class PostService {
    // Inject model Post vào service để sử dụng các phương thức của mongoose
    constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>) { }

    // Tạo mới post
    // Endpoint này sẽ nhận dữ liệu từ client và gọi phương thức create trong PostService để lưu post vào cơ sở dữ liệu
    async create(createPostDto: CreatePostDto, res: Response) {
        try {
            const post = new this.postModel({
                ...createPostDto,
            });

            await post.save();
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

    // Lấy danh sách post theo tên
    // Endpoint này sẽ nhận danh sách tên post từ client và gọi phương thức findList trong PostService để tìm kiếm các post tương ứng
    async findAll(res: Response, page: string, pageSize: string) {
        try {
            const pageQuery = Number(page) ? Number(page) : 1;
            const pageSizeQuery = Number(pageSize) ? Number(pageSize) : 10;
            const skip = (pageQuery - 1) * pageSizeQuery;
            const [posts, totalItems] = await Promise.all([
                this.postModel.find().skip(skip).limit(pageSizeQuery).exec(),
                this.postModel.countDocuments(),
            ]);

            const totalPages = Math.ceil(totalItems / pageSizeQuery);
            return res.json(
                sendResponse({
                    data: {
                        page: pageQuery,
                        pageSize: pageSizeQuery,
                        totalItems,
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

    // Lấy chi tiết post theo id
    // Endpoint này sẽ nhận id post từ client và gọi phương thức findOne trong PostService để lấy chi tiết post
    async findOne(id: string, res: Response) {
        try {
            if (!id) {
                throw new NotFoundException('Not found');
            }
            const post = await this.postModel.findById({ _id: id });

            return res.json(
                sendResponse({
                    data: post,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    // Lấy danh sách post theo tên
    // Endpoint này sẽ nhận danh sách tên post từ client và gọi phương thức findList trong PostService để tìm kiếm các post tương ứng
    async findByType(type: string, res: Response, page: string, pageSize: string) {
        try {
            const pageQuery = Number(page) ? Number(page) : 1;
            const pageSizeQuery = Number(pageSize) ? Number(pageSize) : 10;
            const skip = (pageQuery - 1) * pageSizeQuery;
            const filter = type ? { type } : {};
            const [posts, totalItems] = await Promise.all([
                this.postModel.find(filter).skip(skip).limit(pageSizeQuery).exec(),
                this.postModel.countDocuments(filter),
            ]);

            const totalPages = Math.ceil(totalItems / pageSizeQuery);

            return res.json(
                sendResponse({
                    data: {
                        page: pageQuery,
                        pageSize: pageSizeQuery,
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

    // Cập nhật post
    // Endpoint này sẽ nhận dữ liệu cập nhật từ client và gọi phương thức update trong PostService để cập nhật post trong cơ sở dữ liệu
    async update(updatePostDto: UpdatePostDto, res: Response) {
        try {
            const post = await this.postModel.findByIdAndUpdate(
                {
                    _id: updatePostDto._id,
                },
                {
                    ...updatePostDto,
                },
                { new: true },
            );

            return res.json(
                sendResponse({
                    data: post,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    // Xóa post theo id
    // Endpoint này sẽ nhận id post từ client và gọi phương thức remove trong PostService để xóa post khỏi cơ sở dữ liệu
    async remove(id: string, res: Response) {
        try {
            const post = await this.postModel.findByIdAndDelete(id);

            if (!post) {
                throw new NotFoundException('Not found');
            }

            return res.json(
                sendResponse({
                    data: null,
                    message: 'Xoá thành công',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.error(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }
}
