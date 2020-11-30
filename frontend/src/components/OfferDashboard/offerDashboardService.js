
import { GET_ALL_OFFERS, HTTP_GET } from '../../constants/httpConstants';
import { constructHttpRequest } from '../../helper/communicationHelper';

export const getAllOffers = async (data) => {
    const response = await constructHttpRequest(HTTP_GET, GET_ALL_OFFERS, data);
    return response;
}