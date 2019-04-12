let articleLink = document.getElementById('article-link');

articleLink.addEventListener('click', setHREF);

function setHREF() {
    let link = document.getElementById('title').innerText.replace(' ', '-') ;
    console.log(link);
    articleLink.setAttribute('href', `/blog-article/${link}`);
}