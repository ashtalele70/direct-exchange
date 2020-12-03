
import { HTTP_GET, HTTP_POST, HTTP_PUT, HTTP_DELETE } from '../constants/httpConstants';
import $ from 'jquery';

function sendRequest(type, route, data) {

    return $.ajax({
        url: process.env.REACT_APP_ROOT_URL + route,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        type,
        processData: false,
        //contentType: false,
        xhrFields: {
            withCredentials: true
        },
    });
}

export function constructHttpRequest(type, route, data = null) {
    switch(type) {
        case HTTP_POST: return sendRequest(type, route, data);
        case HTTP_PUT: return sendRequest(type, route, data);
        case HTTP_DELETE: return sendRequest(type, route, data);
        case HTTP_GET: 
            let paramRoute = route;
            if (data) {
                paramRoute += "?";
                Object.entries(data).forEach(([key, value]) => {
                    if (key && value) paramRoute += `&${key}=${value}`;
                });
            }
            return $.ajax({
                url: process.env.REACT_APP_ROOT_URL + paramRoute,
                type: type,
                xhrFields: {
                    withCredentials: true,
                },
            });
    }
}
