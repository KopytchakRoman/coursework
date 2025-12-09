describe('Магазин (Real DB)', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('відображає товари з бази даних', () => {
    cy.get('img').should('have.length.greaterThan', 0);

    cy.contains('НОВИНКИ').should('be.visible');
  });

  it('працює пошук товарів', () => {
    cy.get('input[placeholder="Пошук..."]').type('a');

    cy.get('button[type="submit"]').click();

    cy.contains('Результати пошуку').should('be.visible');
  });

  it('перехід на сторінку детального опису', () => {
    cy.get('a[href^="/perfume/"]').first().click();

    cy.url().should('include', '/perfume/');

    cy.get('button').should('exist');
  });
});
