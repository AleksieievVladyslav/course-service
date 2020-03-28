const errorHandle = (xhr, ajaxOptions, thrownError) => {
    toggleLoader();
    $('#statusCode').text(xhr.status);
    $('#message').text(JSON.parse(xhr.responseText).message);
    $('.error').addClass('active');
}
const beforeSendHandle = () => {
    toggleLoader();
    console.log('Sending');
}
const successHandle = (data) => {
    toggleLoader();
    console.log('Done!');
    console.log(data);
}
const toggleLoader = () => {
    $('#loader').toggleClass('hidden');
    $('#form').toggleClass('hidden');
}

$(document).ready(() => {
    $('.submit').click(() => {
        const name = $('#username').val();
        const pass = $('#password').val();
        const _pass = $('#_password').val();

        $.ajax({
            url: '/signup',
            type: 'POST',
            data: {name: name, pass: pass, _pass: _pass},
            dataType: 'html',
            beforeSend: beforeSendHandle,
            success: successHandle,
            error: errorHandle
        })
    })
    $('#form input').keyup(() => {
        $('.error').removeClass('active');
    })
})