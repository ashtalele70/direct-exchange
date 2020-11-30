
import { GET_MY_OFFERS, HTTP_GET } from '../../constants/httpConstants';
import { constructHttpRequest } from '../../helper/communicationHelper';

export const getMyOffers = async (data) => {
    const response = await constructHttpRequest(HTTP_GET, GET_MY_OFFERS, data);
    return response;
}