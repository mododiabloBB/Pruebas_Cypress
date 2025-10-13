export default class ImpuestosApi {

    static obtenerTokenInstitucion() {
        const institucionKey = Cypress.env('institucionSesion');
        return Cypress.env('instituciones')[institucionKey].token;
    }

    static consumoApiImpuestos(estado) {
        return cy.request({
            method: 'GET',
            url: `https://site2.q10.com/api/impuestos/?api-version=1.0&Estado=${estado}`,
            headers: {
                Authorization: `Bearer ${this.obtenerTokenInstitucion()}`,
                Cookie: '.ASPXANONYMOUS=5eGHGdxzyjC1AQ1WQ-t82M_R3wU9XDIvPTt_O5kf4JLmiLXOFQq0vE8xy8OsL9gwEYg0djfB_PbBCDJfIhghWCez1wRQyiiO7hKeluehujraIUysdrOrDacD-_tJg93p7P8-Yg2; ARRAffinity=8b7fb4bc0827dd2af94d0522e4698f8bf220b1323250a660bfdb66609b24da2a; .ASPXANONYMOUS=2AE0eHxMml8u3tUlTNhzkgl0p6GHKX_RjhaP2Qlppe7WCiui_cgoRtFfaAcKBSAZrcyNDNSci3licphIQoNZoxhGm98gd4v1K01LN6BzJLk2umKNQUqrVfdoK5pLlyU7myoUTQ2'
            }
        });
    }

    static validarApiImpuesto(estado, nombre, porcentaje, tipo) {
        this.consumoApiImpuestos(estado).then((res) => {
            const impuesto = res.body.find(i => i.Nombre === nombre)
            expect(res.status).to.eq(200);
            expect(impuesto.Nombre).to.eq(nombre);
            expect(impuesto.Porcentaje).to.eq(porcentaje);
        });
    }
}