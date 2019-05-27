describe("Login page health check", () => {
    
    before(function() {
        // get baseURl from cypress.json
        cy.visit("/login")
        

      });
    
    beforeEach(function() {
        cy.fixture("users/user_default").as("user")
        cy.fixture("assertions/login_page").as("assert_login_page");
        cy.fixture("assertions/dashboard_page").as("assert_dashboard_page");
        cy.fixture("pages/login_page").as("login_page");
        cy.fixture("pages/dashboard_page").as("dashboard_page");
        
    });

      
    //Test page elements at login page
    it("Check login page elements", function () {

        // check if url contains '/login '
        cy.url().should('include', '/login')    

        // check if 'Log in to your account' label is present
        cy.get(this.login_page.label_h2_header)
            .should("contain", this.assert_login_page.header)
            .and("be.visible")
        
        // check if 'Email Address' label is present
        cy.get(this.login_page.label_email_address)
            .should("contain", this.assert_login_page.label_email_input_field)
            .and("be.visible")
        
        // check if email input field is visible
        cy.get(this.login_page.input_email_adress)
            .should("be.visible")
            
        
        // check if Password label is present
        cy.get(this.login_page.label_password)
            .should("contain",this.assert_login_page.label_password_input_field)
            .and("be.visible")
        
        // check if 'Forgot Password' label is present
        cy.get(this.login_page.label_forgot_password)
            .should("contain",this.assert_login_page.label_forgot_password)
            .and("be.visible")
        
        // check if password input field is visible
        cy.get(this.login_page.input_password)
            .should("be.visible")

        // Check if 'Log in' button is visible
        cy.get(this.login_page.button_log_in)
            .should("be.visible")
            .and("contain", this.assert_login_page.button_log_in)


    });

    //Test if user can login sucessfuly at login page
    it("Check user login", function () {
        cy.server()
        cy.route('POST', 'https://ma1mddx.invoicely.com/php/ajax_handler.php?endpoint=stats&action_type=create').as('login')
        
        // Enter email and check email field when user types his email
        cy.get(this.login_page.input_email_adress)
            .type(this.user.email)
            .should("have.value", this.user.email);

        // Enter a password and check password field when user types his password
        cy.get(this.login_page.input_password)
            .type(this.user.password)
            .should("have.value", this.user.password);

        
        // Click 'Login button'
        cy.get(this.login_page.button_log_in_form)
            .submit()
        
        // check if user's profile is present
        cy.get(this.login_page.label_business_name)
            .should("be.visible")
        
        // click on given user profile
        cy.get(this.login_page.link_business_url).click()

        // check if 'Dashboard' label is present
        cy.get(this.dashboard_page.label_dashboard)
            .should("contain", this.assert_dashboard_page.header)
            .and("be.visible")
        
        cy.wait('@login')    
        // Assert that you got code 200 given request
        cy.get('@login').then(function (xhr) {
            expect(xhr.status).to.eq(200)
            expect(xhr.requestHeaders).to.have.property('Content-Type')
            expect(xhr.method).to.eq('POST')
            
        })
        
        

});

  });