import { Module } from '@nestjs/common';
import { GeneService } from './gene.service';
import { GeneController } from './gene.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Gene, GeneSchema } from 'src/schemas/gene.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Gene.name,
                useFactory: () => {
                    const schema = GeneSchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [GeneController],
    providers: [GeneService],
})
export class GeneModule {}
