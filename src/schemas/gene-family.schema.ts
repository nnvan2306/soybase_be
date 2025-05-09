import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// kiểu dữ liệu cho GeneFamily
export type GeneFamilyDocument = GeneFamily & Document;

// Định nghĩa schema cho GeneFamily
// @Schema({ collection: 'gene_family' }) // Đặt tên collection trong MongoDB là 'gene_family'
@Schema()
export class GeneFamily {
    @Prop({ required: true })
    name: string;

    @Prop({})
    path_detail: string[];
}

export const GeneFamilySchema = SchemaFactory.createForClass(GeneFamily);
