'use strict';

const should = require('should');
const _ = require('lodash');
const Trial = require('../../../api/models/trial');

describe('Trial', () => {
  before(clearDB);

  afterEach(clearDB);

  it('exists', () => {
    should.exist(Trial);
  });

  it('should define the relatedModels', () => {
    Trial.relatedModels.should.deepEqual([
      'locations',
      'interventions',
      'conditions',
      'persons',
      'organisations',
      'records',
      'records.source',
      'publications',
      'publications.source',
      'documents',
      'documents.file',
      'documents.source',
      'documents.fda_approval',
      'documents.fda_approval.fda_application',
      'risks_of_bias',
      'risks_of_bias.source',
      'risks_of_bias.risk_of_bias_criteria',
    ]);
  });

  describe('locations', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).locations).deepEqual([]);
    });

    it('adds the locations and its metadata from relationship into the resulting JSON', () => {
      let trialId;
      let loc;

      return factory.create('trial')
        .then((trial) => {
          trialId = trial.id;

          return factory.create('location').then((_loc) => {
            loc = _loc;
            return trial.locations().attach({
              location_id: loc.id,
              role: 'recruitment_countries',
            });
          });
        })
        .then(() => new Trial({ id: trialId }).fetch({ withRelated: 'locations' }))
        .then((trial) => {
          should(toJSON(trial).locations).deepEqual([
            Object.assign({ role: 'recruitment_countries' }, toJSON(loc)),
          ]);
        });
    });
  });

  describe('interventions', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).interventions).deepEqual([]);
    });

    it('adds the interventions and its metadata from relationship into the resulting JSON', () => {
      let trialId;
      let intervention;

      return factory.create('trial')
        .then((trial) => {
          trialId = trial.id;

          return factory.create('intervention').then((_intervention) => {
            intervention = _intervention;

            return trial.interventions().attach({
              intervention_id: intervention.id,
            });
          });
        })
        .then(() => new Trial({ id: trialId }).fetch({ withRelated: 'interventions' }))
        .then((trial) => {
          should(toJSON(trial).interventions).deepEqual([
            toJSON(intervention),
          ]);
        });
    });
  });

  describe('conditions', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).conditions).deepEqual([]);
    });

    it('adds the conditions and its metadata from relationship into the resulting JSON', () => {
      let trialId;
      let condition;

      return factory.create('trial')
        .then((trial) => {
          trialId = trial.id;

          return factory.create('condition').then((_condition) => {
            condition = _condition;

            return trial.conditions().attach({
              condition_id: condition.id,
            });
          });
        })
        .then(() => new Trial({ id: trialId }).fetch({ withRelated: 'conditions' }))
        .then((trial) => {
          should(toJSON(trial).conditions).deepEqual([
            toJSON(condition),
          ]);
        });
    });
  });

  describe('persons', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).persons).deepEqual([]);
    });

    it('adds the persons and its metadata from relationship into the resulting JSON', () => {
      let trialId;
      let person;

      return factory.create('trial')
        .then((trial) => {
          trialId = trial.id;

          return factory.create('person').then((_person) => {
            person = _person;

            return trial.persons().attach({
              person_id: person.id,
              role: 'other',
            });
          });
        })
        .then(() => new Trial({ id: trialId }).fetch({ withRelated: 'persons' }))
        .then((trial) => {
          should(toJSON(trial).persons).deepEqual([
            Object.assign({ role: 'other' }, toJSON(person)),
          ]);
        });
    });
  });

  describe('organisations', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).organisations).deepEqual([]);
    });

    it('adds the organisations and its metadata from relationship into the resulting JSON', () => {
      let trialId;
      let organisation;

      return factory.create('trial')
        .then((trial) => {
          trialId = trial.id;

          return factory.create('organisation').then((_organisation) => {
            organisation = _organisation;

            return trial.organisations().attach({
              organisation_id: organisation.id,
              role: 'other',
            });
          });
        })
        .then(() => new Trial({ id: trialId }).fetch({ withRelated: 'organisations' }))
        .then((trial) => {
          should(toJSON(trial).organisations).deepEqual([
            Object.assign({ role: 'other' }, toJSON(organisation)),
          ]);
        });
    });
  });

  describe('records', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).records).deepEqual([]);
    });

    it('adds the records and their sources into the resulting JSON', () => (
      factory.create('record')
        .then((record) => (
          new Trial({ id: record.attributes.trial_id })
            .fetch({ withRelated: ['records', 'records.source'] }))
            .then((trial) => should(toJSON(trial).records).deepEqual([
              toJSON(record.toJSONSummary()),
            ]))
        )
    ));
  });

  describe('risks_of_bias', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).risks_of_bias).deepEqual([]);
    });

    it('adds the risks of bias and their criteria into the resulting JSON', () => (
      factory.create('risk_of_bias')
        .then((rob) => {
          // Trigger fetching of RoB Criteria
          rob.related('risk_of_bias_criteria');

          return new Trial({ id: rob.attributes.trial_id })
            .fetch({ withRelated: ['risks_of_bias', 'risks_of_bias.risk_of_bias_criteria'] })
            .then((trial) => should(toJSON(trial).risks_of_bias).deepEqual([
              toJSON(rob.toJSON()),
            ]));
        })
    ));
  });

  describe('documents', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).documents).deepEqual([]);
    });

    it('adds the documents into the resulting JSON', () => {
      let trialId;
      let doc;

      return factory.create('trial')
        .then((trial) => {
          trialId = trial.id;

          return factory.create('document').then((_doc) => {
            doc = _doc;

            return trial.documents().attach({
              document_id: doc.id,
            });
          });
        })
        .then(() => new Trial({ id: trialId }).fetch({ withRelated: 'documents' }))
        .then((trial) => {
          should(toJSON(trial).documents).deepEqual([
            doc.toJSONSummary(),
          ]);
        });
    });
  });

  describe('virtuals', () => {
    describe('sources', () => {
      it('returns the publications sources', () => (
        factory.create('trialWithRelated')
          .then((trial) => {
            const publications = trial.related('publications');
            const publicationsSourcesIds = publications.map((pub) => pub.attributes.source_id);
            const sources = trial.toJSON().sources;

            should(sources).have.keys(publicationsSourcesIds);
          })
      ));

      it('returns the documents sources', () => (
        factory.create('trialWithRelated')
          .then((trial) => {
            const documents = trial.related('documents');
            const documentsSourcesIds = documents.map((doc) => doc.attributes.source_id);
            const sources = trial.toJSON().sources;

            should(sources).have.keys(documentsSourcesIds);
          })
      ));

      it('returns the records sources', () => (
        factory.create('trialWithRecord')
          .then((trial) => {
            const records = trial.related('records');
            const recordsSourcesIds = records.map((rec) => rec.attributes.source_id);
            const sources = trial.toJSON().sources;

            should(sources).have.keys(recordsSourcesIds);
          })
      ));

      it('ignores documents without sources', () => (
        factory.create('trial')
          .then((trial) => factory.create('document', { source_id: null })
            .then((doc) => trial.documents().attach({
              document_id: doc.id,
            }))
            .then(() => trial.id)
          )
          .then((trialId) => new Trial({ id: trialId }).fetch({ withRelated: ['documents', 'documents.source'] }))
          .then((trial) => should(trial.toJSON().sources).deepEqual({}))
      ));
    });

    describe('discrepancies', () => {
      it('returns the discrepancies', () => {
        let trialId;

        return factory.create('trial')
          .then((trial) => (trialId = trial.attributes.id))
          .then(() => factory.createMany('record', [
            {
              trial_id: trialId,
              public_title: 'foo',
              brief_summary: 'foo',
              target_sample_size: 0,
              gender: 'female',
              registration_date: new Date('2016-01-01'),
              status: 'complete',
              recruitment_status: 'not_recruiting',
              has_published_results: true,
            },
            {
              trial_id: trialId,
              public_title: 'bar',
              brief_summary: 'bar',
              target_sample_size: 100,
              gender: 'both',
              registration_date: new Date('2015-01-01'),
              status: 'ongoing',
              recruitment_status: 'recruiting',
              has_published_results: false,
            },
          ]))
          .then(() => new Trial({ id: trialId }).fetch({ withRelated: ['records', 'records.source'] }))
          .then((trial) => {
            should(trial.discrepancies).have.properties([
              'gender',
              'target_sample_size',
              'status',
              'recruitment_status',
              'has_published_results',
            ]);
          });
      });

      it('returns undefined if there\'re no discrepancies in the records', () => {
        let trialId;

        return factory.create('record')
          .then((record) => {
            const baseFields = _.pick(record.toJSON(), [
              'trial_id',
              'target_sample_size',
              'gender',
              'status',
              'recruitment_status',
              'has_published_status',
            ]);
            trialId = baseFields.trial_id;

            return factory.create('record', baseFields);
          })
          .then(() => new Trial({ id: trialId }).fetch({ withRelated: ['records', 'records.source'] }))
          .then((trial) => should(trial.discrepancies).be.undefined());
      });

      it('ignores undefined fields', () => {
        let trialId;

        return factory.create('trial')
          .then((trial) => (trialId = trial.attributes.id))
          .then(() => factory.createMany('record', [{ trial_id: trialId, gender: 'male' }, { trial_id: trialId, gender: null }]))
          .then(() => new Trial({ id: trialId }).fetch({ withRelated: ['records', 'records.source'] }))
          .then((trial) => should(trial.discrepancies).be.undefined());
      });

      it('ignores records from EU CTR', () => {
        let trialId;

        return factory.create('trial')
          .then((trial) => (trialId = trial.attributes.id))
          .then(() => factory.create('source', { id: 'euctr' }))
          .then((euctr) => factory.createMany('record', [
            {
              trial_id: trialId,
              source_id: euctr.id,
              gender: 'female',
            },
            {
              trial_id: trialId,
              gender: 'both',
            },
          ]))
          .then(() => new Trial({ id: trialId }).fetch({ withRelated: ['records', 'records.source'] }))
          .then((trial) => should(trial.discrepancies).be.undefined());
      });

      it('ignores records from ICTRP', () => {
        let trialId;

        return factory.create('trial')
          .then((trial) => (trialId = trial.attributes.id))
          .then(() => factory.create('source', { id: 'ictrp' }))
          .then((ictrp) => factory.createMany('record', [
            {
              trial_id: trialId,
              source_id: ictrp.id,
              gender: 'female',
            },
            {
              trial_id: trialId,
              gender: 'both',
            },
          ]))
          .then(() => new Trial({ id: trialId }).fetch({ withRelated: ['records', 'records.source'] }))
          .then((trial) => should(trial.discrepancies).be.undefined());
      });
    });
  });

  describe('toJSONSummary', () => {
    it('returns simplified trial representation', () => (
      factory.create('trial')
        .then((trial) => trial.toJSONSummary().should.deepEqual({
          id: trial.attributes.id,
          public_title: trial.attributes.public_title,
          url: trial.url,
        }))
    ));
  });
});
