export default class Navbar {

    static pulsarLogo() {

    }

    static buscarUsuario(nombreUsuario) {
        cy.get('.navbar-form input[placeholder="Buscar personas..."]').type(nombreUsuario, {delay: 20});
        cy.get('.tt-open div.tt-selectable').contains(nombreUsuario).click()
    }

    static irASeccion(nombreMenu, nombreOpcion) {
        cy.visit('/');
        cy.get('.navbar-nav .dropdown').contains(nombreMenu).click();
        cy.get('.dropdown-wrapper').filter(':visible').find('a').contains(nombreOpcion).click();
    }

    static irASubseccion(nombreMenu, nombreOpcion, nombreSubOpcion) {
        cy.visit('/');
        cy.get('.navbar-nav .dropdown').contains(nombreMenu).click();
        cy.get('.dropdown-wrapper').filter(':visible').find('a').contains(nombreOpcion).within((opcion) => {
            cy.wrap(opcion).realHover()
            cy.get('dropdown-menu a').contains(nombreSubOpcion).click();
        })
    }

}