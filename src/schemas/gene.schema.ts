import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { GeneFamily } from './gene-family.schema';
import { PanGeneSet } from './pan-gene-set.schema';
import { Species } from './species.schema';
import { Strain } from './strain.schema';

// kiểu dữ liệu cho Gene
export type GeneDocument = Gene & Document;

// Định nghĩa schema cho Gene
// @Schema({ collection: 'gene' }) // Đặt tên collection trong MongoDB là 'gene'
@Schema()
export class Gene {
    @Prop({ required: true })
    name: string;

    @Prop()
    arabidopsis_hit: string;

    @Prop()
    go_terms: string[];

    @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
    identifier: {
        name: string;
        path_detail: string;
    };

    @Prop({ type: mongoose.Schema.Types.Mixed })
    location: {
        name: string;
        path_detail: string;
    };

    @Prop()
    description: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: GeneFamily.name, required: true })
    gene_family: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: PanGeneSet.name, required: true })
    pan_gene_set: MongooseSchema.Types.ObjectId;

    @Prop({ default: 'Manihot' })
    genus: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Species.name, required: true })
    // @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Species' })
    species: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Strain.name, required: true })
    strain: MongooseSchema.Types.ObjectId;
}

export const GeneSchema = SchemaFactory.createForClass(Gene);
