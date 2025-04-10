import { Module } from '@nestjs/common';
import { PanGeneSetService } from './pan_gene_set.service';
import { PanGeneSetController } from './pan_gene_set.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PanGeneSet, PanGeneSetSchema } from 'src/schemas/pan-gene-set.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: PanGeneSet.name,
                useFactory: () => {
                    const schema = PanGeneSetSchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [PanGeneSetController],
    providers: [PanGeneSetService],
})
export class PanGeneSetModule {}
