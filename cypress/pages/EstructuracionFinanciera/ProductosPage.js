export default class ProductosPage {

    static inicio(){
        cy.visit('/Productos')
    }

    static abrirModalCrearProducto () {
        this.inicio()
        cy.get('a[title="Crear productos"]').click()
        return cy.get('#form0')
    }

    static completarCampo (selector, texto) {
        return cy.get(selector).type(texto)
    }
}