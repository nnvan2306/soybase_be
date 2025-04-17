import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StrainDocument = Strain & Document;

@Schema()
export class Strain {
    @Prop({ required: true })
    name: string;
}

export const StrainSchema = SchemaFactory.createForClass(Strain);
