let profileId: string;

describe('profile page testing', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`profile/${data.id}`);
    });
  });

  afterEach(() => {
    cy.resetProfile(profileId);
  });

  it('should boot successfully', () => {
    cy.getByTestId('ProfileCard.firstname').should('have.value', 'Sara');
  });

  it('should edit profile', () => {
    const newFirstname = 'new firstname';
    const newLastname = 'new lastname';

    cy.updateProfile(newFirstname, newLastname);
    cy.getByTestId('ProfileCard.firstname').should('have.value', newFirstname);
    cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname);
  });
});
