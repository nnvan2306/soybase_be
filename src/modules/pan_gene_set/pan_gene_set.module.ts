import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PanGeneSet, PanGeneSetSchema } from 'src/schemas/pan-gene-set.schema';
import { PanGeneSetController } from './pan_gene_set.controller';
import { PanGeneSetService } from './pan_gene_set.service';


// Module này định nghĩa các thành phần của module pan_gene_set
@Module({
    imports: [
        MongooseModule.forFeatureAsync([ // Kết nối đến MongoDB và định nghĩa schema cho pan_gene_set
            {
                name: PanGeneSet.name,
                useFactory: () => {
                    const schema = PanGeneSetSchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [PanGeneSetController], // Đăng ký controller để xử lý các yêu cầu HTTP
    providers: [PanGeneSetService], // Đăng ký service để xử lý các logic nghiệp vụ
})
export class PanGeneSetModule { }
