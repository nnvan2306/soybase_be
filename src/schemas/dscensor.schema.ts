import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Gene } from './gene.schema';

export type DscensorDocument = Dscensor & Document;

@Schema()
export class Dscensor {
    @Prop({ required: true })
    sample_name: string;

    @Prop({
        required: true,
    })
    gennus: string;

    @Prop({
        required: true,
    })
    specis: string;

    @Prop({
        required: true,
    })
    infraspecies: string;

    @Prop({
        required: true,
    })
    scaffolds: string;

    @Prop({
        required: true,
    })
    scaffolds_n50: string;

    @Prop({
        required: true,
    })
    assembly_bases: string;

    @Prop({
        required: true,
    })
    gap_bases: string;

    @Prop({
        required: true,
    })
    config_bases: string;

    @Prop({
        required: true,
    })
    complete_buscos: string;

    @Prop({
        required: true,
    })
    missing: string;

    @Prop({
        required: true,
    })
    url_download: string;
}

export const DscensorSchema = SchemaFactory.createForClass(Dscensor);
