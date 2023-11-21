/// <reference types="Cypress" />

describe('Movies Page Test Suite', ()=> {

    it('User can check/uncheck checkboxes',()=>{
        cy.visit('/movie');

        cy.get("div#availabilities_wrapper input").should('not.be.visible')

        cy.get("input[id='all_availabilities']").uncheck().should('not.be.checked');

        cy.get("div#availabilities_wrapper input").should('be.visible').and('be.checked');

        cy.get("div#availabilities_wrapper input").each(($el, index, $list) => {
        
            expect($el).to.be.visible.and.checked;
        })

        cy.get("div#availabilities_wrapper input").eq(2).uncheck().should('not.be.checked');

        /*
        It's important to test our assertions
        The following assertion should fail but passes
        Maybe it's better to test each value individually.
        */

        //cy.get("div#availabilities_wrapper input").should('be.checked');
        // cy.get("div#availabilities_wrapper input").each(($el, index, $list) => { 
        //     expect($el).to.be.visible.and.checked;
        // })
    })

    it('User can alter the search by checking/unchecking checkboxes', ()=>{
        cy.visit('/movie');
        const movies = [];
        const updatedMovies = [];

        cy.get("div.card.style_1").find('h2 a').each(($el, index, $list) => {
            //cy.log($el.text())
            movies.push($el.text());
        }).then(()=>{
            cy.log(movies[0])
            //let updatedMovies=movies.concat();
            cy.get("input[id='all_availabilities']").uncheck().should('not.be.checked');
            cy.get("div#availabilities_wrapper input").eq(2).uncheck().should('not.be.checked');       
            cy.get("div[class*='apply small'] a[class='no_click load_more']").click()
            cy.wait(1000)
            cy.get("div.card.style_1").find('h2 a').each(($element, index, $list) => {
                //cy.log($element.text())
                updatedMovies.push($element.text());
                
            }).then(()=>{
                cy.log(updatedMovies[0]);
                cy.log(movies[0]);
                expect(JSON.stringify(movies)===JSON.stringify(updatedMovies)).to.be.false;
            })
            //expect(JSON.stringify(movies)===JSON.stringify(updatedMovies)).to.be.false;
        })
    })

    it('User can alter the search by checking/unchecking checkboxes using aliases and custom commands', ()=>{
        cy.visit('/movie');
        cy.getMoviesList().then((moviesList)=>{
            cy.changeFilterAndSearch();
            cy.getMoviesList().then((updatedMoviesList)=>{
                expect(JSON.stringify(moviesList)===JSON.stringify(updatedMoviesList)).to.be.false;
            })
        });
    })

    it('User can alter the search Dynamic Approach', ()=>{
        cy.visit('/movie');
        cy.getMoviesList().then((moviesList)=>{
            cy.uncheckFilter('Buy');
            cy.uncheckFilter('Ads');
            cy.clickSearchButton();
            cy.getMoviesList().then((updatedMoviesList)=>{
                expect(JSON.stringify(moviesList)===JSON.stringify(updatedMoviesList)).to.be.false;
            })
        });
    })

    it.skip('User can interact with the user score drag and drop PENDING', ()=>{
        cy.visit('/movie');
        cy.getMoviesList().then((moviesList)=>{
            cy.get("div.k-slider-wrap a[role='slider']:first-of-type").as('ListOfDragables');
            cy.get('@ListOfDragables').eq(0).invoke('attr','aria-valuenow', '9')
            cy.get('@ListOfDragables').eq(0).invoke('attr','style', 'z-index: 1; left: 193.5px;')
            cy.get("div.k-slider-wrap div.k-slider-selection").eq(0).invoke('attr','style', 'width: 22.5px; left: 200.5px;')
            //cy.wait(1000);
            cy.get("span[class*='k-dropdown full_width']").click()
            cy.get("span[class*='k-dropdown full_width']").click()
            cy.clickSearchButton();
            // cy.getMoviesList().then((updatedMoviesList)=>{
            //     expect(JSON.stringify(moviesList)===JSON.stringify(updatedMoviesList)).to.be.false;
            // })
        });
    })

    it('User can select an option from Dropdown',()=>{
        cy.visit('/movie');
        //cy.get('select#language').click().type('French');
        cy.getMoviesList().then((moviesList)=>{
            cy.get('select#language').select('French',{force: true}).should('have.value','fr');
            cy.clickSearchButton();
            cy.getMoviesList().then((updatedMoviesList)=>{
                expect(JSON.stringify(moviesList)===JSON.stringify(updatedMoviesList)).to.be.false;
            })
        })

        //cy.get('select#language').invoke('removeAttr','style').select('French',{force: true}).should('have.value','fr');

    })
    
    it.skip('User can select an option from Dynamic Dropdown PENDING',()=>{
        cy.visit('/movie');
        //cy.get('select#language').click().type('French');
        cy.getMoviesList().then((moviesList)=>{
            //First Solution
            cy.get("input.k-input.k-readonly").type('Ast');
            //cy.get("select#with_keywords").invoke('removeAttr','style');
            cy.get("select#with_keywords option").each(($el, index, $list) =>{
                cy.log($el.text());
                if($el.text()==='aston martin'){
                    cy.log($el.text());    
                    //cy.wrap($el).click({force: true});
                    cy.contains('aston martin').click({force: true})
                }
            })

            // Second solution
            // cy.get("input.k-input.k-readonly").type('aston martin').type('{ENTER}');
            // cy.clickSearchButton();


            // cy.getMoviesList().then((updatedMoviesList)=>{
            //     expect(JSON.stringify(moviesList)===JSON.stringify(updatedMoviesList)).to.be.false;
            // })
        })
    })

    it.only('Load more button shows new movies', () => {
        cy.visit('/movie');
        cy.getMoviesList().then((moviesList)=>{
            cy.get("a[href='/movie?page=2']").click();
            cy.wait(1000);
            cy.getMoviesList().then((updatedMoviesList) => {
                expect(updatedMoviesList.length).to.greaterThan(moviesList.length);
            })
        });

        //An alternative way to do this:
        // let moviesLengthBefore;
        // let moviesLengthAfter;
        // cy.get('div.card.style_1').find('h2 a').each(($el, index, $list) => {
        //     //cy.log($el.text())
        //     moviesLengthBefore = $list.length;
            
        // }).then(()=>{
        //     cy.log(moviesLengthBefore);
        //     cy.get("a[href='/movie?page=2']").click();
        //     cy.wait(2000);
        //     cy.get('div.card.style_1').find('h2 a').each(($el, index, $list2) => {
        //         moviesLengthAfter = $list2.length;
        //     }).then(() =>{
        //         expect(moviesLengthAfter).to.greaterThan(moviesLengthBefore); 
        //     })
        // })

    })
})