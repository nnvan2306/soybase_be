import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model, Types } from 'mongoose';
import { sendResponse } from 'src/helpers/response';
import { GeneFamily, GeneFamilyDocument } from 'src/schemas/gene-family.schema';
import { Gene, GeneDocument } from 'src/schemas/gene.schema';
import { Species, SpeciesDocument } from 'src/schemas/species.schema';
import { Strain, StrainDocument } from 'src/schemas/strain.schema';
import { CreateGeneDto } from './dto/create-gene.dto';
import { UpdateGeneDto } from './dto/update-gene.dto';

// kiểu dữ liệu cho các tham số tìm kiếm
// species, strain, identifier, description, gene_family
// có thể là chuỗi hoặc ObjectId
// textSearch là chuỗi và có thể tìm kiếm trong tất cả các trường
// gene_family là ObjectId hoặc chuỗi
// identifier là chuỗi và có thể tìm kiếm trong trường name
// description là chuỗi và có thể tìm kiếm trong trường description
// textSearch là chuỗi và có thể tìm kiếm trong tất cả các trường
// species là ObjectId hoặc chuỗi và có thể tìm kiếm trong trường name
// strain là ObjectId hoặc chuỗi và có thể tìm kiếm trong trường name
// gene_family là ObjectId hoặc chuỗi và có thể tìm kiếm trong trường name
type FilterType = {
    species?: string | { $regex: string; $options: string } | Types.ObjectId;
    strain?: string | { $regex: string; $options: string } | Types.ObjectId;
    identifier?: string | { $regex: string; $options: string };
    description?: string | { $regex: string; $options: string };
    gene_family?: string | { $regex: string; $options: string } | Types.ObjectId;
    textSearch?: string | { $regex: string; $options: string };
};

// Service này xử lý các logic nghiệp vụ liên quan đến gene
// Nó định nghĩa các phương thức để tương tác với cơ sở dữ liệu thông qua model Gene
@Injectable()
export class GeneService {

    // Inject model Gene vào service để sử dụng các phương thức của mongoose
    constructor(
        @InjectModel(Gene.name) private readonly geneModel: Model<GeneDocument>, // model gene
        @InjectModel(Species.name) private readonly speciesModel: Model<SpeciesDocument>, // model species
        @InjectModel(Strain.name) private readonly strainModel: Model<StrainDocument>, // model strain
        @InjectModel(GeneFamily.name) private readonly geneFamilyModel: Model<GeneFamilyDocument>, // model gene family
    ) { }

