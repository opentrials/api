const trialsController = require('../../../api/controllers/trials');
const Trial = require('../../../api/models/trial');

describe('Trials', () => {
  before(() => (
    config.bookshelf.knex.migrate.latest().then(() => (
      config.bookshelf.knex('trials').select().del()
    ))
  ));

  afterEach(() => (
    config.bookshelf.knex('trials').select().del()
  ))

  describe('GET /v1/trials', () => {
    it('returns empty list if there\'re no trials', () => (
      server.inject('/v1/trials')
        .then((response) => {
          response.statusCode.should.equal(200);
          JSON.parse(response.result).should.deepEqual([]);
        })
    ));

    it('returns the list of trials', () => (
      trialFixture().save()
        .then((model) => (
          server.inject('/v1/trials')
            .then((response) => {
              response.statusCode.should.equal(200);

              const result = JSON.parse(response.result);
              result.should.have.length(1);

              result.should.deepEqual([{
                id: model.attributes.id,
                brief_summary: model.attributes.brief_summary,
                public_title: model.attributes.public_title,
                registration_date: model.attributes.registration_date.toISOString(),
                locations: [],
              }]);
            })
        ))
    ));
  });

  describe('GET /v1/trials/{id}', () => {
    it('returns 404 if there\'s no trial with the received ID', () => (
      server.inject('/v1/trials/foo')
        .then((response) => {
          response.statusCode.should.equal(404);
        })
    ));

    it('returns the Trial', () => (
      trialFixture().save()
        .then((model) => (
          server.inject('/v1/trials/'+model.attributes.id)
            .then((response) => {
              response.statusCode.should.equal(200);

              const result = JSON.parse(response.result);

              result.should.deepEqual({
                id: model.attributes.id,
                brief_summary: model.attributes.brief_summary,
                public_title: model.attributes.public_title,
                registration_date: model.attributes.registration_date.toISOString(),
                locations: [],
              });
            })
        ))
    ));
  });
});

function trialFixture() {
  const attributes = {
    primary_register: 'primary_register',
    primary_id: 'primary_id',
    secondary_ids: JSON.stringify([]),
    registration_date: new Date('2016-01-01'),
    public_title: 'public_title',
    brief_summary: 'brief_summary',
    recruitment_status: 'recruitment_status',
    eligibility_criteria: JSON.stringify('[]'),
    study_type: 'study_type',
    study_design: 'study_design',
    study_phase: 'study_phase',
  }

  return new Trial(attributes);
}
