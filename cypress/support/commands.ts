import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as articleCommands from './commands/article';
import * as commentsCommands from './commands/comments';
import * as ratingCommands from './commands/rating';

Cypress.Commands.addAll({
  ...commonCommands,
  ...profileCommands,
  ...articleCommands,
  ...commentsCommands,
  ...ratingCommands,
});
// Cypress.Commands.overwrite('intercept', () => {
//   const { FIXTURE_MODE } = process.env;
//
//   if (FIXTURE_MODE === 'READ') {
//     // read fixtures from existed files
//   } else if (FIXTURE_MODE === 'WRITE') {
//     // generate fixture from query in cy.intercept
//   }
// });
