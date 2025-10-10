import AsignaturasFlows from '../../flows/EstructuracionAcademica/AsignaturasFlows.js'
import DatosAsignaturas from '../../fixtures/EstructuracionAcademica/Asignaturas.json'

const { base, editar } = DatosAsignaturas.asignaturas;

describe('Gestión estructuración académica', () => {

    beforeEach(() => cy.login('ordenesPago', 0))

    it('Crear asignatura', () => {
        AsignaturasFlows.crearAsignatura(base.codigo, base.nombre, base.abreviacion);
    })

    it('Editar asignatura', () => {
        AsignaturasFlows.editarAsignatura(base.codigo, editar.nombre, editar.abreviacion);
    })

    it('Eliminar asignatura', () => {
        AsignaturasFlows.eliminarAsignatura(editar.nombre);
    })

})