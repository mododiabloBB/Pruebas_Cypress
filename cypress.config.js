const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://site2.q10.com/",
        experimentalSessionAndOrigin: true,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },

        env: {
            instituciones: {
                ordenesPago: {
                    nombre: "Ordenes pago",
                    aplentId: "bcc94d05-976b-43fd-a0dd-db2fbee2f2c8",
                    modeloAcademico: 2,
                    modeloFinanciero: 2,
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
