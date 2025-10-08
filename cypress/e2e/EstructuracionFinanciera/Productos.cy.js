import ProductosFlows from '../../flows/EstructuracionFinanciera/ProductosFlows.js'
import DatosProducto from '../../fixtures/EstructuracionFinanciera/Productos.json'

const { base, editar, relaciones } = DatosProducto.producto;

describe('Gestión estructuración financiera', () => {

    beforeEach(() => cy.loginGlobalUser('ordenesPago', 0))

    it('Crear producto', {retries: 1}, () => {
        ProductosFlows.crearProducto(base.codigo, base.nombre, base.valor, base.impuesto);
    })

    it('Editar producto', () => {
        ProductosFlows.editarProducto(base.codigo, editar.nombre, editar.valor, editar.impuesto);
    })

    it('Eliminar', () => {
        ProductosFlows.eliminarProducto(editar.nombre);
    })
})