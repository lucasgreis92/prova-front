const CaseService = {

    findAll: () => {
        return fetch('rs/v1/case')
        .then(res => CaseService.treatError(res))
        .then(res => res.json());
    },
    findById: (id) => {
        return fetch(`rs/v1/case/${id}`)
        .then(res => CaseService.treatError(res))
        .then(res => res.json());
    },
    put: (id, body) => {
        return fetch(`rs/v1/case/${id}`, {
             method: 'PUT',
             headers: { 'Content-Type': 'application/json' },
             body: body
         })
        .then(res => CaseService.treatError(res))
        .then(res => res.json());
    },
    post: (body) => {
        return fetch(`rs/v1/case`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        })
        .then(res => CaseService.treatError(res))
        .then(res => res.json());
    },
    treatError : res => {
        console.log(res);
        if(!res.ok) {
            throw Error(res.responseText);
        }
        return res;
    }

}
export default CaseService;
