import { HttpStatus } from '@nestjs/common';

// Kiểu dữ liệu 
export interface ISendResponseToClient<T> {
    statusCode: HttpStatus;
    message: string;
    data: T;
}
