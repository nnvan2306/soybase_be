import { Module } from '@nestjs/common';
import { GeneFunctionService } from './gene-function.service';
import { GeneFunctionController } from './gene-function.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GeneFunction, GeneFunctionSchema } from 'src/schemas/gene-function.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: GeneFunction.name,
                useFactory: () => {
                    const schema = GeneFunctionSchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [GeneFunctionController],
    providers: [GeneFunctionService],
})
export class GeneFunctionModule {}
