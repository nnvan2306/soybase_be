import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Dscensor, DscensorSchema } from 'src/schemas/dscensor.schema';
import { DscensorController } from './dscensor.controller';
import { DscensorService } from './dscensor.service';

// Module này định nghĩa các thành phần của module dscensor
// Nó bao gồm các controller, service và schema cần thiết để xử lý các yêu cầu liên quan đến dscensor
@Module({
    imports: [
        // Kết nối đến MongoDB và định nghĩa schema cho dscensor
        MongooseModule.forFeatureAsync([
            {
                name: Dscensor.name,
                useFactory: () => {
                    const schema = DscensorSchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [DscensorController], // Đăng ký controller để xử lý các yêu cầu HTTP
    providers: [DscensorService], // Đăng ký service để xử lý các logic nghiệp vụ
})
export class DscensorModule { }
