describe('articles list testing', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit('articles');
    });
  });

  it('should render articles list', () => {
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });
});
