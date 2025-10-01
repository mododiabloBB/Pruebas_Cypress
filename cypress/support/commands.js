// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (institucionKey, tipoUsuario) => {
    cy.fixture('Login/instituciones').then((instituciones) => {
        const institucion = instituciones[institucionKey];
        const { aplentId, usuarios } = institucion;
        const { usuario, contrasenia } = usuarios.find(u => u.rol === tipoUsuario);
        const loginUrl = `login?ReturnUrl=%2F&aplentId=${aplentId}`;

        cy.session(`sesion ${institucionKey} - usuario ${tipoUsuario}`, () => {
            cy.visit(loginUrl)
            cy.get('#NombreUsuario').clear().type(usuario);
            cy.get('#Contrasena').clear().type(contrasenia);
            cy.intercept('GET', 'https://site2.q10.com/').as('InicioSesion');
            cy.get('#submit-btn').click();
            cy.wait('@InicioSesion');
        }, {
            validate: () => {
                cy.getCookie('.AspNet.ApplicationCookie').should('exist');
            }
        })
        cy.visit(loginUrl);
    })
})

Cypress.Commands.add('loginGlobalUser', (institucionKey, tipoUsuario) => {
    const institucion = Cypress.env('instituciones')[institucionKey];
    const { aplentId, usuarios } = institucion;
    const { usuario, contrasenia } = usuarios.find(u => u.rol === tipoUsuario);
    const loginUrl = `login?ReturnUrl=%2F&aplentId=${aplentId}`;

    cy.session(`sesion ${institucionKey} - usuario ${tipoUsuario}`, () => {
        cy.visit(loginUrl)
        cy.get('#NombreUsuario').clear().type(usuario);
        cy.get('#Contrasena').clear().type(contrasenia);
        cy.intercept('GET', 'https://site2.q10.com/').as('InicioSesion');
        cy.get('#submit-btn').click();
        cy.wait('@InicioSesion');
    }, {
        validate: () => {
            cy.getCookie('.AspNet.ApplicationCookie').should('exist');
        }
    })
    cy.visit(loginUrl);
})