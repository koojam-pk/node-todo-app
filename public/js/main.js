$(document).ready(() => {
    $('.delete-todo').on('click', (event) => {
        $target = $(event.target);
        const id = $target.attr('data-id');
        
        $.ajax({
            type: 'DELETE',
            url: '/todo/delete/' + id,
            success: (response) => {
                alert('Deleting Todo');
                window.location.href = '/';
            },
            error: (error) => {
                console.log(error);
            }
        });
    });
});