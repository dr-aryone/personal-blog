let articleLink = document.querySelectorAll('.article-link');
let articleTitle = document.querySelectorAll('.title')

window.addEventListener('load', setHREF);

let titleList = [];

function setHREF() {
    articleTitle.forEach((title) => {
        titleList.push(title.innerText.split(' ').join('-'));
    })

    console.log(titleList);

    for(var i=0; i< titleList.length; i++) {
        let link = titleList[i];
        articleLink[i].setAttribute('href', `/blogs/${link}`)
    }
}