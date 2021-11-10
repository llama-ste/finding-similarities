
function readURL(input) {
    if(input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            $('#imageInput').hide()
            $('#preview').attr('src', event.target.result);
            $('#preview').show();
            $('#delete').show();
        }
        reader.readAsDataURL(input.files[0])
    }
}

$('#imageInput').change(function() {
    readURL(this)
})

$('#delete').on('click', () => {
    $('#preview').hide();
    $('#delete').hide();
    $('#imageInput').val('');
    $('#imageInput').show();
})

$('#replay').on('click', () => {
    $('#preview').hide();
    $('#delete').hide();
    $('#label-container').hide();
    $('#replay').hide();
    $('#imageInput').val('');
    $('#imageInput').show();
    $('.start-btn').show();
})
