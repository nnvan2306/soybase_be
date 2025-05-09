import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

// Controller này xử lý các yêu cầu HTTP liên quan đến post
// Nó định nghĩa các endpoint cho các chức năng như lấy danh sách post, chi tiết post, tạo mới, cập nhật và xóa post
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    // Tạo mới post
    // Endpoint này sẽ nhận dữ liệu từ client và gọi phương thức create trong PostService để lưu post vào cơ sở dữ liệu
    @Post()
    create(@Body() createPostDto: CreatePostDto, @Res() res: Response) {
        return this.postService.create(createPostDto, res);
    }

    // Lấy danh sách post theo tên
    // Endpoint này sẽ nhận danh sách tên post từ client và gọi phương thức findList trong PostService để tìm kiếm các post tương ứng
    @Get('/type')
    findByType(
        @Query('type') type: string,
        @Res() res: Response,
        @Query('page') page: string,
        @Query('pageSize') pageSize: string,
    ) {
        return this.postService.findByType(type, res, page, pageSize);
    }

    // Lấy danh sách post với các tham số tìm kiếm
    // Endpoint này sẽ nhận các tham số tìm kiếm từ client và gọi phương thức findAll trong PostService để lấy danh sách post
    @Get()
    findAll(@Res() res: Response, @Query('page') page: string, @Query('pageSize') pageSize: string) {
        return this.postService.findAll(res, page, pageSize);
    }

    // Lấy chi tiết post theo id
    // Endpoint này sẽ nhận id post từ client và gọi phương thức findOne trong PostService để lấy chi tiết post
    @Get(':id')
    findOne(@Param('id') id: string, @Res() res: Response) {
        return this.postService.findOne(id, res);
    }

    // Cập nhật post
    // Endpoint này sẽ nhận dữ liệu cập nhật từ client và gọi phương thức update trong PostService để cập nhật post trong cơ sở dữ liệu
    @Patch('')
    update(@Body() updatePostDto: UpdatePostDto, @Res() res: Response) {
        return this.postService.update(updatePostDto, res);
    }

    // Xóa post theo id
    // Endpoint này sẽ nhận id post từ client và gọi phương thức remove trong PostService để xóa post khỏi cơ sở dữ liệu
    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        return this.postService.remove(id, res);
    }
}
