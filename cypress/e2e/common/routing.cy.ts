import { selectByTestId } from '../../helpers/selectByTestId';

describe('routing.cy', () => {
  describe('User is NOT authorized', () => {
    it('goes to Main Page', () => {
      cy.visit('/');
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    it('opens Profile Page (not successful)', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    it('opens not existing route', () => {
      cy.visit('/iamnotexist');
      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });

  describe('User is authorized', () => {
    beforeEach(() => {
      cy.login();
    });

    it('opens Profile Page', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('ProfilePage')).should('exist');
    });

    it('opens Articles Page', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('ArticlesPage')).should('exist');
    });
  });
});
