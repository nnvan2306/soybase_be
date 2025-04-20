import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api/v1');
    const config = new DocumentBuilder()
        .setTitle('Doc API rice')
        .setDescription('rice api docs')
        .setVersion('1.0')
        .addTag('V1')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    app.enableCors({
        origin: '*',
        credentials: true,
    });
    SwaggerModule.setup('/api/doc/v1', app, documentFactory);
    app.enableCors({
        origin: '*',
        credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(8080);
}
void bootstrap();
