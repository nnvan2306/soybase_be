import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// Hàm bootstrap khởi động ứng dụng NestJS
async function bootstrap() {
    // Tạo instance ứng dụng NestJS từ AppModule
    const app = await NestFactory.create(AppModule);

    // Thiết lập tiền tố toàn cục '/api/v1' cho tất cả các route
    app.setGlobalPrefix('/api/v1');

    // Cấu hình tài liệu Swagger cho API
    const config = new DocumentBuilder()
        .setTitle('Doc API rice') // Tiêu đề tài liệu API
        .setDescription('rice api docs') // Mô tả tài liệu API
        .setVersion('1.0') // Phiên bản API
        .addTag('V1') // Thêm tag cho API
        .build();

    // Tạo tài liệu Swagger từ cấu hình
    const documentFactory = () => SwaggerModule.createDocument(app, config);

    // Thiết lập endpoint '/api/doc/v1' cho giao diện Swagger UI
    SwaggerModule.setup('/api/doc/v1', app, documentFactory);

    // Kích hoạt CORS để cho phép yêu cầu từ mọi nguồn
    app.enableCors({
        origin: '*', // Cho phép tất cả các origin
        credentials: true, // Hỗ trợ gửi cookie/credentials
    });

    // Áp dụng ValidationPipe toàn cục để xác thực dữ liệu đầu vào
    app.useGlobalPipes(new ValidationPipe());

    // Khởi động server và lắng nghe trên cổng 8080
    await app.listen(8080);
}

// Gọi hàm bootstrap để khởi động ứng dụng
void bootstrap();