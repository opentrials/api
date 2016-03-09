const locationsController = require('../../../api/controllers/locations');
const Location = require('../../../api/models/location');

describe('Locations', () => {
  before(clearDB)

  afterEach(clearDB)

  describe('GET /v1/locations', () => {
    it('returns the list of locations', () => (
      fixtures.location().save()
        .then((model) => (
          server.inject('/v1/locations/')
            .then((response) => {
              response.statusCode.should.equal(200);

              const result = JSON.parse(response.result);
              const expectedResult = [model.toJSON()];

              result.should.deepEqual(expectedResult);
            })
        ))
    ));
  });
});

