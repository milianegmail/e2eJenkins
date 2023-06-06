/// <reference types="cypress" />
//import login from '../integration/login.spec'
//const perfil = require('..//fixtures/perfil.json')
let dadosLogin

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.visit('minha-conta')
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        var qtd = 4
        cy.visit('produtos/page/2/')
        cy.addProdutos('Atomic Endurance Running Tee (Crew-Neck)', 'L', 'Red', 1)
        cy.visit('produtos/page/2/')
        cy.addProdutos('Atomic Endurance Running Tee (V-neck)', 'XL', 'Green', 1)
        cy.visit('produtos/page/2/')
        cy.addProdutos('Autumn Pullie', 'XS', 'Green', 1)
        cy.visit('produtos/page/2/')
        cy.addProdutos('Augusta Pullover Jacket', 'S', 'Blue', 1)
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', qtd)
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        //cy.get('#payment_method_cod').click()
        //cy.get('#payment_method_cod').click()
        //cy.get('#place_order').click()
        cy.wait(4000)
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-order-overview__order').should('contain', "Número do pedido:")


    });


})