import { Module } from '@nestjs/common';
import { GeneFamilyService } from './gene_family.service';
import { GeneFamilyController } from './gene_family.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GeneFamily, GeneFamilySchema } from 'src/schemas/gene-family.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: GeneFamily.name,
                useFactory: () => {
                    const schema = GeneFamilySchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [GeneFamilyController],
    providers: [GeneFamilyService],
})
export class GeneFamilyModule {}
