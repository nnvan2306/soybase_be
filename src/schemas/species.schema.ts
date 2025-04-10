import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpeciesDocument = Species & Document;

@Schema()
export class Species {
    @Prop({ required: true })
    name: string;

    @Prop()
    gene_id: string[];

    @Prop()
    gene_family: string;
}

export const SpeciesSchema = SchemaFactory.createForClass(Species);
