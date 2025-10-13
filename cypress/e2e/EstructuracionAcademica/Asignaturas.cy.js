import AsignaturasFlows from '../../flows/EstructuracionAcademica/AsignaturasFlows.js'
import DatosAsignaturas from '../../fixtures/EstructuracionAcademica/Asignaturas.json'

const { base, editar } = DatosAsignaturas.asignaturas;

describe('Gestión estructuración académica', () => {

    // Se elimina este login ya que desde el cloud presenta problemas con el .json por lo que se debe investigar el porque
    //beforeEach(() => cy.login('ordenesPago', 0))
    beforeEach(() => cy.loginGlobalUser('ordenesPago', 0))

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