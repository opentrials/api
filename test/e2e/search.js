'use strict';

const should = require('should');

describe('(e2e) search', () => {
  it('should be successful', () => {
    return server.inject('/v1/search')
      .then((response) => {
        should(response.statusCode).eql(200);
        return JSON.parse(response.result);
      })
      .then((apiResponse) => should(apiResponse.failedValidation).be.undefined())
  });
})

describe('(e2e) search FDA documents', () => {
  it('should be successful', () => {
    return server.inject('/v1/search/fda_documents')
      .then((response) => {
        should(response.statusCode).eql(200);
        return JSON.parse(response.result);
      })
      .then((apiResponse) => should(apiResponse.failedValidation).be.undefined())
  });

  it('returns only pages that contain the query string', () => {
    let samplePage;

    return server.inject('/v1/search/fda_documents')
      .then((response) => {
        // Extract a sample document file's page
        const result = JSON.parse(response.result);

        for (const doc of result.items) {
          // Only consider files with multiple pages to be able to test that
          // the other pages weren't returned
          if (doc.file === undefined || doc.file.pages.length < 2) {
            continue;
          }

          samplePage = doc.file.pages[0];
          break;
        }

        // Safety net for the case we can't find any page in the DB
        should(samplePage).not.be.undefined();
      })
      .then(() => server.inject(`/v1/search/fda_documents?q=${encodeURIComponent('"' + samplePage.text + '"')}`))
      .then((response) => {
        const result = JSON.parse(response.result);
        const pages = result.items.reduce((result, doc) => {
          if (doc.file === undefined) {
            return result;
          }

          return result.concat(doc.file.pages);
        }, []);

        pages.forEach((page) => should(page.text).eql(samplePage.text));
      })
  });

  it('returns all documents when called without parameters', () => {
    // This assumes that there're FDA Documents indexed
    return server.inject('/v1/search/fda_documents')
      .then((response) => {
        const result = JSON.parse(response.result);
        should(result.total_count).above(0);
        should(result.items.length).above(0);
      });
  });
})
