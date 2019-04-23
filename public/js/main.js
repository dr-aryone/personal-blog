let articleLink = document.querySelectorAll('.article-link');
let articleTitle = document.querySelectorAll('.title')
const deleteButton = document.querySelectorAll('.delete-button');
const confirmDeleteModal = document.querySelectorAll('.confirm-delete-modal');
const cancelDelete = document.querySelectorAll('.cancel-delete');

window.addEventListener('load', setHREF);

let titleList = [];

function setHREF() {
    articleTitle.forEach((title) => {
        titleList.push(title.innerText.split(' ').join('-'));
    })

    for(var i=0; i< titleList.length; i++) {
        let link = titleList[i];
        articleLink[i].setAttribute('href', `/blogs/${link}`)
    }
}


// display modal when delete button clicked on dashboard article 
for(var i =0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', showModal)
    
}


function showModal() {
    for(var i =0; i < deleteButton.length; i++) {
    confirmDeleteModal[i].style.display = "flex";
    }
}


// remove modal when cancel button clicked on dashboard article
for (var i = 0; i < cancelDelete.length; i++) {
cancelDelete[i].addEventListener('click', () => {
    for (var j = 0; j < confirmDeleteModal.length; j++) {
        confirmDeleteModal[j].style.display = 'none';
    }
})
}

