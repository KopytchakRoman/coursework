describe('Авторизація (Real DB)', () => {
  const randomId = Date.now();
  const testUser = {
    name: `User_${randomId}`,
    email: `test_${randomId}@example.com`,
    password: 'password123',
  };

  it('Повний цикл: Реєстрація -> Перевірка входу -> Вихід', () => {
    cy.visit('/auth');

    cy.contains('button', 'Реєстрація').click();

    cy.get('input[type="email"]').type(testUser.email);
    cy.get('input[id="name"]').type(testUser.name);
    cy.get('input[id="password"]').type(testUser.password);
    cy.get('input[id="confirmPassword"]').type(testUser.password);

    cy.contains('button', 'Зареєструватись').click();

    cy.url().should('eq', 'http://localhost:5173/');

    cy.contains(`Вітаємо, ${testUser.name}!`).should('be.visible');

    cy.contains('button', 'Вихід').click();

    cy.contains('Вхід/Реєстрація').should('be.visible');
  });

  it('Вхід існуючим користувачем (з помилкою)', () => {
    cy.visit('/auth');
    cy.contains('button', 'Вхід').click();

    cy.get('#email').type('kdjfhskdfjh@mail.com');
    cy.get('#password').type('wrongpass');

    cy.contains('button', 'Увійти').click();

    cy.contains(/Invalid|Неправильний/i).should('be.visible');
  });
});
