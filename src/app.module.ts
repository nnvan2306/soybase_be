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
import { StrainModule } from './modules/strain/strain.module';
import { StudyModule } from './modules/study/study.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot('mongodb://localhost:27017/rice'),
        PostModule,
        GeneModule,
        StudyModule,
        GeneFamilyModule,
        PanGeneSetModule,
        StrainModule,
        DscensorModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
