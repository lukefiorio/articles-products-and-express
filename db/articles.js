const articleCollection = {
  articles: [],
  message: '',
  returnPage: '',
};

function create(obj) {
  const hasKeys = obj.title && obj.body && obj.author;

  if (hasKeys) {
    obj.urlTitle = encodeURI(obj.title);
    articleCollection.articles.push(obj);
    articleCollection.message = '{ "success": true}';
    return articleCollection;
  } else {
    articleCollection.message = '{ "success": false}';
    return articleCollection;
  }
}

function retrieveAll() {
  return articleCollection;
}

function retrieveOne(articleTitle) {
  // check that article is in collection.
  const articleIndex = articleCollection.articles.findIndex((elem) => elem.urlTitle === articleTitle);
  if (articleIndex === -1) {
    articleCollection.message = '{ "success": false, "message": "Article not found" }';
    articleCollection.returnPage = 'index';
    return articleCollection;
  }

  const articleToRetrieve = {
    title: articleCollection.articles[articleIndex].title,
    body: articleCollection.articles[articleIndex].body,
    author: articleCollection.articles[articleIndex].author,
    urlTitle: articleCollection.articles[articleIndex].urlTitle,
    returnPage: 'article',
  };

  return articleToRetrieve;
}

function update(obj, articleTitle) {
  // check that article is in collection.
  const articleIndex = articleCollection.articles.findIndex((elem) => elem.urlTitle === articleTitle);
  if (articleIndex === -1) {
    articleCollection.message = '{ "success": false, "message": "Article not found" }';
    return articleCollection;
  }

  let msg = '';
  const hasKeys = obj.title || obj.body || obj.author;
  // check that at least one article property is provided
  if (!hasKeys) {
    msg = '{ "success": false, "message": "No field values were provided" }';
  } else {
    // apply modified values
    if (obj.title) {
      articleCollection.articles[articleIndex].title = obj.title;
      articleCollection.articles[articleIndex].urlTitle = encodeURI(obj.title);
    }
    if (obj.body) {
      articleCollection.articles[articleIndex].body = obj.body;
    }
    if (obj.author) {
      articleCollection.articles[articleIndex].author = obj.author;
    }
    msg = '{ "success": true }';
  }

  // apply values individually so they don't map back to original object
  const articleToModify = {
    title: articleCollection.articles[articleIndex].title,
    body: articleCollection.articles[articleIndex].body,
    author: articleCollection.articles[articleIndex].author,
    urlTitle: articleCollection.articles[articleIndex].urlTitle,
    message: msg,
  };
  return articleToModify;
}

function remove(articleTitle) {
  // check that article is in collection.
  const articleIndex = articleCollection.articles.findIndex((elem) => elem.urlTitle === articleTitle);
  if (articleIndex === -1) {
    articleCollection.message = '{ "success": false, "message": "Article not found" }';
    return articleCollection;
  }

  articleCollection.articles.splice(articleIndex, 1);
  articleCollection.message = '{ "success": true}';
  return articleCollection;
}

function emptyMessage() {
  return (articleCollection.message = '');
}

module.exports = {
  create,
  retrieveAll,
  retrieveOne,
  update,
  remove,
  emptyMessage,
};
