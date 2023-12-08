const Backlog = '[data-testid="board-list:backlog"]';
const TimeField = 'input[placeholder="Number"]';
const Stopwatch = '[data-testid="icon:stopwatch"]';
const Timetracking = '[data-testid="modal:tracking"]';

describe('Time-tracking functionality tests of the issue', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');

            cy.get('[data-testid="modal:issue-create"]').within(() => {
                    cy.get('[data-testid="select:type"]').click();
                    cy.get('[data-testid="select-option:Bug"]').click();
                    cy.get(".ql-editor").type('Testing time');
                    cy.get('input[name="title"]').type('Time testing ticket');
                    cy.get('[data-testid="select:userIds"]').click();
                    cy.get('[data-testid="select-option:Lord Gaben"]').click();
                    cy.get('button[type="submit"]').click();
                });
                cy.get('[data-testid="modal:issue-create"]').should('not.exist');
                cy.contains('Issue has been successfully created.').should('be.visible');
                
                cy.reload();
                cy.get(Backlog).should('be.visible').contains('Time testing ticket').click();
        });
    });

const Firsttime = '7';
const Updatedtime = '10';
const TimeSpent = '8';
const TimeRem = '1';

it('Should add, update and remove estimated time', () => {
    
    //Add estimated time
    cy.contains('No time logged').should('be.visible');
    cy.get(TimeField).type(Firsttime);
    cy.get(TimeField).should('have.value', Firsttime);

    //Update estimated time
    cy.get(TimeField).clear().type(Updatedtime)
    cy.get(TimeField).should('have.value', Updatedtime);

    //Remove estimated time
    cy.get(TimeField).click().clear()
});

it('Should add and remove logged time', () => {
    
    //Add logged time
    cy.get(Stopwatch).click();
    cy.get(Timetracking).should('be.visible');
    cy.contains('div', 'Time spent (hours)').next('div').find('input').type(TimeSpent);
    cy.contains('div', 'Time remaining (hours)').next('div').find('input').type(TimeRem)
    cy.contains('button', 'Done').click();

    //Remove logged time
    cy.get(Stopwatch).click()
    cy.get(Timetracking).should('be.visible');
    cy.contains('div', 'Time spent (hours)').next('div').find('input').clear('');
    cy.contains('div', 'Time remaining (hours)').next('div').find('input').clear('');
    cy.contains('button', 'Done').click();

});
});