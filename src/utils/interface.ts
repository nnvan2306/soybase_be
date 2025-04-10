import { HttpStatus } from '@nestjs/common';

export interface ISendResponseToClient<T> {
    statusCode: HttpStatus;
    message: string;
    data: T;
}
