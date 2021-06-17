/// <reference types="Cypress" />

// before - once, before all
// beforeEach - before every 'it' block
// test
// afterEach - after each 'it' block
// after - once, after all

describe("Make sure site loads", () => {
  beforeEach(() => {
    const API_KEY = Cypress.env("REACT_APP_MOVIE_API");

    const moviesListUrl = `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`;
    const configUrl = `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`;

    cy.intercept(moviesListUrl, {
      fixture: "moviesList",
    });

    cy.intercept(configUrl, {
      fixture: "config",
    });

    cy.visit("http://localhost:3000/");

    // our custom command (fake)
    cy.login();
  });

  it("Page Loads", () => {
    cy.contains("Filter");
    cy.findAllByTestId("movies-list-movie")
      .first()
      .then(($movie) => {
        const movieUrl = $movie.attr("href");
        cy.get("[data-testid=movies-list-movie]").first().click();
        cy.url().should("include", movieUrl);
      });

    expect(true).to.equal(true);
  });

  it("Correct number of movies", () => {
    cy.get("[data-testid=movies-list-movie]").should("have.length", 20);
    cy.get("[data-testid=movies-list-movie]").should("exist");
    cy.get("[data-testid=movies-loading-movie]").should("not.exist");
  });

  it("Understand chaines", () => {
    cy.get("[data-testid=movies-list-movie]").should("exist");
    cy.get("[data-testid=movies-loading-movie]").should("not.exist");
  });

  it("Should find movie on search and go to details page and back", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get("input").clear();
    cy.get("input").type("virtuoso");
    cy.get("img").click();
    /* ==== End Cypress Studio ==== */
  });

  it("Load data from fixture", () => {
    cy.fixture("moviesList").then((jsonData) => {
      expect(jsonData.results[0].title).to.eq("Cruella");
    });
  });
});
