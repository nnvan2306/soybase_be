import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GeneFamily, GeneFamilySchema } from 'src/schemas/gene-family.schema';
import { Gene, GeneSchema } from 'src/schemas/gene.schema';
import { Species, SpeciesSchema } from 'src/schemas/species.schema';
import { Strain, StrainSchema } from 'src/schemas/strain.schema';
import { GeneController } from './gene.controller';
import { GeneService } from './gene.service';

// Module này định nghĩa các thành phần của module gene
// Nó bao gồm các controller, service và schema cần thiết để xử lý các yêu cầu liên quan đến gene
@Module({
    imports: [
        MongooseModule.forFeatureAsync([ // Kết nối đến MongoDB và định nghĩa schema cho gene
            {
                name: Gene.name,
                useFactory: () => {
                    const schema = GeneSchema;
                    return schema;
                },
            },
            {
                name: Strain.name,
                useFactory: () => {
                    const schema = StrainSchema;
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
            {
                name: GeneFamily.name,
                useFactory: () => {
                    const schema = GeneFamilySchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [GeneController], // Đăng ký controller để xử lý các yêu cầu HTTP
    providers: [GeneService], // Đăng ký service để xử lý các logic nghiệp vụ
})
export class GeneModule { }
