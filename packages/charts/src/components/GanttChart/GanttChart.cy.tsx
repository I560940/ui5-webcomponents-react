import { GanttChart } from '../../index.js';
import { dummyDataSet } from './examples/Dataset.js';

describe('GanttChart', () => {
  it('renders GanttChart with dataset', () => {
    cy.mount(<GanttChart dataset={dummyDataSet} totalDuration={150} data-testid="tlc" />);
    cy.findByTestId('tlc').should('be.visible').should('have.prop', 'tagName').should('eq', 'DIV');
  });
});
