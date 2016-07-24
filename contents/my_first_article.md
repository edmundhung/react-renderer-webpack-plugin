---
title: My First Article
---

### Hello World!

I am Edmund, a javascript developer from Hong Kong.
On this first post, I will explain how `react-static` works to build this blog.

#### React Static Website Generator

```javascript
import React                                               from 'react';
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router'
import ReactStatic                                         from 'react-static';

function Layout (props) {
  const { children } = props;

  return (
    <div>
      <header>
        <h1>My Blog</h1>
      </header>
      <main>{ children }</main>
      <footer>
        Copyright 2016
      </footer>
    </div>
  );
}

function ArticleListing (props) {
  const { articles } = props;

  return (
    <ul>
      { articles.map(article => (
        <li key={ article.path }>
          <Link to={ `/article/${article.path}` }>{ article.title }</Link>
        </li>
      )) }
    </ul>
  );
}

function selectAllArticles (Spec) {
  return ReactStatic.select('article', articles => ({ articles }));
}

function Article (props) {
  const { article } = props;

  return (
    <section>
      <h2>{ article.title }</h2>
      <article dangerouslySetInnerHTML={{ __html: article.body }} />
    </section>
  );
}

function selectArticleDetail (Spec) {
  return ReactStatic.select('article', (articles, ownProps) => ({
    article: articles[ownProps.params.article]
  }));
}

function NotFound (props) {
  return (
    <div>404 Not Found</div>
  );
}

const App = (
  <Router history={ browserHistory }>
    <Route path="/" component={ Layout }>
      <IndexRoute component={ selectAllArticles(ArticleListing) }/>
      <Route path="article/:article" component={ selectArticleDetail(Article) }/>
      <Route path="*" component={ NotFound }/>
    </Route>
  </Router>
);

const options = {
  routes:   ['/', '/articles/:article', '*'],
  contents: path.resolve(__dirname, 'contents'),
  output:   path.resolve(__dirname, 'dist')
};

ReactStatic.render(App, options);
```
