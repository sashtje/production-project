export const updateProfile = (newFirstname: string, newLastname: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  cy.getByTestId('ProfileCard.firstname').clear().type(newFirstname);
  cy.getByTestId('ProfileCard.lastname').clear().type(newLastname);
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

const testProfile = {
  id: '4',
  first: 'Sara',
  lastname: 'Doe',
  age: 41,
  currency: 'USD',
  country: 'Armenia',
  city: 'New York',
  username: 'testuser',
  avatar:
    // eslint-disable-next-line max-len
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqNiwgTLa4GOFNV2CXioYgjaEEt4K6sd-_BkWgvANyjxNQ_aEcjstLSmmBUWN2W1ODFLU&usqp=CAU',
};

export const resetProfile = (profileId: string) =>
  cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'dkkkjdj' },
    body: testProfile,
  });

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(newFirstname: string, newLastname: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
