$(document).ready(function () {
    $('#toDashBoard').css({ background: '#fcba03' })
    $('#toAboutUs').click(function () {
        $('#toAboutUs').css({ background: '#fcba03', color: 'white' })
        $('#aboutUs').fadeIn();
        $('#DashBoard').fadeOut();
        $('#toDashBoard').css({ background: 'none' })
    });

    $('#toDashBoard').click(function () {
        $('#toDashBoard').css({ background: '#fcba03', color: 'white' })
        $('#aboutUs').fadeOut();
        $('#DashBoard').fadeIn();
        $('#toAboutUs').css({ background: 'none' })
    })
});