import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Species } from './species.schema';

export type StudyDocument = Study & Document;

@Schema()
export class Study {
    @Prop({ required: true })
    study_name: string;

    @Prop()
    link_detail_study: string;

    @Prop()
    study_type: string;

    @Prop()
    publication_id: string;

    @Prop()
    author: string;

    @Prop()
    synopsis: string;

    @Prop()
    description: string;

    @Prop()
    genotypes: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: Species.name, required: true })
    species: string;

    @Prop()
    traits: string;
}

export const StudySchema = SchemaFactory.createForClass(Study);
