import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateGeneDto } from './dto/create-gene.dto';
import { UpdateGeneDto } from './dto/update-gene.dto';
import { GeneService } from './gene.service';

// Controller này xử lý các yêu cầu HTTP liên quan đến gene
// Nó định nghĩa các endpoint cho các chức năng như lấy danh sách gene, chi tiết gene, tạo mới, cập nhật và xóa gene
@Controller('gene')
export class GeneController {
    // Inject GeneService vào controller để sử dụng các phương thức của nó
    constructor(private readonly geneService: GeneService) { }

    // Tạo mới gene
    // Endpoint này sẽ nhận dữ liệu từ client và gọi phương thức create trong GeneService để lưu gene vào cơ sở dữ liệu
    @Post()
    create(@Body() createGeneDto: CreateGeneDto, @Res() res: Response) {
        return this.geneService.create(createGeneDto, res);
    }

    // Lấy danh sách gene theo tên
    // Endpoint này sẽ nhận danh sách tên gene từ client và gọi phương thức findList trong GeneService để tìm kiếm các gene tương ứng
    @Get('/list')
    getList(@Query('names') names: string[], @Res() res: Response) {
        return this.geneService.findList(names, res);
    }

    // Lấy danh sách gene với các tham số tìm kiếm
    // Endpoint này sẽ nhận các tham số tìm kiếm từ client và gọi phương thức findAll trong GeneService để lấy danh sách gene
    // Các tham số tìm kiếm bao gồm textSearch, page, pageSize, species, strain, identifier, description và gene_family
    @Get()
    findAll(
        @Res() res: Response,
        @Query('textSearch') textSearch: string,
        @Query('page') page: string,
        @Query('pageSize') pageSize: string,
        @Query('species') species: string,
        @Query('strain') strain: string,
        @Query('identifier') identifier: string,
        @Query('description') description: string,
        @Query('gene_family') gene_family: string,
    ) {
        return this.geneService.findAll(
            res,
            textSearch,
            page,
            pageSize,
            species,
            strain,
            identifier,
            description,
            gene_family,
        );
    }

    // Lấy chi tiết gene theo id
    // Endpoint này sẽ nhận id gene từ client và gọi phương thức findOne trong GeneService để lấy chi tiết gene
    @Get(':id')
    findOne(@Param('id') id: string, @Res() res: Response) {
        return this.geneService.findOne(id, res);
    }

    // Cập nhật gene theo id
    // Endpoint này sẽ nhận dữ liệu cập nhật từ client và gọi phương thức update trong GeneService để cập nhật gene
    @Patch(':id')
    update(@Body() updateGeneDto: UpdateGeneDto, @Res() res: Response) {
        return this.geneService.update(updateGeneDto, res);
    }

    // Xóa gene theo id
    // Endpoint này sẽ nhận id gene từ client và gọi phương thức remove trong GeneService để xóa gene
    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        return this.geneService.remove(id, res);
    }
}
