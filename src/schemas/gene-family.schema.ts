import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GeneFamilyDocument = GeneFamily & Document;

@Schema()
export class GeneFamily {
    @Prop({ required: true })
    name: string;

    @Prop({})
    path_detail: string[];
}

export const GeneFamilySchema = SchemaFactory.createForClass(GeneFamily);
