import { Article, ArticleType } from '../../../src/entities/Article/testing';

const defaultArticle = {
  title: 'Testing Article',
  subtitle: 'Что нового за 2023 год',
  img: 'https://i.pinimg.com/1200x/f9/7d/fb/f97dfbb7643bfdb4a654c286fd6bbfad.jpg',
  views: 300,
  createdAt: '03.10.2023',
  userId: '4',
  type: [
    ArticleType.IT,
  ],
  blocks: [],
};

type NewArticle = Omit<Article, 'id' | 'user'>;

export const createArticle = (article: NewArticle = defaultArticle) => cy.request({
  method: 'POST',
  url: 'http://localhost:8000/articles',
  headers: { Authorization: 'dkkkjdj' },
  body: article,
}).then(({ body }) => body);

export const removeArticle = (articleId: string) => cy.request({
  method: 'DELETE',
  url: `http://localhost:8000/articles/${articleId}`,
  headers: { Authorization: 'dkkkjdj' },
});

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: NewArticle): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}
