// Import các decorator và module cần thiết từ NestJS và các thư viện liên quan
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DscensorModule } from './modules/dscensor/dscensor.module';
import { GeneModule } from './modules/gene/gene.module';
import { GeneFamilyModule } from './modules/gene_family/gene_family.module';
import { PanGeneSetModule } from './modules/pan_gene_set/pan_gene_set.module';
import { PostModule } from './modules/post/post.module';
import { SpeciesModule } from './modules/species/species.module';
import { StrainModule } from './modules/strain/strain.module';
import { StudyModule } from './modules/study/study.module';

// Sử dụng decorator @Module để định nghĩa module chính của ứng dụng
@Module({
    // Danh sách các module được import vào AppModule
    imports: [
        // Cấu hình ConfigModule để quản lý biến môi trường, áp dụng toàn cục
        ConfigModule.forRoot({
            isGlobal: true, // Biến ConfigModule thành global, có thể sử dụng ở mọi nơi mà không cần import lại
        }),
        // Kết nối tới MongoDB bằng MongooseModule với URI cụ thể
        MongooseModule.forRoot('mongodb://localhost:27017/rice'), // Kết nối đến database 'rice' trên localhost
        // Import các module con, mỗi module chịu trách nhiệm cho một phần logic cụ thể của ứng dụng
        PostModule, // Module xử lý các chức năng liên quan đến bài đăng
        GeneModule, // Module xử lý các chức năng liên quan đến gene
        StudyModule, // Module xử lý các chức năng liên quan đến nghiên cứu
        GeneFamilyModule, // Module xử lý các chức năng liên quan đến họ gene
        PanGeneSetModule, // Module xử lý các chức năng liên quan đến tập hợp pan-gene
        StrainModule, // Module xử lý các chức năng liên quan đến chủng (strain)
        SpeciesModule, // Module xử lý các chức năng liên quan đến loài (species)
        DscensorModule, // Module xử lý các chức năng liên quan đến dscensor (có thể liên quan đến kiểm duyệt hoặc xử lý dữ liệu)
    ],
    // Định nghĩa các controller xử lý yêu cầu HTTP
    controllers: [AppController], // AppController xử lý các endpoint chính của ứng dụng
    // Định nghĩa các provider (dịch vụ) cung cấp logic nghiệp vụ
    providers: [AppService], // AppService chứa logic nghiệp vụ cho AppController
})
// Xuất class AppModule để sử dụng trong file bootstrap (main.ts)
export class AppModule { }