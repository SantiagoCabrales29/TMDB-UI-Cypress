// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('changeFilterAndSearch',() =>{
    cy.get("input[id='all_availabilities']").uncheck().should('not.be.checked');
    cy.get("div#availabilities_wrapper input").eq(2).uncheck().should('not.be.checked');       
    cy.get("div[class*='apply small'] a[class='no_click load_more']").click()
    cy.wait(1000)
})

Cypress.Commands.add('uncheckFilter',(filterText) =>{
    cy.get("input[id='all_availabilities']").uncheck().should('not.be.checked');
    cy.get("div#availabilities_wrapper input").each(($el, index, $list) => {
        cy.get("div#availabilities_wrapper label[for]").eq(index).then((checkboxText)=>{
            cy.log(checkboxText.text())
            if(checkboxText.text() === filterText){
                cy.wrap($el).uncheck()
            }

        })

    })
    cy.get("div[class*='apply small'] a[class='no_click load_more']").click()
    cy.wait(1000)
})

Cypress.Commands.add('clickSearchButton',() =>{
    cy.get("div[class*='apply small'] a[class='no_click load_more']").click()
    cy.wait(3000)
})


function getMoviesList(){
    const movies = [];
    cy.get("div.card.style_1").as('movieCards');
    cy.get('@movieCards').find('h2 a').each(($el, index, $list) => {
        //cy.log($el.text())
        movies.push($el.text());
    }).then(()=>{
        return cy.wrap(movies);
    })
    
}
Cypress.Commands.add('getMoviesList',getMoviesList);