    // Tạo mới gene
    // Endpoint này sẽ nhận dữ liệu từ client và gọi phương thức create trong GeneService để lưu gene vào cơ sở dữ liệu
    async create(geneData: CreateGeneDto, res: Response) {
        try {
            const gene = new this.geneModel({ ...geneData });
            await gene.save();
            return res.json(
                sendResponse({
                    data: null,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    // Lấy danh sách gene theo tên
    // Endpoint này sẽ nhận danh sách tên gene từ client và gọi phương thức findList trong GeneService để tìm kiếm các gene tương ứng
    async findAll(
        res: Response,
        textSearch: string,
        page: string,
        pageSize: string,
        species: string,
        strain: string,
        identifier: string,
        description: string,
        gene_family: string,
    ) {
        try {
            const pageQuery = Number(page) ? Number(page) : 1;
            const pageSizeQuery = Number(pageSize) ? Number(pageSize) : 10;
            const skip = (pageQuery - 1) * pageSizeQuery;

            const filter = {} as FilterType;

            if (identifier && typeof identifier === 'string') {
                filter['identifier.name'] = { $regex: identifier, $options: 'i' };
            }
            if (description && typeof description === 'string') {
                filter.description = { $regex: description, $options: 'i' };
            }
            if (textSearch && typeof textSearch === 'string') {
                filter.textSearch = { $regex: textSearch, $options: 'i' };
            }
            if (species && typeof species === 'string') {
                if (Types.ObjectId.isValid(species)) {
                    filter.species = new Types.ObjectId(species);
                } else {
                    const speciesDoc = await this.speciesModel.findOne({
                        name: { $regex: species, $options: 'i' },
                    });
                    if (speciesDoc) {
                        filter.species = speciesDoc._id as Types.ObjectId;
                    }
                }
            }
            if (strain && typeof strain === 'string') {
                if (Types.ObjectId.isValid(strain)) {
                    filter.strain = new Types.ObjectId(strain);
                } else {
                    const strainDoc = await this.strainModel.findOne({
                        name: { $regex: strain, $options: 'i' },
                    });
                    if (strainDoc) {
                        filter.strain = strainDoc._id as Types.ObjectId;
                    }
                }
            }
            if (gene_family && typeof gene_family === 'string') {
                if (Types.ObjectId.isValid(gene_family)) {
                    filter.gene_family = new Types.ObjectId(gene_family);
                } else {
                    const gene_familyDoc = await this.geneFamilyModel.findOne({
                        name: { $regex: gene_family, $options: 'i' },
                    });
                    if (gene_familyDoc) {
                        filter.gene_family = gene_familyDoc._id as Types.ObjectId;
                    }
                }
            }

            const [genes, totalItems] = await Promise.all([
                this.geneModel
                    .find(filter)
                    .skip(skip)
                    .limit(pageSizeQuery)
                    .populate([
                        { path: 'gene_family' },
                        { path: 'pan_gene_set' },
                        { path: 'species' },
                        { path: 'strain' },
                    ])
                    .exec(),
                this.geneModel.countDocuments(filter),
            ]);
            return res.json(
                sendResponse({
                    data: {
                        page: pageQuery,
                        pageSize: pageSizeQuery,
                        totalItems,
                        data: genes,
                    },
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    // Lấy chi tiết gene theo id
    // Endpoint này sẽ nhận id gene từ client và gọi phương thức findOne trong GeneService để lấy chi tiết gene
    async findOne(id: string, res: Response) {
        try {
            if (!id) {
                throw new NotFoundException('Not found');
            }

            const gene = await this.geneModel.findById({ _id: id });
            return res.json(
                sendResponse({
                    data: gene,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    // Lấy danh sách gene theo tên
    // Endpoint này sẽ nhận danh sách tên gene từ client và gọi phương thức findList trong GeneService để tìm kiếm các gene tương ứng
    async findList(names: string[], res: Response) {
        try {
            if (!names || names.length === 0) {
                return res.json({
                    message: 'No names provided',
                    statusCode: HttpStatus.BAD_REQUEST,
                });
            }

            const geneList = await this.geneModel.find({
                name: { $in: names },
            });

            return res.json({
                message: 'success',
                data: geneList,
                statusCode: HttpStatus.OK,
            });
        } catch (error) {
            console.error(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    // Cập nhật gene theo id
    // Endpoint này sẽ nhận dữ liệu cập nhật từ client và gọi phương thức update trong GeneService để cập nhật gene
    async update(geneData: UpdateGeneDto, res: Response) {
        try {
            if (!geneData?._id) {
                throw new NotFoundException('Not found');
            }
            const gene = await this.geneModel.findByIdAndUpdate({ _id: geneData._id }, { ...geneData }, { new: true });
            return res.json(
                sendResponse({
                    data: gene,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }

    // Xóa gene theo id
    // Endpoint này sẽ nhận id gene từ client và gọi phương thức remove trong GeneService để xóa gene
    async remove(id: string, res: Response) {
        try {
            if (!id) {
                throw new NotFoundException('Not found');
            }
            await this.geneModel.findByIdAndDelete(id);
            return res.json(
                sendResponse({
                    data: null,
                    message: 'success',
                    statusCode: HttpStatus.OK,
                }),
            );
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Có lỗi xảy ra');
        }
    }
}
