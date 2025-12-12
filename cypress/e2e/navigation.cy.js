describe('Навігація по сайту (E2E Real)', () => {
  const baseUrl = Cypress.config('baseUrl');

  beforeEach(() => {
    cy.visit('/');
  });

  it('успішно завантажує головну сторінку', () => {
    cy.url().should('eq', `${baseUrl}/`);

    cy.contains('ЗНАЙДИ САМЕ ТЕ').should('be.visible');
    cy.contains('НОВИНКИ').should('be.visible');
  });

  it('переходить на сторінку "Бренди"', () => {
    cy.get('nav').contains('Бренди').click();

    cy.url().should('include', '/brands');

    cy.contains('БРЕНДИ').should('be.visible');
    cy.contains('Популярні бренди').should('be.visible');
  });

  it('переходить на сторінку "Про нас"', () => {
    cy.get('nav').contains('Про нас').click();

    cy.url().should('include', '/about');

    cy.contains('Про нас').should('be.visible');
    cy.contains('Наша Філософія').should('be.visible');
  });

  it('переходить на сторінку Авторизації (кнопка Вхід)', () => {
    cy.get('nav')
      .contains(/Вхід|Реєстрація/i)
      .click();

    cy.url().should('include', '/auth');

    cy.contains('button', 'Реєстрація').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
  });

  it('клік на логотип повертає на головну', () => {
    cy.visit('/brands');

    cy.contains('a', 'Perfumer').click();

    cy.url().should('eq', `${baseUrl}/`);
    cy.contains('ЗНАЙДИ САМЕ ТЕ').should('be.visible');
  });
});
