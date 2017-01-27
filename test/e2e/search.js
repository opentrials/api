'use strict';

const should = require('should');

describe('(e2e) search', () => {
  it('should be successful', () => (
    server.inject('/v1/search')
      .then((response) => {
        should(response.statusCode).eql(200);
        return JSON.parse(response.result);
      })
      .then((apiResponse) => should(apiResponse.failedValidation).be.undefined())
  ));
});

describe('(e2e) search FDA documents', () => {
  it('should be successful', () => (
    server.inject('/v1/search/fda_documents')
      .then((response) => {
        should(response.statusCode).eql(200);
        return JSON.parse(response.result);
      })
      .then((apiResponse) => should(apiResponse.failedValidation).be.undefined())
  ));

  it('returns only documents that contain the "q" query string', () => {
    let sampleDocumentId;

    return server.inject('/v1/search/fda_documents')
      .then((response) => {
        // Extract a sample document file's page
        const result = JSON.parse(response.result);

        // Make sure we have at least 2 documents indexed
        should(result.items.length).be.above(1);

        sampleDocumentId = result.items[0].id;
      })
      .then(() => server.inject(`/v1/search/fda_documents?q=${sampleDocumentId}`))
      .then((response) => {
        const result = JSON.parse(response.result);

        should(result.items.length).eql(1);
        should(result.items[0].id).eql(sampleDocumentId);
      });
  });

  it('returns only pages that contain the "text" query param, with terms highlighted', () => {
    let samplePage;

    return server.inject('/v1/search/fda_documents')
      .then((response) => {
        // Extract a sample document file's page
        const result = JSON.parse(response.result);

        for (const doc of result.items) {
          // Only consider files with multiple pages to be able to test that
          // the other pages weren't returned
          if (doc.file !== undefined && doc.file.pages.length >= 2) {
            samplePage = doc.file.pages[0];
            break;
          }
        }

        // Safety net for the case we can't find any page in the DB
        should(samplePage).not.be.undefined();
      })
      .then(() => server.inject(`/v1/search/fda_documents?text=${encodeURIComponent(`"${samplePage.text}"`)}`))
      .then((response) => {
        const result = JSON.parse(response.result);
        const pages = result.items.reduce((items, doc) => {
          if (doc.file === undefined) {
            return items;
          }

          return [
            ...items,
            ...doc.file.pages,
          ];
        }, []);
        const highlightedTerms = samplePage.text
          .split(' ')
          .map((term) => `<em>${term}</em>`)
          .join(' ');

        pages.forEach((page) => should(page.text).eql(highlightedTerms));
      });
  });

  it('returns all documents when called without parameters', () => (
    // This assumes that there're FDA Documents indexed
    server.inject('/v1/search/fda_documents')
      .then((response) => {
        const result = JSON.parse(response.result);
        should(result.total_count).above(0);
        should(result.items.length).above(0);
      })
  ));
});
