function formatDate(inputDateString) {
    const date = new Date(inputDateString);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
}

function showDeleteModel(id){
    console.log(id);
    let button = document.querySelector('#deleteModal form');
    button.setAttribute('action',`/article/${id}/delete`);
}