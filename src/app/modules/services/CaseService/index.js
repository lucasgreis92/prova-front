const CaseService = {

    findAll: () => {
        return fetch('repositorycase')
        .then(res => CaseService.treatError(res))
        .then(res => res.json());
    },
    findById: (id) => {
        return fetch(`repositorycase/${id}`)
        .then(res => CaseService.treatError(res))
        .then(res => res.json());
    },
    put: (id, body) => {
        return fetch(`repositorycase/${id}`, {
             method: 'PUT',
             headers: { 'Content-Type': 'application/json' },
             body: body
         })
        .then(res => CaseService.treatError(res))
        .then(res => res.json());
    },
    post: (body) => {
        return fetch(`repositorycase`, {
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
