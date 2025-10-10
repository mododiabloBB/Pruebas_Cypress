export default class AsignaturasPage {

    static inicio() {
        cy.visit('/Asignaturas');
    }

    static abrirModalCrearAsignatura() {
        cy.get('a[title="Crear asignatura"]').click();
        return cy.get('#form0');
    }

    static completarCampo(selector, texto) {
        return cy.get(selector).clear().type(texto, {delay: 20});
    }

    static seleccionarOpcionRadio() {
        
    }
}