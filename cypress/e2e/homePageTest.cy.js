describe('Home Page Test Suite', () => {

  it('List of trending is visible', () => {
    cy.visit('')

    cy.get("div[id='trending_scroller'] div.image").should('be.visible');
    cy.url().should('eq','https://www.themoviedb.org/');
  })

  it('User should be able to use the search bar in the home page', () => {
    cy.visit('')
    let movieName = 'The Godfather';


    //cy.get("input#inner_search_v4").type('The Godfather{ENTER}');
    cy.get("input#inner_search_v4").type(movieName).get("input[value='Search']").click()
    cy.url().should('contain',movieName.split(' ')[0]).and('contain',movieName.split(' ')[1]);
    cy.get('input#search_v4').should('have.value',movieName);

    cy.get("div[id*='card_movie'] div.title h2").each(($el, index, $list) => {
        
      //cy.log($el.text());
      let elementText = $el.text().toLowerCase()
      expect(elementText).to.include(movieName.split(' ')[0].toLowerCase());
      expect(elementText).to.include(movieName.split(' ')[1].toLowerCase());

    })
  })


  it('User is able to navigate to Movies Page', ()=> {
    cy.visit('');
    cy.get("ul[data-role='menu'] > li[role='menuitem'] > a[href='/movie']").click();
    cy.contains("Popular").click();

    cy.url().should('contain','/movie');

    cy.get("div.title h2").should('have.text','Popular Movies');

  })
})