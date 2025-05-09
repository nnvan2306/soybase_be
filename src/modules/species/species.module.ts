import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Species, SpeciesSchema } from 'src/schemas/species.schema';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';

// Module này định nghĩa các thành phần của module species
// Nó bao gồm các controller, service và schema cần thiết để xử lý các yêu cầu liên quan đến species
@Module({
    imports: [
        MongooseModule.forFeatureAsync([ // Kết nối đến MongoDB và định nghĩa schema cho species
            {
                name: Species.name,
                useFactory: () => {
                    const schema = SpeciesSchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [SpeciesController], // Đăng ký controller để xử lý các yêu cầu HTTP
    providers: [SpeciesService],// Đăng ký service để xử lý các logic nghiệp vụ
})
export class SpeciesModule { }
