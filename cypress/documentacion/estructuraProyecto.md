# Documentación general de los metodos usados en el proyecto y sus funciones

## I. Estructura del proyecto

### Carpeta: Pages

Las pages son usandas unicamente para mapear elemento y retornar estos, **dentro de estas no se cuenta con logica de flujos** a seguir en la automatización.

```javascript
export default class ProductosPage {

    static abrirModalCrearProducto() {
        cy.get('a[title="Crear productos"]').click();
        return cy.get('#form0');
    }
}
```

### Carpeta: Api

Desde aquí realizamos las consultas de APIS, con el fin de validar que las automatizaciones realizadas se hayan creado/guardado de forma correcta.

```javascript
export default class ProductosApi {

    static obtenerTokenInstitucion() {
        const institucionKey = Cypress.env('institucionSesion');
        return Cypress.env('instituciones')[institucionKey].token;
    }

    static consumoApiCrearProducto(codigo) {
        return cy.request({
            method: 'GET',
            url: `https://site2.q10.com/api/productos/${codigo}?api-version=1.0`,
            headers: {
                Authorization: `Bearer ${this.obtenerTokenInstitucion()}`,
                Cookie: '.ASPXANONYMOUS=5eGHGdxzyjC1AQ1WQ-t82M_R3wU9XDIvPTt_O5kf4JLmiLXOFQq0vE8xy8OsL9gwEYg0djfB_PbBCDJfIhghWCez1wRQyiiO7hKeluehujraIUysdrOrDacD-_tJg93p7P8-Yg2; ARRAffinity=8b7fb4bc0827dd2af94d0522e4698f8bf220b1323250a660bfdb66609b24da2a; .ASPXANONYMOUS=2AE0eHxMml8u3tUlTNhzkgl0p6GHKX_RjhaP2Qlppe7WCiui_cgoRtFfaAcKBSAZrcyNDNSci3licphIQoNZoxhGm98gd4v1K01LN6BzJLk2umKNQUqrVfdoK5pLlyU7myoUTQ2'
            }
        });
    }

}
```


+ **NOTA:** Se debe tener presente que en tanto en las pages como en las apis NO hacemos flujos, solo realizamos fenciones para uso.

### Carpeta: Flows

Desde la carpeta de flows, es donde unimos nuestro mapeo de elementos y nuestras validaciones de creación de elementos para realizar flujos de automatización.

```javascript
export default class ProductosFlows {

    static crearProducto(codigo, nombre, valor, impuesto) {
        ProductosPage.inicio();
        ProductosPage.abrirModalCrearProducto().should('be.visible');

        ProductosPage.completarCampo('#Producto_prod_codigoP', codigo).should('have.value', codigo);
        ProductosPage.completarCampo('#Producto_prod_nombre', nombre).should('have.value', nombre);
        ProductosPage.completarCampo('#Producto_prod_valor_neto_currencytxt', valor).should('contain.value', valor);
        ProductosPage.seleccionarOpcionSelect('Producto_prod_imp_consecutivo', impuesto).should('contain.text', impuesto);

        cy.enviarFormularioModal();

        // Validación por medio de API
        ProductosApi.validarApiCrearProducto(codigo, nombre, impuesto);
    }
}
```
Algo a tener en cuenta es que un flujo entero es tanto la cración como la validación PERO, en ocasiones no se podra validar con APIs, para ello se recomienda validar en otro flujo alterno, por ejemplo:

Si estamos automatizando educación virtual, sabiendo que no hay APIs para recursos o relación de doccentes, se recomienda validar esto en otro flujo como:

+ Completar recursos como estudiante.
+ Calificar recursos como docentes.

Teniendo presente que si alguno de estos falla, la causa puede ser por los metodos anteriores.

---

## II. e2e y fixture

Para el uso de los e2e y fixture es similar al estandar, solo hay una diferencia en cuanto al consumo de los fixture en los e2e, esto debido a que en el e2e no usamos el fixture dentro de un **"before"**
sino que importamos este.

```javascript
import DatosProducto from '../../fixtures/EstructuracionFinanciera/Productos.json'
```

Y pasa su consumo realizamos una constante en la cual **desestructuramos la anidación del objeto**.

```javascript
const { base, editar, relaciones } = DatosProducto.producto;
```

Esto funciona de esta forma, ya que, el .json se estructuro de forma anidad, con el fin de tener la información mas compacta dentro de este.

```json
{
    "producto": {
        "base": {
            "codigo": "001002003",
            "nombre": "Hola que tal",
            "impuesto": "IVA",
            "valor": "100.000"
        },
        "editar": {
            "nombre": "Soy el chico de las poesías",
            "impuesto": "IMPUESTO CYPRESS",
            "valor": "150.000"
        },
        "relaciones": {
            "programa": "Sistemas",
            "asignatura": "Programación"
        }
    }
}
```

Ya la información enviada variaria acorde al valor usado de nuestra constante.

```javascript
    it('Editar producto', () => {
        ProductosFlows.editarProducto(base.codigo, editar.nombre, editar.valor, editar.impuesto);
    })
```

---

## III. Plugins

### Real Hover

Este plugin nos sirve para dar un hover a los elementos desde JS este se usa ya que, la simulación realizada por este plugin es nativa a comparáción de los cy.trigger.

Para instalar este es muy facil, es nuestra terminal debemos asignar la línea.

```bash
npm install --save-dev cypress-real-events
```

Luego en nuestro e2e.js (cypress/support/ese.js) debemos importar el plugin.


```javascript
import 'cypress-real-events/support';
```

Su uso es igual a una línea de cypress "cy.realHover()"


```javascript
cy.wrap(opcion).realHover()
```

### Mochawesome-reporter

Este plugin nos sirve para visualizar los reportes cypress de mejor forma, entre sus funciones podemos incluir fotos o videos de nuestras ejecución o fallos etc.

Para instalar este, es nuestra terminal debemos asignar la línea

```bash
npm i --save-dev cypress-mochawesome-reporter
```

Luego en nuestro json de cypress (cypress/cypress.config.js) debemos asignar nuestro reporte de mocha, para su uso.

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
    reporter: "cypress-mochawesome-reporter",
```

+ **NOTA:** Tener presente que este comando **NO debe ir dentro de nuestro e2e**.


Luego desde nuestro e2e (cypress/cypress.config.js) en los eventos ON debemos asignar el requerimiento de nuestros reportes.

```javascript
module.exports = (on, config) => {
  require('cypress-mochawesome-reporter/plugin')(on);
}
```

Luego es nuestro support-e2e (cypress/support/e2e.js) debemos importar las funciones de reporte.

```javascript
import 'cypress-mochawesome-reporter/register';
```

Luego de todo esto podemos corres nuestro cypress.

Nota: los reportes generados pueden porsonalizarse acorde a gusto, para ello se puede ingresar a la [Documentación](https://www.npmjs.com/package/cypress-mochawesome-reporter).
