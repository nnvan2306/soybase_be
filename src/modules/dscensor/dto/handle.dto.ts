import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class DscensorDto {
    _id: string;

    @IsNotEmpty()
    @IsString()
    sample_name: string;

    @IsNotEmpty()
    @IsString()
    gennus: string;

    @IsNotEmpty()
    @IsString()
    specis: string;

    @IsNotEmpty()
    @IsString()
    infraspecies: string;

    @IsNotEmpty()
    @IsString()
    scaffolds: string;

    @IsNotEmpty()
    @IsString()
    scaffolds_n50: string;

    @IsNotEmpty()
    @IsString()
    assembly_bases: string;

    @IsNotEmpty()
    @IsString()
    gap_bases: string;

    @IsNotEmpty()
    @IsString()
    config_bases: string;

    @IsNotEmpty()
    @IsString()
    complete_buscos: string;

    @IsNotEmpty()
    @IsString()
    missing: string;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url_download: string;
}
