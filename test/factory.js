'use strict';

const factory = require('factory-girl').promisify(require('bluebird'));
require('factory-girl-bookshelf')();
const uuid = require('node-uuid');
const Trial = require('../api/models/trial');
const Location = require('../api/models/location');
const Intervention = require('../api/models/intervention');
const Condition = require('../api/models/condition');
const Person = require('../api/models/person');
const Organisation = require('../api/models/organisation');
const Source = require('../api/models/source');
const Record = require('../api/models/record');
const Publication = require('../api/models/publication');
const Document = require('../api/models/document');
const File = require('../api/models/file');

factory.define('publication', Publication, {
  id: () => uuid.v1(),
  source_id: factory.assoc('source', 'id'),
  source_url: factory.sequence((n) => `http://source.com/trial/${n}`),
  title: 'some title',
  abstract: 'abstract',
  journal: 'some journal',
  date: new Date('2016-01-02'),
  slug: factory.sequence((n) => `slug-${n}`),
}, {
  afterCreate: (publication, attrs, callback) => {
    new Publication({ id: publication.id })
      .fetch({ withRelated: Publication.relatedModels })
      .then((instance) => callback(null, instance))
      .catch((err) => callback(err));
  },
});

factory.define('location', Location, {
  id: () => uuid.v1(),
  name: factory.sequence((n) => `location${n}`),
  type: 'country',
});

factory.define('intervention', Intervention, {
  id: () => uuid.v1(),
  name: factory.sequence((n) => `intervention${n}`),
  type: 'drug',
});

factory.define('condition', Condition, {
  id: () => uuid.v1(),
  name: factory.sequence((n) => `condition${n}`),
});

factory.define('person', Person, {
  id: () => uuid.v1(),
  name: factory.sequence((n) => `person${n}`),
});

factory.define('organisation', Organisation, {
  id: () => uuid.v1(),
  name: factory.sequence((n) => `organisation${n}`),
});

factory.define('source', Source, {
  id: () => uuid.v1(),
  name: factory.sequence((n) => `source${n}`),
  url: factory.sequence((n) => `http://example.org/source/${n}`),
  terms_and_conditions_url: factory.sequence((n) => `http://example.org/source/${n}/terms`),
  type: 'register',
});

factory.define('file', File, {
  id: () => uuid.v1(),
  url: factory.sequence((n) => `http://example.org/file${n}.pdf`),
  sha1: factory.sequence(),
  documentcloud_id: factory.sequence((n) => `${n}-file`),
  text: 'Lorem ipsum dolor sit amet',
});

factory.define('document', Document, {
  id: () => uuid.v1(),
  file_id: factory.assoc('file', 'id'),
  source_id: factory.assoc('source', 'id'),
  trial_id: factory.assoc('trial', 'id'),
  name: factory.sequence((n) => `Document ${n}`),
  type: 'other',
});

const trialAttributes = {
  id: () => uuid.v1(),
  identifiers: JSON.stringify({}),
  registration_date: new Date('2016-01-01'),
  target_sample_size: 1000,
  gender: 'both',
  has_published_results: true,
  public_title: 'public_title',
  brief_summary: 'brief_summary',
  status: 'complete',
  recruitment_status: 'not_recruiting',
  eligibility_criteria: JSON.stringify('[]'),
  study_type: 'study_type',
  study_design: 'study_design',
  study_phase: 'study_phase',
};

factory.define('trial', Trial, trialAttributes);

factory.define('trialWithRecord', Trial, trialAttributes, {
  afterCreate: (trial, options, callback) => {
    factory.create('record', { trial_id: trial.id })
    .then(() => new Trial({ id: trial.id }).fetch({ withRelated: Trial.relatedModels }))
    .then((instance) => callback(null, instance))
    .catch((err) => callback(err));
  },
});

factory.define('trialWithRelated', Trial, trialAttributes, {
  afterCreate: (trial, options, callback) => {
    Promise.all([
      factory.create('intervention').then((intervention) => (
          trial.interventions().attach({
            intervention_id: intervention.id,
          })
      )),
      factory.create('condition').then((condition) => (
          trial.conditions().attach({
            condition_id: condition.id,
          })
      )),
      factory.create('location').then((loc) => (
          trial.locations().attach({
            location_id: loc.id,
            role: 'other',
          })
      )),
      factory.create('person').then((person) => (
          trial.persons().attach({
            person_id: person.id,
            role: 'other',
          })
      )),
      factory.create('organisation').then((organisation) => (
          trial.organisations().attach({
            organisation_id: organisation.id,
            role: 'other',
          })
      )),
      factory.create('publication').then((publication) => (
          trial.publications().attach({
            publication_id: publication.id,
          })
      )),
    ])
    .then(() => new Trial({ id: trial.id }).fetch({ withRelated: Trial.relatedModels }))
    .then((instance) => callback(null, instance))
    .catch((err) => callback(err));
  },
});

factory.define('record', Record, Object.assign({}, trialAttributes, {
  id: () => uuid.v1(),
  trial_id: factory.assoc('trial', 'id'),
  source_id: factory.assoc('source', 'id'),
  source_url: factory.sequence((n) => `http://source.com/trial/${n}`),
  source_data: JSON.stringify({}),
}), {
  afterCreate: (record, attrs, callback) => {
    new Record({ id: record.id })
      .fetch({ withRelated: Record.relatedModels })
      .then((instance) => callback(null, instance))
      .catch((err) => callback(err));
  },
});


factory.define('sourceRelatedToSeveralRecords', Source, {
  id: () => uuid.v1(),
  name: 'test_source',
  type: 'register',
}, {
  afterCreate: (source, attrs, callback) => {
    const records = [
      {
        source_id: source.id,
        updated_at: new Date('2015-01-01'),
      },
      {
        source_id: source.id,
        updated_at: new Date('2016-01-01'),
      },
    ];

    factory.createMany('record', records)
      .then(() => callback(null, source))
      .catch((err) => callback(err));
  },
});

module.exports = factory;
