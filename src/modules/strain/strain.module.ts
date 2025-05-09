import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Strain, StrainSchema } from 'src/schemas/strain.schema';
import { StrainController } from './strain.controller';
import { StrainService } from './strain.service';

// Module này định nghĩa các thành phần của module strain
@Module({
    imports: [
        MongooseModule.forFeatureAsync([ // Kết nối đến MongoDB và định nghĩa schema cho strain
            {
                name: Strain.name,
                useFactory: () => {
                    const schema = StrainSchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [StrainController], // Đăng ký controller để xử lý các yêu cầu HTTP
    providers: [StrainService], // Đăng ký service để xử lý các logic nghiệp vụ
})
export class StrainModule { }
