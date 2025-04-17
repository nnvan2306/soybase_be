import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudyDocument = Study & Document;

@Schema()
export class Study {
    @Prop({ required: true })
    name: string;

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
}

export const StudySchema = SchemaFactory.createForClass(Study);
