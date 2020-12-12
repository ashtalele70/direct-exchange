
import { GET_ALL_TRANSACTIONS, GET_ACCEPTED_OFFERS, POST_TRANSACTION, HTTP_GET, HTTP_POST } from '../../constants/httpConstants';
import { constructHttpRequest } from '../../helper/communicationHelper';

export const getAllTransactions = async (data) => {
    const response = await constructHttpRequest(HTTP_GET, GET_ALL_TRANSACTIONS, data);
    return response;
}

export const postTransaction = async (data) => {
    const response = await constructHttpRequest(HTTP_POST, POST_TRANSACTION, data);
    return response;
}

export const getAcceptedOffers = async (data) => {
    const response = await constructHttpRequest(HTTP_GET, GET_ACCEPTED_OFFERS, data);
    return response;
}