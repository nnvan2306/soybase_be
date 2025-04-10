import { ISendResponseToClient } from '../utils/interface';

export const sendResponse = <T>(args: ISendResponseToClient<T>): ISendResponseToClient<T> => {
    return {
        statusCode: args.statusCode,
        data: args.data,
        message: args.message,
    };
};
