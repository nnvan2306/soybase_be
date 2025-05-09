import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { SpeciesService } from './species.service';

// Controller này xử lý các yêu cầu HTTP liên quan đến species
// Nó định nghĩa các endpoint cho các chức năng như lấy danh sách species, chi tiết species, tạo mới, cập nhật và xóa species
@Controller('species')
export class SpeciesController {
    // Inject SpeciesService vào controller để sử dụng các phương thức của nó
    constructor(private readonly speciesService: SpeciesService) { }

    // Tạo mới species
    // Endpoint này sẽ nhận dữ liệu từ client và gọi phương thức create trong SpeciesService để lưu species vào cơ sở dữ liệu
    @Post()
    create(@Body() createSpeciesDto: CreateSpeciesDto, @Res() res: Response) {
        return this.speciesService.create(createSpeciesDto, res);
    }

    // Lấy danh sách species với các tham số tìm kiếm
    // Endpoint này sẽ nhận các tham số tìm kiếm từ client và gọi phương thức findAll trong SpeciesService để lấy danh sách species
    @Get()
    findAll(@Res() res: Response) {
        return this.speciesService.findAll(res);
    }

    // Lấy chi tiết species theo id
    // Endpoint này sẽ nhận id species từ client và gọi phương thức findOne trong SpeciesService để lấy chi tiết species
    @Get(':id')
    findOne(@Param('id') id: string, @Res() res: Response) {
        return this.speciesService.findOne(id, res);
    }

    // Cập nhật species
    // Endpoint này sẽ nhận dữ liệu cập nhật từ client và gọi phương thức update trong SpeciesService để cập nhật species trong cơ sở dữ liệu
    @Patch()
    update(@Body() updateSpeciesDto: UpdateSpeciesDto, @Res() res: Response) {
        return this.speciesService.update(updateSpeciesDto, res);
    }

    // Xóa species theo id
    // Endpoint này sẽ nhận id species từ client và gọi phương thức remove trong SpeciesService để xóa species khỏi cơ sở dữ liệu
    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        return this.speciesService.remove(id, res);
    }
}
