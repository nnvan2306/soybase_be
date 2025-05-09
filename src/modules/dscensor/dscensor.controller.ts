import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DscensorService } from './dscensor.service';
import { DscensorDto } from './dto/handle.dto';

// Controller này xử lý các yêu cầu HTTP liên quan đến dscensor
// Nó định nghĩa các endpoint cho các chức năng như lấy danh sách dscensor, chi tiết dscensor, tạo mới, cập nhật và xóa dscensor
// Các endpoint này sẽ được ánh xạ đến các phương thức trong DscensorService để thực hiện các thao tác tương ứng
@Controller('dscensor')
export class DscensorController {
    // Inject DscensorService vào controller để sử dụng các phương thức của nó
    // DscensorService sẽ chứa các logic nghiệp vụ liên quan đến dscensor
    constructor(private readonly dscensorService: DscensorService) { }

    // Các endpoint được định nghĩa bên dưới
    // - GET /dscensor: Lấy danh sách tất cả dscensor
    @Get()
    getAllDscensor() {
        return this.dscensorService.getAllDscensor();
    }

    // - GET /dscensor/:id: Lấy chi tiết dscensor theo id
    @Get(':id')
    getDetailDscensor(@Param('id') id: string) {
        return this.dscensorService.getDetailscensor(id);
    }

    // - POST /dscensor: Tạo mới dscensor
    @Post()
    createDscensor(@Body() data: DscensorDto) {
        return this.dscensorService.createDscensor(data);
    }

    // - PUT /dscensor: Cập nhật dscensor
    @Put()
    updateDscensor(@Body() data: DscensorDto) {
        return this.dscensorService.updateDscensor(data);
    }

    // - DELETE /dscensor/:id: Xóa dscensor theo id
    @Delete(':id')
    deleteDscensor(@Param('id') id: string) {
        return this.dscensorService.DeleteDscensor(id);
    }
}
