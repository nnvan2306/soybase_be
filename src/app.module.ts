import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { StudyModule } from './modules/study/study.module';
import { SpeciesModule } from './modules/species/species.module';
import { GeneModule } from './modules/gene/gene.module';
import { PostModule } from './modules/post/post.module';
import { GeneFamilyModule } from './modules/gene_family/gene_family.module';
import { PanGeneSetModule } from './modules/pan_gene_set/pan_gene_set.module';
import { StrainModule } from './modules/strain/strain.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot('mongodb://localhost:27017/rice'),
        PostModule,
        GeneModule,
        SpeciesModule,
        StudyModule,
        GeneFamilyModule,
        PanGeneSetModule,
        StrainModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
