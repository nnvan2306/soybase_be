import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../../schemas/post.schema'; // Adjusted relative path
import { Model } from 'mongoose'; // Use Model from mongoose
import { Response } from 'express';
import { sendResponse } from 'src/helpers/response';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>) {}

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

    async findAll(res: Response) {
        try {
            const posts = await this.postModel.find();
            return res.json(
                sendResponse({
                    data: posts,
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

    async findByType(type: string, res: Response) {
        try {
            const filter = type ? { type } : {};
            const posts = await this.postModel.find(filter).exec();

            return res.json(
                sendResponse({
                    data: posts,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

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
