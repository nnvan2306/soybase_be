import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
        origin: 'http://localhost:5173',
        credentials: true,
    });
    SwaggerModule.setup('/api/doc/v1', app, documentFactory);
    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(8080);
}
bootstrap();
