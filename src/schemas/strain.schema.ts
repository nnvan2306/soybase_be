import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StrainDocument = Strain & Document;

// Định nghĩa schema cho Strain
// @Schema({ collection: 'strain' }) // Đặt tên collection trong MongoDB là 'strain'
@Schema()
export class Strain {
    @Prop({ required: true })
    name: string;
}

export const StrainSchema = SchemaFactory.createForClass(Strain);
