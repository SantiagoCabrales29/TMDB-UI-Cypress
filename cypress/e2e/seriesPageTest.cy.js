/// <reference types="Cypress" />

import { SeriesPage } from "../page-objects/series-page"
import { TvShowPage } from "../page-objects/tv-show-Page";

describe('Test suite related to the Series Page', () => {

    const seriesPage = new SeriesPage();

    let tvShowPage = new TvShowPage();

    it('User can check availabilities checkbox', () => {

        seriesPage.navigate();

        seriesPage.uncheckAllAvailabilitiesCheckbox();

        seriesPage.uncheckAvailabilityCheckbox('Stream');
        
    })

    it('User can check genre', ()=> {

        seriesPage.navigate();

        let genreToSelect = 'Drama';

        seriesPage.clickGenre(genreToSelect);
    
        seriesPage.getGenreButton(genreToSelect).should('have.text', genreToSelect);
        seriesPage.getGenreLabel(genreToSelect).and('have.class','selected')
    })

    it.only('Click a series card', ()=> {
        
        seriesPage.navigate();

        tvShowPage = seriesPage.clickTvShow('Rick and Morty');

        tvShowPage.getTVShowTitle().should('have.text','Rick and Morty')

        //cy.log(tvShowPage.getTVShowTitle());
    })

})