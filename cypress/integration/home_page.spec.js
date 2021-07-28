describe("Home Page", () => {
  // Hooks
  beforeEach(() => {
    cy.visit("/");
  });
  // Testando que o carrinho inicia aberto.
  it("starts with the cart open", () => {
    cy.get(".cart").should("be.visible");
  });

  // Testando que o carrinho some quando clicado no "X".
  it("closes cart by cliking on x icon", () => {
    cy.get(".cart__close").click();

    cy.get(".cart").should("not.be.visible");
  });

  // Testando que o carrinho é mostrado quando clicado no Icone do Carrinho.
  it("opens cart by clicking on cart icon", () => {
    cy.get(".cart__close").click();

    cy.get(".cart-icon").click();

    cy.get(".cart").should("be.visible");
  });

  // Testando que o produto é adicionado ao carrinho.
  context("when adding a product to the cart", () => {
    beforeEach(() => {
      cy.get(".cart__close").click();

      cy.get(".cart__button").first().invoke("show").click();
    });

    it("opens the cart", () => {
      cy.get(".cart").should("be.visible");
    });

    it("adds a product to the cart", () => {
      cy.get(".cart__product").should("be.visible");
    });

    it("sums the product value to the subtotal", () => {
      cy.get(".summary__value[data-subtotal]").contains("$50.00");
    });

    it("shows quantity selector", () => {
      cy.get(".quantity-selector").first().should("be.visible");
    });

    context("when quantity is changed", () => {
      it("increases the quantity", () => {
        cy.get(".add-icon").first().click();
  
        cy.get(".quantity").first().contains("2");
      });

      it("decreases the quantity", () => {
        cy.get(".add-icon").first().click();
        cy.get(".remove-icon").first().click();
  
        cy.get(".quantity").first().contains("1");
      });
    });

    it("removes the product from cart", () => {
      cy.get(".product__remove").invoke("show").get(".product__remove > .close-icon").click();

      cy.get(".empty__title").should("be.visible");
    });
  });
});
