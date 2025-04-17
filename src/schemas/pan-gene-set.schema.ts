import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PanGeneSetDocument = PanGeneSet & Document;

@Schema()
export class PanGeneSet {
    @Prop({ required: true })
    name: string;

    @Prop()
    url_detail: string;
}

export const PanGeneSetSchema = SchemaFactory.createForClass(PanGeneSet);
