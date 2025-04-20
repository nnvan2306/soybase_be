import { Module } from '@nestjs/common';
import { StudyService } from './study.service';
import { StudyController } from './study.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Study, StudySchema } from 'src/schemas/study.schema';
import { Species, SpeciesSchema } from 'src/schemas/species.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
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
    controllers: [StudyController],
    providers: [StudyService],
})
export class StudyModule {}
