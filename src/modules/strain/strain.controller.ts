import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateStrainDto } from './dto/create-strain.dto';
import { UpdateStrainDto } from './dto/update-strain.dto';
import { StrainService } from './strain.service';

// Controller này xử lý các yêu cầu HTTP liên quan đến strain
@Controller('strain')
export class StrainController {
    // Inject StrainService vào controller để sử dụng các phương thức của nó
    constructor(private readonly strainService: StrainService) { }

    // Tạo mới strain
    // Endpoint này sẽ nhận dữ liệu từ client và gọi phương thức create trong StrainService để lưu strain vào cơ sở dữ liệu
    @Post()
    create(@Body() createStrainDto: CreateStrainDto, @Res() res: Response) {
        return this.strainService.create(createStrainDto, res);
    }

    // Lấy danh sách strain với các tham số tìm kiếm
    @Get()
    findAll(@Res() res: Response) {
        return this.strainService.findAll(res);
    }

    // Lấy chi tiết strain theo id
    // Endpoint này sẽ nhận id strain từ client và gọi phương thức findOne trong StrainService để lấy chi tiết strain
    @Get(':id')
    findOne(@Param('id') id: string, @Res() res: Response) {
        return this.strainService.findOne(id, res);
    }

    // Cập nhật strain
    // Endpoint này sẽ nhận dữ liệu cập nhật từ client và gọi phương thức update trong StrainService để cập nhật strain trong cơ sở dữ liệu
    @Patch()
    update(@Body() updateStrainDto: UpdateStrainDto, @Res() res: Response) {
        return this.strainService.update(updateStrainDto, res);
    }

    // Xóa strain theo id
    // Endpoint này sẽ nhận id strain từ client và gọi phương thức remove trong StrainService để xóa strain khỏi cơ sở dữ liệu
    @Delete(':id')
    remove(@Param('id') id: string, @Res() res: Response) {
        return this.strainService.remove(id, res);
    }
}
