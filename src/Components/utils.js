const Fetch = async (url, method, body, headers) => {
    let response;
    const language = localStorage.getItem('language') || 'English';
    const defaultHeaders = {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        'Lang': language 
    };
    switch (method) {
        case 'GET':
            response = await fetch(url, {
                method,
                headers: {
                    ...headers,
                    ...defaultHeaders
                },
            });
            break;
        case 'POST':
            response = await fetch(url, {
                method,
                body: body,
                headers: {
                    ...headers,
                    ...defaultHeaders
                },
            });
            break;
        case 'PUT':
            response = await fetch(url, {
                method,
                body: body,
                headers: {
                    ...headers,
                    ...defaultHeaders
                },
            });
            break;
        case 'DELETE':
            response = await fetch(url, {
                method,
                body: body,
                headers: {
                    ...headers,
                    ...defaultHeaders
                },
            });
            console.log({
                    ...headers,
                    ...defaultHeaders
                },);
            break;
        default:
            response = await fetch(url, {
                method,
                body: body,
                headers: {
                    ...headers,
                    ...defaultHeaders
                },
            });
            break;
    }
    return await response.json();
}

export default Fetch;