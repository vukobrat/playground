describe("Test client's address form", () => {
    
    beforeEach(function() {
        cy.fixture("users/user_default").as("user")
        cy.fixture("assertions/dashboard_page").as("assert_dashboard_page");
        cy.fixture("assertions/client_page").as("assert_client_page");
        cy.fixture("pages/dashboard_page").as("dashboard_page");
        cy.fixture("pages/clients_page").as("client_page");
        
        // I played with support/commands.js file
        cy.login()
    });

    //Test client's address form
    it("Test edit client adress", function () {
        cy.server()
        cy.route('POST', 'https://ma1mddx.invoicely.com/php/advanced_ajax_handler.php?type=edit_connection&id=1502864').as('client_edit')

        // click on a clients button 
        cy.get(this.dashboard_page.link_clients)
            .should('be.visible')
            .click()
        // search for a given user    
        cy.get(this.client_page.input_search_clients)
            .should('be.visible')
            .type(this.user.name)
        // click on a edit button    
        cy.get(this.client_page.button_edit_client)
            .should('be.visible')
            .click()

        // populate desired fields for a address: 
        // Address 1, Address 2, Postal Code, City, State, Country

        cy.get(this.client_page.input_address_1)
            .should('be.visible')
            .clear()
            .type(this.assert_client_page.input_address_1)
            .should("have.value", this.assert_client_page.input_address_1);
        
        
        cy.get(this.client_page.input_address_2)
            .should('be.visible')
            .clear()
            .type(this.assert_client_page.input_address_2)
            .should("have.value", this.assert_client_page.input_address_2);
        

        cy.get(this.client_page.input_postal_code)
            .should('be.visible')
            .clear()
            .type(this.assert_client_page.input_postal_code)
            .should("have.value", this.assert_client_page.input_postal_code);    

        cy.get(this.client_page.input_city)
            .should('be.visible')
            .clear()
            .type(this.assert_client_page.input_city)
            .should("have.value", this.assert_client_page.input_city);        
        
        cy.get(this.client_page.input_state)
            .should('be.visible')
            .clear()
            .type(this.assert_client_page.input_state)
            .should("have.value", this.assert_client_page.input_state);        

        cy.get(this.client_page.select_country)
            .select(this.client_page.option_serbia)

        cy.get(this.client_page.button_save)
            .should('be.visible')
            .click()
        
        cy.get(this.client_page.label_client_edited)
            .should('contain', this.assert_client_page.label_client_edited)
            .click()

        cy.wait('@client_edit')    
        // Assert that you got code 200 given request
        cy.get('@client_edit').then(function (xhr) {
            expect(xhr.status).to.eq(200)
            expect(xhr.requestHeaders).to.have.property('Content-Type')
            expect(xhr.method).to.eq('POST')
            
        })
        
        
        // now reopen the client editor page in order to double check if previous changes are applied

        // click on a clients button 
        cy.get(this.dashboard_page.link_clients)
            .should('be.visible')
            .click()
        // search for a given user    
        cy.get(this.client_page.input_search_clients)
            .should('be.visible')
            .type(this.user.name)
        // click on a edit button    
        cy.get(this.client_page.button_edit_client)
            .should('be.visible')
            .click()
        
        // Assert previously changed fields
        cy.get(this.client_page.input_address_1)
            .should("have.value", this.assert_client_page.input_address_1);
        
        
        cy.get(this.client_page.input_address_2)
            .should("have.value", this.assert_client_page.input_address_2);
        

        cy.get(this.client_page.input_postal_code)
            .should("have.value", this.assert_client_page.input_postal_code);    

        cy.get(this.client_page.input_city)
            .should("have.value", this.assert_client_page.input_city);        
        
        cy.get(this.client_page.input_state)
            .should("have.value", this.assert_client_page.input_state);        

        cy.get(this.client_page.select_country)
            .should("have.value", this.assert_client_page.select_country);        
        


    });

    
        
        



});