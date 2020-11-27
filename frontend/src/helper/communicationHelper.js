
import { HTTP_GET, HTTP_POST, HTTP_PUT, HTTP_DELETE } from '../constants/httpConstants';
import $ from 'jquery';

function sendRequest(type, route, data) {
    let formData = null;
    if(data) {
        if(data instanceof HTMLFormElement) formData = new FormData(data);
        else {
            formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            })
        }
    }

    if(formData) {
        for(let value of formData.values()) {
            console.log(value);
        }
    }

    return $.ajax({
        url: "http://localhost:8080/" + route,
        data: formData,
        type,
        processData: false,
        contentType: false,
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
                url: "http://localhost:8080/" + paramRoute,
                type: type,
                xhrFields: {
                    withCredentials: true,
                },
            });
    }
}
