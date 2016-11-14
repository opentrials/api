'use strict';

const should = require('should');
const _ = require('lodash');
const Trial = require('../../../api/models/trial');
const Record = require('../../../api/models/record');
const Location = require('../../../api/models/location');

describe('Trial', () => {
  before(clearDB)

  afterEach(clearDB)

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
      'risks_of_bias.risk_of_bias_criteria',
    ]);
  });

  describe('locations', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).locations).deepEqual([]);
    });

    it('adds the locations and its metadata from relationship into the resulting JSON', () => {
      let trial_id;
      let loc;

      return factory.create('trial')
        .then((trial) => {
          trial_id = trial.id;

          return factory.create('location').then((_loc) => {
            loc = _loc;
            return trial.locations().attach({
              location_id: loc.id,
              role: 'recruitment_countries',
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'locations' })
        }).then((trial) => {
          should(toJSON(trial).locations).deepEqual([
            Object.assign({ role: 'recruitment_countries' }, toJSON(loc)),
          ]);
        });
    });
  });

  describe('interventions', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial).interventions).deepEqual([]);
    });

    it('adds the interventions and its metadata from relationship into the resulting JSON', () => {
      let trial_id;
      let intervention;

      return factory.create('trial')
        .then((trial) => {
          trial_id = trial.id;

          return factory.create('intervention').then((_intervention) => {
            intervention = _intervention;

            return trial.interventions().attach({
              intervention_id: intervention.id,
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'interventions' })
        }).then((trial) => {
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
      let trial_id;
      let condition;

      return factory.create('trial')
        .then((trial) => {
          trial_id = trial.id;

          return factory.create('condition').then((_condition) => {
            condition = _condition;

            return trial.conditions().attach({
              condition_id: condition.id,
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'conditions' })
        }).then((trial) => {
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
      let trial_id;
      let person;

      return factory.create('trial')
        .then((trial) => {
          trial_id = trial.id;

          return factory.create('person').then((_person) => {
            person = _person;

            return trial.persons().attach({
              person_id: person.id,
              role: 'other',
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'persons' })
        }).then((trial) => {
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
      let trial_id;
      let organisation;

      return factory.create('trial')
        .then((trial) => {
          trial_id = trial.id;

          return factory.create('organisation').then((_organisation) => {
            organisation = _organisation;

            return trial.organisations().attach({
              organisation_id: organisation.id,
              role: 'other',
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'organisations' })
        }).then((trial) => {

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

    it('adds the records and their sources into the resulting JSON', () => {
      return factory.create('record')
        .then((record) => {
          const source = record.related('source');

          return new Trial({ id: record.attributes.trial_id })
            .fetch({ withRelated: ['records', 'records.source'] })
            .then((trial) => {
              should(toJSON(trial).records).deepEqual([
                toJSON(record.toJSONSummary()),
              ]);
            });
        });
    });
  });

  describe('risks_of_bias', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).risks_of_bias).deepEqual([]);
    });

    it('adds the risks of bias and their criteria into the resulting JSON', () => {
      return factory.create('risk_of_bias')
        .then((rob) => {
          const criteria = rob.related('risk_of_bias_criteria');

          return new Trial({ id: rob.attributes.trial_id })
            .fetch({ withRelated: ['risks_of_bias', 'risks_of_bias.risk_of_bias_criteria'] })
            .then((trial) => {
              should(toJSON(trial).risks_of_bias).deepEqual([
                toJSON(rob.toJSON()),
              ]);
            });
        });
    });
  });

  describe('documents', () => {
    it('is an empty array if there\'re none', () => {
      should(toJSON(new Trial()).documents).deepEqual([]);
    });

    it('adds the documents into the resulting JSON', () => {
      let trial_id;
      let doc;

      return factory.create('trial')
        .then((trial) => {
          trial_id = trial.id;

          return factory.create('document').then((_doc) => {
            doc = _doc;

            return trial.documents().attach({
              document_id: doc.id,
            });
          });
        }).then((trial) => {
          return new Trial({ id: trial_id }).fetch({ withRelated: 'documents' })
        }).then((trial) => {
          should(toJSON(trial).documents).deepEqual([
            doc.toJSONSummary(),
          ]);
        });
    });
  });

  describe('trialsPerYear', () => {
    it('is an empty array if there\'re none', () => {
      return new Trial().trialsPerYear().then((result) => {
        should(result).deepEqual([]);
      });
    });

    it('returns trials count per year', () => {
      const registrationDates = [
        { registration_date: '2016-01-01' },
        { registration_date: '2015-01-01' },
        { registration_date: '2016-01-01' },
      ];

      return factory.createMany('trial', registrationDates)
        .then(() => new Trial().trialsPerYear())
        .then((result) => {
          should(result).match([
            { year: 2015, count: 1 },
            { year: 2016, count: 2 },
          ]);
        });
    });

    it('ignores trials without registration_date', () => {
      const registrationDates = [
        { registration_date: '2016-01-01' },
        { registration_date: null },
      ];

      return factory.createMany('trial', registrationDates)
        .then(() => new Trial().trialsPerYear())
        .then((result) => {
          should(result).match([
            { year: 2016, count: 1 },
          ]);
        });
    });
  });

  describe('virtuals', () => {
    describe('sources', () => {
      it('returns the publications sources', () => {
        return factory.create('trialWithRelated')
          .then((trial) => {
            const publications = trial.related('publications');
            const publicationsSourcesIds = publications.map((pub) => pub.attributes.source_id);
            const sources = trial.toJSON().sources;

            should(sources).have.keys(publicationsSourcesIds);
          })
      });

      it('returns the documents sources', () => {
        return factory.create('trialWithRelated')
          .then((trial) => {
            const documents = trial.related('documents');
            const documentsSourcesIds = documents.map((doc) => doc.attributes.source_id);
            const sources = trial.toJSON().sources;

            should(sources).have.keys(documentsSourcesIds);
          })
      });

      it('returns the records sources', () => {
        return factory.create('trialWithRecord')
          .then((trial) => {
            const records = trial.related('records');
            const recordsSourcesIds = records.map((rec) => rec.attributes.source_id);
            const sources = trial.toJSON().sources;

            should(sources).have.keys(recordsSourcesIds);
          })
      });

      it('ignores documents without sources', () => {
        return factory.create('trial')
          .then((trial) => factory.create('document', { source_id: null })
            .then((doc) => trial.documents().attach({
              document_id: doc.id,
            }))
            .then(() => trial.id)
          )
          .then((trial_id) => new Trial({ id: trial_id }).fetch({ withRelated: ['documents', 'documents.source'] }))
          .then((trial) => should(trial.toJSON().sources).deepEqual({}))
      });
    });

    describe('discrepancies', () => {
      it('returns the discrepancies', () => {
        let trial_id;

        return factory.create('trial')
          .then((trial) => trial_id = trial.attributes.id)
          .then(() => factory.createMany('record', [
              {
                trial_id,
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
                trial_id,
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
          .then(() => new Trial({ id: trial_id }).fetch({ withRelated: ['records', 'records.source'] }))
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
        let trial_id;

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
            trial_id = baseFields.trial_id;

            return factory.create('record', baseFields);
          })
          .then(() => new Trial({ id: trial_id }).fetch({ withRelated: ['records', 'records.source'] }))
          .then((trial) => should(trial.discrepancies).be.undefined());
      });

      it('ignores undefined fields', () => {
        let trial_id;

        return factory.create('trial')
          .then((trial) => trial_id = trial.attributes.id)
          .then(() => factory.createMany('record', [{ trial_id, gender: 'male' }, { trial_id, gender: null }]))
          .then(() => new Trial({ id: trial_id }).fetch({ withRelated: ['records', 'records.source'] }))
          .then((trial) => should(trial.discrepancies).be.undefined());
      });

      it('ignores records from EU CTR', () => {
        let trial_id;

        return factory.create('trial')
          .then((trial) => trial_id = trial.attributes.id)
          .then(() => factory.create('source', { id: 'euctr' }))
          .then((euctr) => factory.createMany('record', [
            {
              trial_id,
              source_id: euctr.id,
              gender: 'female',
            },
            {
              trial_id,
              gender: 'both',
            },
          ]))
          .then(() => new Trial({ id: trial_id }).fetch({ withRelated: ['records', 'records.source'] }))
          .then((trial) => should(trial.discrepancies).be.undefined());
      });

      it('ignores records from ICTRP', () => {
        let trial_id;

        return factory.create('trial')
          .then((trial) => trial_id = trial.attributes.id)
          .then(() => factory.create('source', { id: 'ictrp' }))
          .then((ictrp) => factory.createMany('record', [
            {
              trial_id,
              source_id: ictrp.id,
              gender: 'female',
            },
            {
              trial_id,
              gender: 'both',
            },
          ]))
          .then(() => new Trial({ id: trial_id }).fetch({ withRelated: ['records', 'records.source'] }))
          .then((trial) => should(trial.discrepancies).be.undefined());
      });
    });
  });

  describe('toJSONSummary', () => {
    it('returns simplified trial representation', () => {
      return factory.create('trial')
        .then((trial) => trial.toJSONSummary().should.deepEqual({
          id: trial.attributes.id,
          public_title: trial.attributes.public_title,
          url: trial.url,
        }));
    });
  });
});
