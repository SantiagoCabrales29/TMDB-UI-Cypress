
import { TvShowPage } from "../page-objects/tv-show-Page";

describe('', () => {

    const tvShowPage = new TvShowPage();

    it('User can navigate to page', () => {

        tvShowPage.navigate();
    })

    it('User can play the trailer of the TV Show', () =>{
        tvShowPage.navigate();
        tvShowPage.playTrailer();
        tvShowPage.closeTrailer();
    })

    it('User can open the user rating stats WIP', () => {
        tvShowPage.navigate();
        tvShowPage.clickUserStats();
        let rating = tvShowPage.getUserRating();
        rating.invoke('attr','data-percent').should('eq', '87.0');
        
    })

})