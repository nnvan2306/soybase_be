import { ISendResponseToClient } from '../utils/interface';

// Hàm này để trả các thông tin về response cho client
export const sendResponse = <T>(args: ISendResponseToClient<T>): ISendResponseToClient<T> => {
    return {
        statusCode: args.statusCode,
        data: args.data,
        message: args.message,
    };
};
