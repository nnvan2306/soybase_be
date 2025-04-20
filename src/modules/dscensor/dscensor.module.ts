import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Dscensor, DscensorSchema } from 'src/schemas/dscensor.schema';
import { DscensorController } from './dscensor.controller';
import { DscensorService } from './dscensor.service';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Dscensor.name,
                useFactory: () => {
                    const schema = DscensorSchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [DscensorController],
    providers: [DscensorService],
})
export class DscensorModule {}
