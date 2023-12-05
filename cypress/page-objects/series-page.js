import { TvShowPage } from "./tv-show-Page";

export class SeriesPage{
    
    navigate(){
        cy.visit('/tv');
    }

    uncheckAllAvailabilitiesCheckbox(){
        cy.get("input[id='all_availabilities']").uncheck();
    }

    uncheckAvailabilityCheckbox(checkboxToUncheck){
        cy.uncheckFilter(checkboxToUncheck);
    }

    clickGenre(genreText){
        cy.get('ul#with_genres li a').each(($el, index, $list) =>{
            if($el.text()===genreText){
                cy.wrap($el).click();
            }
        })
    }

    getGenreButton(genreText){
        return cy.get('ul#with_genres li a').each(($el, index, $list) =>{
            if($el.text()===genreText){
                cy.get('ul#with_genres li a').eq(index); 
            }
        })
 
    }


    getGenreLabel(genreText){
        return cy.get('ul#with_genres li a').each(($el, index, $list) =>{
            if($el.text()===genreText){
                cy.get('ul#with_genres li').eq(index); 
            }
        })
    }

    clickTvShow(showName){
        cy.contains(showName).click();
        const tvShowPage = new TvShowPage();
        return tvShowPage;  
    }

}