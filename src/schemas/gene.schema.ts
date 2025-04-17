import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { GeneFamily } from './gene-family.schema';
import { PanGeneSet } from './pan-gene-set.schema';
import { Strain } from './strain.schema';

export type GeneDocument = Gene & Document;

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
        path_detailo: string[];
    };

    @Prop({ type: mongoose.Schema.Types.Mixed })
    location: {
        name: string;
        path_detail: string[];
    };

    @Prop()
    description: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: GeneFamily.name, required: true })
    gene_family: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: PanGeneSet.name, required: true })
    pan_gene_set: string;

    @Prop({ default: 'Manihot' })
    genus: string;

    @Prop()
    species: string[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Strain.name, required: true })
    strain: string;
}

export const GeneSchema = SchemaFactory.createForClass(Gene);
