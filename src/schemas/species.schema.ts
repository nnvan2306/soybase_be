import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Gene } from './gene.schema';

export type SpeciesDocument = Species & Document;

@Schema()
export class Species {
    @Prop({ required: true })
    name: string;

    // @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Gene.name })
    // gene_id: MongooseSchema.Types.ObjectId[];
}

export const SpeciesSchema = SchemaFactory.createForClass(Species);
