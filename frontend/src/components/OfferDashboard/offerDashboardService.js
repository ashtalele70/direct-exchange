
import { GET_ALL_OFFERS, GET_FILTERED_OFFERS, GET_ALL_TRANSACTIONS, HTTP_GET } from '../../constants/httpConstants';
import { constructHttpRequest } from '../../helper/communicationHelper';

export const getAllOffers = async (data) => {
    const response = await constructHttpRequest(HTTP_GET, GET_ALL_OFFERS, data);
    return response;
}

export const getFilteredOffers = async (data) => {
    const response = await constructHttpRequest(HTTP_GET, GET_FILTERED_OFFERS, data);
    return response;
}

export const getAllTransactions = async (data) => {
    const response = await constructHttpRequest(HTTP_GET, GET_ALL_TRANSACTIONS, data);
    return response;
}