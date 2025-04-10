import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GeneDocument = Gene & Document;

@Schema()
export class Gene {
    @Prop({ required: true })
    name: string;

    @Prop()
    arabidopsis_hit: string;

    @Prop()
    go_terms: string[];

    @Prop()
    gene_family_id: string;

    // @Prop({ type: MongooseSchema.Types.ObjectId, ref: Species.name, required: true })
    // species: Species;
}

export const GeneSchema = SchemaFactory.createForClass(Gene);
