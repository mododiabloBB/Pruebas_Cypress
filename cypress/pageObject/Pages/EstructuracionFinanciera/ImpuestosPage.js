export default class ImpuestosPage {

    static inicio() {
        cy.visit('/Impuestos');
    }

    static abrirModalAgregarImpuesto() {
        cy.get('a[title="Crear impuesto"]').click();
        return cy.get('#form0');
    }

    static completarCampo(selector, texto) {
        return cy.get(selector).clear().type(texto, { delay: 20 });
    }

    static seleccionarOpcionSelect(dataIdSelect, opcion) {
        return cy.get(`select#${dataIdSelect}`).select(opcion, { force: true });
    }
}