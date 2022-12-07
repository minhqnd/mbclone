var idGD = Math.floor(100000 + Math.random() * 900000)

$('.idGD').text(idGD)

function startInput() {
    $('#input').select()
}

var ok = false

$('#input').on('keyup', function () {
    check(this.value)
    if (this.value == 120506) {
        $('.getOTP').addClass('clickable')
        ok = true
    } else {
        $('.getOTP').removeClass('clickable')
        ok = false
    }
});

function check(len) {
    $('.dot').removeClass('doted')
    for (let i = 0; i <= len.length; i++) {
        $('.dot').eq(i).addClass('doted')
    }
}

function getOTP() {
    if (ok) {
        window.open("/enterOTP", "_self");
    }
}


