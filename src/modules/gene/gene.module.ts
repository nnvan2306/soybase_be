import { Module } from '@nestjs/common';
import { GeneService } from './gene.service';
import { GeneController } from './gene.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Gene, GeneSchema } from 'src/schemas/gene.schema';
import { Strain, StrainSchema } from 'src/schemas/strain.schema';
import { Species, SpeciesSchema } from 'src/schemas/species.schema';
import { GeneFamily, GeneFamilySchema } from 'src/schemas/gene-family.schema';

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
    controllers: [GeneController],
    providers: [GeneService],
})
export class GeneModule {}
