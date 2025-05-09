import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Species, SpeciesSchema } from 'src/schemas/species.schema';
import { Study, StudySchema } from 'src/schemas/study.schema';
import { StudyController } from './study.controller';
import { StudyService } from './study.service';

// Module này định nghĩa các thành phần của module study
// Nó bao gồm các controller, service và schema cần thiết để xử lý các yêu cầu liên quan đến study
@Module({
    imports: [
        MongooseModule.forFeatureAsync([ // Kết nối đến MongoDB và định nghĩa schema cho study
            {
                name: Study.name,
                useFactory: () => {
                    const schema = StudySchema;
                    return schema;
                },
            },
            {
                name: Species.name,
                useFactory: () => {
                    const schema = SpeciesSchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [StudyController], // Đăng ký controller để xử lý các yêu cầu HTTP
    providers: [StudyService], // Đăng ký service để xử lý các logic nghiệp vụ
})
export class StudyModule { }
