// retrieve the existing articles from the database - i think this needs to be passed in as middleware on page load
// this needs a lot of work 
module.exports = {

    
    getArticleQuery: function(name) {
        let query = Article.find({ author: name })
        return query
    },
    
    // want to move this to another file and import it in using require 
    articleBody = [''],
    articleTitle = [],
    articleAuthor = [],
    articleTime = [],
    query = getArticleQuery('Jack F'),
    executeQuery = query.exec(function (err, results) {
    if (err)
    return console.log(err);
    results.forEach(function (result) {
        
        articleTitle.push(result.title);
        articleBody.push(result.body);
        articleAuthor.push(result.author);
        articleTime.push(result.time);
    });
})

}