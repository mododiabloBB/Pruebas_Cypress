const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "o7qpdw",
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
        reportDir: "cypress/reportes",
        charts: true,
        reportPageTitle: 'Pruebas reportes',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
        overwrite: false,
        html: true,
        json: true
    },
    e2e: {
        baseUrl: "https://site2.q10.com/",
        defaultCommandTimeout: 10000,
        experimentalSessionAndOrigin: true,
        setupNodeEvents(on, config) {
            // implement node event listeners here
            require('cypress-mochawesome-reporter/plugin')(on);
        },

        env: {
            instituciones: {
                ordenesPago: {
                    nombre: "Ordenes pago",
                    aplentId: "bcc94d05-976b-43fd-a0dd-db2fbee2f2c8",
                    modeloAcademico: 2,
                    modeloFinanciero: 2,
                    token: 'RJS3ZJjdk8b_8EWkCNQqvVJspPymNnlRByYTNTwhM19ArmmhyltTC6lcTrIdo0IeC7FevLpQTPt492xhOTBu7mxc0rG1AMhgJ99cLdzTPPiBNvBcL7xm4ZbMN6ABNMqUg62rN-3dbsnM3HjHWTPwkxu9u7aZgMMlRRxscZ3fEPlppzgvhZsuPICcWNOlWduAFSEZYyX2BSrtkdkzMcsyNPPkPLpl7Uk_f6uUwGS30IuuV3pB1cpn2tq7AxCP_FzzGk9Cb3bOMAlG4s_t6m4PKvdOXcwTaW3QuOvk94G2I_VFFTcKl4_3v5V3bbLarjCvk4T0PsqbXFNiqZCElV-eMAWo-MRDB-zY_nRM41ha4UiMKcU3dIKIIigkvnF6Px3jHbJHkIUUPri4aZ8hCP2ZeIPd5LxLdDBaE1zp3axPbgQrVQLyviCcJ4lTqhJPdh5BfXGLlvdFEQ3oztXL72juiBwY8nI',
                    usuarios: [
                        {
                            usuario: "automatizacion@yopmail.com",
                            contrasenia: "0000",
                            rol: 0
                        },
                        {
                            usuario: "estudiante_automatizacion",
                            contrasenia: "estudiante_automatizacion",
                            rol: 1
                        }
                    ]
                }
            },

            urls: {
                QA: {
                    baseUrl: "https://site2.q10.com/"
                },
                produccion: {
                    baseUrl: "https://site3.q10.com/"
                },
            }
        }
    },
});
