import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

// Class này để định nghĩa DTO (Data Transfer Object) cho dscensor
// DTO này sẽ được sử dụng để xác thực dữ liệu đầu vào khi tạo hoặc cập nhật dscensor
// Nó sử dụng các decorator từ class-validator để xác thực các trường dữ liệu
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
