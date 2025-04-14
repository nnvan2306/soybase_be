import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Gene } from './gene.schema';

export type GeneFunctionDocument = GeneFunction & Document;

@Schema()
export class GeneFunction {
    @Prop({ required: true })
    identifier: string;

    @Prop()
    location: string;

    @Prop()
    description: Gene;

    @Prop({ default: 'Manihot' })
    genus: string;

    @Prop()
    strain: string;

    @Prop()
    pan_gene_set_id: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Gene.name, required: true })
    gene_id: Gene;
}

export const GeneFunctionSchema = SchemaFactory.createForClass(GeneFunction);
