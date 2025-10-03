import ProductosPage from '../../pages/EstructuracionFinanciera/ProductosPage.js'

describe('Gestión estructuración financiera', () =>{

    beforeEach(() => cy.loginGlobalUser('ordenesPago', 0))

    it ('Crear productos', () => {
        ProductosPage.abrirModalCrearProducto().should('be.visible')

        ProductosPage.completarCampo('#Producto_prod_codigoP', 'COD1').should('have.value', 'COD1')
        ProductosPage.completarCampo('#Producto_prod_nombre', 'nombre producto').should('have.value', 'nombre producto')
        ProductosPage.completarCampo('#Producto_prod_valor_neto_currencytxt', '100.000').should('contain.value', '100.000')
    })
})