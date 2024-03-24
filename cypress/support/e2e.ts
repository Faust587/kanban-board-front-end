import "cypress-react-selector";
import "./utils";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command get node by test ID.
       * @example cy.getByTestId('test_id')
       */
      getByTestId<E extends Node = HTMLElement>(
        testId: string,
      ): Chainable<JQuery<E>>;
    }
  }
}
