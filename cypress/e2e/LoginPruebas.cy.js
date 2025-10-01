/// <reference types="cypress" />

describe('Pruebas login', () =>{

    // Inicio de sesion usando el fixture con la institución y los usuarios de esta
    beforeEach(() => cy.login('ordenesPago', 0))

    // Inicio de sesión usando el objeto guardado de manera global (como variable de entorno) en el cypress.config
    beforeEach(() => cy.loginGlobalUser('ordenesPago', 1))
    

    it('Login prueba', () =>{
        cy.wait(10000)
    })

})