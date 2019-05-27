describe("Test edit draft invoice", () => {
    
    beforeEach(function() {
        cy.fixture("users/user_default").as("user")
        cy.fixture("assertions/dashboard_page").as("assert_dashboard_page");
        cy.fixture("assertions/invoices_page").as("assert_invoices_page");
        cy.fixture("pages/dashboard_page").as("dashboard_page");
        cy.fixture("pages/invoices_page").as("invoices_page");
        cy.login()
    });

    //Test edit draft invoice
    it("Test edit draft invoice", function () {
        // click on a invoices button 
        cy.get(this.dashboard_page.link_invoices)
            .should('be.visible')
            .click()
        
        // click on draft tab
        cy.get(this.invoices_page.button_draft)
            .should('be.visible')
            .click()

        // click on custom draft invoice
        cy.get(this.invoices_page.link_custom_draft_invoice)
            .should('be.visible')
            .click()

        // click on edit button
        cy.get(this.invoices_page.button_edit_draft_invoice)
            .should('be.visible')
            .click()
        cy.wait(2000)
        // populate and assert desired fields
        cy.get(this.invoices_page.label_draft_number)
            .should('be.visible')
            .clear()
            .type(this.assert_invoices_page.label_draft_number)
            .should("have.value", this.assert_invoices_page.label_draft_number);
    
    
        cy.get(this.invoices_page.text_description)
            .should('be.visible')
            .clear()
            .type(this.assert_invoices_page.text_description)
            .should("have.value", this.assert_invoices_page.text_description);
        

        cy.get(this.invoices_page.label_invoice_number)
            .should('be.visible')
            .clear()
            .type(this.assert_invoices_page.label_invoice_number)
            .should("have.value", this.assert_invoices_page.label_invoice_number);    

        cy.get(this.invoices_page.select_language)
            .should('be.visible')
            .select('English (UK)')
            
        
        cy.get(this.invoices_page.select_currency)
            .select('all')
            
        
        cy.get(this.invoices_page.date)
            .clear()
            .type(this.assert_invoices_page.date)
            .should("have.value", this.assert_invoices_page.date);        
        cy.get('[data-day="10"] > .pika-button').click()

        cy.get(this.invoices_page.date_due)
            .should('be.visible')
            .select('0')
            

        cy.get(this.invoices_page.label_purchase_order_number)
            .should('be.visible')
            .clear()
            .type(this.assert_invoices_page.label_purchase_order_number)
            .should("have.value", this.assert_invoices_page.label_purchase_order_number);

        cy.get(this.invoices_page.label_item_description)
            .should('be.visible')
            .clear()
            .type(this.assert_invoices_page.label_item_description)
            .should("have.value", this.assert_invoices_page.label_item_description);   


        cy.get(this.invoices_page.label_quantity)
            .should('be.visible')
            .clear()
            .type(this.assert_invoices_page.label_quantity)
            .should("have.value", this.assert_invoices_page.label_quantity);        


        cy.get(this.invoices_page.label_price_per_unit)
            .should('be.visible')
            .clear()
            .type(this.assert_invoices_page.label_price_per_unit)
            .should("have.value", this.assert_invoices_page.label_price_per_unit);

        cy.get(this.invoices_page.select_unit)
            .should('be.visible')
            .select('y')
            
        cy.get(this.invoices_page.text_invoice_note)
            .should('be.visible')
            .clear()
            .type(this.assert_invoices_page.text_invoice_note)
            .should("have.value", this.assert_invoices_page.text_invoice_note);   

    
        cy.get(this.invoices_page.button_save_draft)
            .should('be.visible')
            .click()
        
        


    });

    
        
        



});