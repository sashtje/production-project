let currentArticleId: string;

describe('article details testing', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`articles/${currentArticleId}`);
    });
  });

  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });

  it('should see a content of the article', () => {
    cy.getByTestId('ArticleDetailsDeprecated.title').should('exist');
  });

  it('should see a list of recommendations', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });

  it('leaves a comment', () => {
    cy.getByTestId('ArticleDetailsDeprecated.title');
    cy.getByTestId('AddCommentForm').scrollIntoView();

    cy.addComment('text');

    cy.getByTestId('CommentItem.Content').should('exist');
    cy.getByTestId('CommentItem.Content').should('have.length', 1);
  });

  it('leaves a rate', () => {
    // cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
    cy.getByTestId('ArticleDetailsDeprecated.title');
    cy.getByTestId('RatingCard').scrollIntoView();

    cy.setRate(5, 'feedback');

    cy.get('[data-selected="true"]').should('have.length', 5);
  });
});
