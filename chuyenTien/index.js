var data = JSON.stringify({
    "bin": "970422",
    "accountNumber": "6812052006"
});

var config = {
    method: 'post',
    url: 'https://api.vietqr.io/v2/lookup',
    headers: {
        'x-client-id': 'demo-dd58bc3f-7544-4d22-b8d6-ed77b03242baa',
        'x-api-key': 'demo-f5e14830-cab4-4d3a-93c7-926f937d5376a',
        'Content-Type': 'application/json',
    },
    data: data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });