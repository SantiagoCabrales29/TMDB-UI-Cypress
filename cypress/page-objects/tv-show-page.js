export class TvShowPage{

    navigate(){
        cy.visit('/tv/60625-rick-and-morty');
    }

    getTVShowTitle(){
       return cy.get("h2[class='14'] a");
    }

    playTrailer(){
        cy.get("a[data-title='Play Trailer']").click();
        cy.wait(10000);
    }

    closeTrailer(){
        cy.get("a[aria-label='Close']:visible").should('be.visible').click();
    }
    
    clickUserStats(){
        cy.get("div.user_score_chart:visible").click();
    }

    getUserRating(){
        //cy.get("div.user_score_chart:visible").invoke('attr','data-percent').should('eq', '87.0');
        return cy.get("div.user_score_chart:visible");
        //return ('@rating')
        //.should('eq', 87.0)
        //cy.get("div.user_score_chart:visible").should('have.attr', 'data-percent')
    }




}