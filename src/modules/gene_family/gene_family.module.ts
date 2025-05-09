import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GeneFamily, GeneFamilySchema } from 'src/schemas/gene-family.schema';
import { GeneFamilyController } from './gene_family.controller';
import { GeneFamilyService } from './gene_family.service';

// Module này định nghĩa các thành phần của module gene_family
// Nó bao gồm các controller, service và schema cần thiết để xử lý các yêu cầu liên quan đến gene_family
@Module({
    imports: [
        MongooseModule.forFeatureAsync([ // Kết nối đến MongoDB và định nghĩa schema cho gene_family
            {
                name: GeneFamily.name,
                useFactory: () => {
                    const schema = GeneFamilySchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [GeneFamilyController], // Đăng ký controller để xử lý các yêu cầu HTTP
    providers: [GeneFamilyService], // Đăng ký service để xử lý các logic nghiệp vụ
})
export class GeneFamilyModule { }
