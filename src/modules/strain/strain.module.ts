import { Module } from '@nestjs/common';
import { StrainService } from './strain.service';
import { StrainController } from './strain.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Strain, StrainSchema } from 'src/schemas/strain.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Strain.name,
                useFactory: () => {
                    const schema = StrainSchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [StrainController],
    providers: [StrainService],
})
export class StrainModule {}
