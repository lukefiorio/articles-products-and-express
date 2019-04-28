const articleCollection = {
  articles: [],
  message: '',
  showMessage: false,
};

function create(obj) {
  const hasKeys = obj.title && obj.body && obj.author;

  if (hasKeys) {
    obj.urlTitle = encodeURI(obj.title);
    articleCollection.articles.push(obj);
    articleCollection.message = '{ "success": true}';
    articleCollection.showMessage = true;
  } else {
    articleCollection.message = '{ "success": false}';
    articleCollection.showMessage = true;
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
    articleCollection.showMessage = true;
    return articleCollection;
  }

  return articleCollection.articles[articleIndex];
}

function update(obj, articleTitle) {
  // check that article is in collection.
  const articleIndex = articleCollection.articles.findIndex((elem) => elem.urlTitle === articleTitle);
  if (articleIndex === -1) {
    articleCollection.message = '{ "success": false, "message": "Article not found" }';
    articleCollection.showMessage = true;
    return;
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

  // apply these values to individual article to handle redirect route = '/article/:titleURL'
  articleCollection.articles[articleIndex].message = msg;
  articleCollection.articles[articleIndex].showMessage = true;

  // apply these values to colletion to handle redirect route = '/article'
  articleCollection.message = msg;
  articleCollection.showMessage = true;
}

function remove(articleTitle) {
  // check that article is in collection.
  const articleIndex = articleCollection.articles.findIndex((elem) => elem.urlTitle === articleTitle);
  if (articleIndex === -1) {
    articleCollection.message = '{ "success": false, "message": "Article not found" }';
    articleCollection.showMessage = true;
    return;
  }

  articleCollection.articles.splice(articleIndex, 1);
  articleCollection.message = '{ "success": true}';
  articleCollection.showMessage = true;
}

function removeMessage(articleTitle = '') {
  articleCollection.showMessage = false;
  const index = articleCollection.articles.findIndex((elem) => elem.urlTitle === articleTitle);
  if (articleTitle !== '' && index > -1) {
    articleCollection.articles[index].showMessage = false;
  }
}

function getMessage(articleTitle = '') {
  const index = articleCollection.articles.findIndex((elem) => elem.urlTitle === articleTitle);
  if (articleTitle !== '' && index > -1) {
    return articleCollection.articles[index].message;
  }
  return articleCollection.message;
}

function getIndex(articleTitle) {
  const index = articleCollection.articles.findIndex((elem) => elem.urlTitle === articleTitle);
  if (index === -1) {
    articleCollection.message = '{ "success": false, "message": "Article not found" }';
    articleCollection.showMessage = true;
  }

  return index;
}

module.exports = {
  create,
  retrieveAll,
  retrieveOne,
  update,
  remove,
  removeMessage,
  getMessage,
  getIndex,
};
