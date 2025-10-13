import ImpuestosFlows from '../../flows/EstructuracionFinanciera/ImpuestosFlows';
import DatosImpuesto from '../../fixtures/EstructuracionFinanciera/Impuestos.json';

const { base, editar } = DatosImpuesto.impuestos;

describe('Gestión estructuración financiera - Impuestos', () => {

    beforeEach(() => cy.loginGlobalUser('ordenesPago', 0));

    it ('Crear impuesto', () => {
        ImpuestosFlows.crearImpuesto(base.tipo, base.nombre, base.porcentaje);
    });

    it ('Editar impuesto', () => {
        ImpuestosFlows.editarImpuesto(base.nombre, editar.nombre, editar.porcentaje);
    });

    it ('Eliminar impuesto', () => {
        ImpuestosFlows.eliminarImpuesto(editar.nombre);
    });
});