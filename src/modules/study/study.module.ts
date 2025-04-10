import { Module } from '@nestjs/common';
import { StudyService } from './study.service';
import { StudyController } from './study.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Study, StudySchema } from 'src/schemas/study.schema';

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
        ]),
    ],
    controllers: [StudyController],
    providers: [StudyService],
})
export class StudyModule {}
