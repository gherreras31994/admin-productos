describe("Serie II - Examen final", () => {
  beforeEach(() => {
    // Limpiar antes de cargar evita heredar productos o sesiones de otra prueba.
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.clear()
      },
    })
    // El CSV actual contiene cinco productos. Esperar su carga inicial.
    cy.get(".fila-producto").should("have.length", 5)
  })

  function iniciarSesion() {
    cy.get("#usuario").type("admin")
    cy.get("#clave").type("1234")
    cy.get("#btn-login").click()
  }

  it("1. Inicia sesion y muestra el panel de administracion", () => {
    cy.get("#admin").should("not.be.visible")
    iniciarSesion()
    cy.get("#admin").should("be.visible")
  })

  it("2. Agrega un producto y verifica que aparezca en la tabla", () => {
    iniciarSesion()
    cy.get("#nombre").type("Webcam Examen")
    cy.get("#precio").type("250")
    cy.get("#stock").type("8")
    cy.get("#btn-guardar").click()

    // Cinco productos iniciales mas el nuevo producto: seis filas.
    cy.get(".fila-producto").should("have.length", 6)
    cy.contains("#tabla-productos .fila-producto", "Webcam Examen")
      .should("be.visible")
      .within(() => {
        cy.get(".col-nombre").should("have.text", "Webcam Examen")
        cy.get("td").eq(1).should("have.text", "Q250")
        cy.get("td").eq(2).should("have.text", "8")
      })
  })

  it("3. Rechaza un producto con precio cero", () => {
    iniciarSesion()
    cy.get("#nombre").type("Producto Invalido Examen")
    cy.get("#precio").type("0")
    cy.get("#stock").type("5")
    cy.get("#btn-guardar").click()

    cy.get("#form-msg")
      .should("be.visible")
      .and("have.text", "El precio debe ser un numero mayor que 0.")
    cy.get(".fila-producto").should("have.length", 5)
    cy.contains("#tabla-productos .col-nombre", "Producto Invalido Examen")
      .should("not.exist")
  })
})
