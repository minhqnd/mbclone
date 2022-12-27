const defaultApiKey = 'demo-f5e14830-cab4-4d3a-93c7-926f937d5376a'
const defaultClientId = 'demo-dd58bc3f-7544-4d22-b8d6-ed77b03242baa'
loadXMLDoc()
init()


//dung input checkbox di cho nhanh

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                console.log(JSON.parse(xmlhttp.responseText))
                let data = JSON.parse(xmlhttp.responseText)
                document.getElementById("banks").innerHTML = data.data.map(item => {
                    console.log(item);
                    // let imageLogo = item.code .toUp
                    // return `<option value=${item.bin} data-thumbnail=${item.logo}>(${item.bin}) ${item.short_name}</option>`
    //                 return `<option value=${item.bin} data-code=${item.code}>
    // <img id="logo" src="../logoBanks/ic_bank_default.pn" onerror="this.onerror=null;this.src='../logoBanks/ic_bank_default.png'" alt="logo">
    //                 <div>[${item.code}] ${item.name}</option> </div>`
                    return `<input type="checkbox" data-code="${item.bin}" id="input${item.code}"/>
                            <label for= "input${item.code}"> <img style="height:30px" src="../logoBanks/${item.code.toLowerCase()}.png" onerror="this.onerror=null;this.src='../logoBanks/ic_bank_default.png'" alt="logo">${item.name} (${item.code})</label>
                            <br>`
                }).join('')
            } else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            } else {
                alert('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("GET", "https://dev.api.vietqr.io/v2/banks", true);
    xmlhttp.send();
}




function findAccountName(accountNumber, bankId) {
    // document.getElementById("container-loading").style.display = "flex"
    console.log(accountNumber, bankId);
    var xmlhttp = new XMLHttpRequest();
    let params = {
        accountNumber: accountNumber,
        bin: bankId
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                console.log(JSON.parse(xmlhttp.responseText))
                let data = JSON.parse(xmlhttp.responseText)
                if (data.code == "00") {
                    $('#result').text(data.data.accountName)
                    return data.data.accountName
                    // document.getElementById("container-loading").style.display = "none";
                    // document.getElementById("error").style.display = "none";
                    // document.getElementById("accountName").value = data.data.accountName;
                } else {
                    return `${data.code} - ${data.desc}`
                    document.getElementById("container-loading").style.display = "none";
                    document.getElementById("error").innerText = `${data.code} - ${data.desc}`;
                    document.getElementById("error").style.display = "block";
                    document.getElementById("accountName").value = '';
                }
            } else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            } else {
                alert('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("POST", "https://api.vietqr.io/v2/lookup", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");

    let identifyData = getCurrentLocalData()
    console.log(identifyData);
    xmlhttp.setRequestHeader("x-api-key", identifyData.apiKey);
    xmlhttp.setRequestHeader("x-client-id", identifyData.clientId);
    xmlhttp.send(JSON.stringify(params));
}

function init() {
    // let inputBankId = $('#banks input:checked').data('code')
    let inputAccountNumber = document.getElementById('accountNumber');
    inputAccountNumber.addEventListener('focusout', async function (e) {
        console.log('started...');
        let value = e.target.value
        if (value.length > 0) {
            // await setTimeout(() => {
            //     document.getElementById("container-loading").style.display = "block"
            // }, 1500)
            findAccountName(value, $('#banks input:checked').data('code'))
        }
    })
}

function getCurrentLocalData() {
    return {
        apiKey: defaultApiKey,
        clientId: defaultClientId
    }
} 