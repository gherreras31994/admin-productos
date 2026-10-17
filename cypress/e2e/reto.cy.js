describe("Seguridad de la sesion", () => {
  it("Un login fallido NO debe dar acceso al recargar", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });
    cy.get("#usuario").type("admin");
    cy.get("#clave").type("clave-incorrecta");
    cy.get("#btn-login").click();
    cy.reload();
    cy.get("#admin").should("not.be.visible");
  });
});
