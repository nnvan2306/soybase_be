import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateGeneFamilyDto } from './dto/create-gene_family.dto';
import { UpdateGeneFamilyDto } from './dto/update-gene_family.dto';
import { GeneFamilyService } from './gene_family.service';

// Controller này xử lý các yêu cầu HTTP liên quan đến gene_family
// Nó định nghĩa các endpoint cho các chức năng như lấy danh sách gene_family, chi tiết gene_family, tạo mới, cập nhật và xóa gene_family
@Controller('gene-family')
export class GeneFamilyController {
    constructor(private readonly geneFamilyService: GeneFamilyService) { }

    // Tạo mới gene_family
    // Endpoint này sẽ nhận dữ liệu từ client và gọi phương thức create trong GeneFamilyService để lưu gene_family vào cơ sở dữ liệu
    @Post()
    create(@Body() createGeneFamilyDto: CreateGeneFamilyDto, @Res() res: Response) {
        return this.geneFamilyService.create(createGeneFamilyDto, res);
    }

    // Lấy danh sách gene_family theo tên
    // Endpoint này sẽ nhận danh sách tên gene_family từ client và gọi phương thức findList trong GeneFamilyService để tìm kiếm các gene_family tương ứng
    @Get('limit')
    findLimit(@Res() res: Response, @Query('page') page: string, @Query('pageSize') pageSize: string) {
        return this.geneFamilyService.findLimit(res, page, pageSize);
    }

    // Lấy danh sách gene_family với các tham số tìm kiếm
    // Endpoint này sẽ nhận các tham số tìm kiếm từ client và gọi phương thức findAll trong GeneFamilyService để lấy danh sách gene_family
    @Get()
    findAll(@Res() res: Response) {
        return this.geneFamilyService.findAll(res);
    }

    // Lấy chi tiết gene_family theo id
    // Endpoint này sẽ nhận id gene_family từ client và gọi phương thức findOne trong GeneFamilyService để lấy chi tiết gene_family
    @Get(':id')
    findOne(@Param('id') id: string, @Res() res: Response) {
        return this.geneFamilyService.findOne(id, res);
    }

    // Cập nhật gene_family
    // Endpoint này sẽ nhận dữ liệu cập nhật từ client và gọi phương thức update trong GeneFamilyService để cập nhật gene_family trong cơ sở dữ liệu
    @Patch('')
    update(@Body() updateGeneFamilyDto: UpdateGeneFamilyDto, @Res() res: Response) {
        return this.geneFamilyService.update(updateGeneFamilyDto, res);
    }

    // Xóa gene_family theo id
    // Endpoint này sẽ nhận id gene_family từ client và gọi phương thức remove trong GeneFamilyService để xóa gene_family khỏi cơ sở dữ liệu
    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        return this.geneFamilyService.remove(id, res);
    }
}
