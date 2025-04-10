import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Species, SpeciesSchema } from 'src/schemas/species.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Species.name,
                useFactory: () => {
                    const schema = SpeciesSchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [SpeciesController],
    providers: [SpeciesService],
})
export class SpeciesModule {}
