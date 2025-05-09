import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreatePanGeneSetDto } from './dto/create-pan_gene_set.dto';
import { UpdatePanGeneSetDto } from './dto/update-pan_gene_set.dto';
import { PanGeneSetService } from './pan_gene_set.service';

// Controller này xử lý các yêu cầu HTTP liên quan đến pan_gene_set
// Nó định nghĩa các endpoint cho các chức năng như lấy danh sách pan_gene_set, chi tiết pan_gene_set, tạo mới, cập nhật và xóa pan_gene_set
@Controller('pan-gene-set')
export class PanGeneSetController {
    // Inject PanGeneSetService vào controller để sử dụng các phương thức của nó
    constructor(private readonly panGeneSetService: PanGeneSetService) { }

    // Tạo mới pan_gene_set
    // Endpoint này sẽ nhận dữ liệu từ client và gọi phương thức create trong PanGeneSetService để lưu pan_gene_set vào cơ sở dữ liệu
    @Post()
    create(@Body() createPanGeneSetDto: CreatePanGeneSetDto, @Res() res: Response) {
        return this.panGeneSetService.create(createPanGeneSetDto, res);
    }

    // Lấy danh sách pan_gene_set theo tên
    // Endpoint này sẽ nhận danh sách tên pan_gene_set từ client và gọi phương thức findList trong PanGeneSetService để tìm kiếm các pan_gene_set tương ứng
    @Get('limit')
    findLimit(@Res() res: Response, @Query('page') page: string, @Query('pageSize') pageSize: string) {
        return this.panGeneSetService.findLimit(res, page, pageSize);
    }

    // Lấy danh sách pan_gene_set với các tham số tìm kiếm
    // Endpoint này sẽ nhận các tham số tìm kiếm từ client và gọi phương thức findAll trong PanGeneSetService để lấy danh sách pan_gene_set
    @Get('all')
    findAll(@Res() res: Response) {
        return this.panGeneSetService.findAll(res);
    }

    // Lấy chi tiết pan_gene_set theo id
    // Endpoint này sẽ nhận id pan_gene_set từ client và gọi phương thức findOne trong PanGeneSetService để lấy chi tiết pan_gene_set
    @Get(':id')
    findOne(@Param('id') id: string, @Res() res: Response) {
        return this.panGeneSetService.findOne(id, res);
    }

    // Cập nhật pan_gene_set
    // Endpoint này sẽ nhận dữ liệu cập nhật từ client và gọi phương thức update trong PanGeneSetService để cập nhật pan_gene_set trong cơ sở dữ liệu
    @Patch()
    update(@Res() res: Response, @Body() updatePanGeneSetDto: UpdatePanGeneSetDto) {
        return this.panGeneSetService.update(res, updatePanGeneSetDto);
    }

    // Xóa pan_gene_set theo id
    // Endpoint này sẽ nhận id pan_gene_set từ client và gọi phương thức remove trong PanGeneSetService để xóa pan_gene_set khỏi cơ sở dữ liệu
    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        return this.panGeneSetService.remove(id, res);
    }
}
