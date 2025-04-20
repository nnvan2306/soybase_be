import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DscensorService } from './dscensor.service';
import { DscensorDto } from './dto/handle.dto';

@Controller('dscensor')
export class DscensorController {
    constructor(private readonly dscensorService: DscensorService) {}

    @Get()
    getAllDscensor() {
        return this.dscensorService.getAllDscensor();
    }

    @Get(':id')
    getDetailDscensor(@Param('id') id: string) {
        return this.dscensorService.getDetailscensor(id);
    }

    @Post()
    createDscensor(@Body() data: DscensorDto) {
        return this.dscensorService.createDscensor(data);
    }

    @Put()
    updateDscensor(@Body() data: DscensorDto) {
        return this.dscensorService.updateDscensor(data);
    }

    @Delete(':id')
    deleteDscensor(@Param('id') id: string) {
        return this.dscensorService.DeleteDscensor(id);
    }
}
