'use strict';

const factory = require('factory-girl').promisify(require('bluebird'));
require('factory-girl-bookshelf')();
const uuid = require('node-uuid');
const Trial = require('../api/models/trial');
const Location = require('../api/models/location');
const Intervention = require('../api/models/intervention');
const Problem = require('../api/models/problem');
const Person = require('../api/models/person');
const Organisation = require('../api/models/organisation');
const Source = require('../api/models/source');
const Record = require('../api/models/record');

factory.define('location', Location, {
  id: () => uuid.v1(),
  name: factory.sequence((n) => `location${n}`),
  type: 'country',
  data: JSON.stringify(''),
});

factory.define('intervention', Intervention, {
  id: () => uuid.v1(),
  name: factory.sequence((n) => `intervention${n}`),
  type: 'drug',
  data: JSON.stringify(''),
});

factory.define('problem', Problem, {
  id: () => uuid.v1(),
  name: factory.sequence((n) => `problem${n}`),
  type: 'condition',
  data: JSON.stringify(''),
});

factory.define('person', Person, {
  id: () => uuid.v1(),
  name: factory.sequence((n) => `person${n}`),
  type: 'other',
  data: JSON.stringify(''),
});

factory.define('organisation', Organisation, {
  id: () => uuid.v1(),
  name: factory.sequence((n) => `organisation${n}`),
  type: 'other',
  data: JSON.stringify(''),
});

factory.define('source', Source, {
  id: () => uuid.v1(),
  name: factory.sequence((n) => `source${n}`),
  type: 'register',
  data: JSON.stringify(''),
});

const trialAttributes = {
  id: () => uuid.v1(),
  primary_register: 'primary_register',
  primary_id: factory.sequence((n) => `primary_id${n}`),
  identifiers: JSON.stringify([]),
  registration_date: new Date('2016-01-01'),
  target_sample_size: 1000,
  gender: 'both',
  has_published_results: true,
  public_title: 'public_title',
  brief_summary: 'brief_summary',
  recruitment_status: 'recruitment_status',
  eligibility_criteria: JSON.stringify('[]'),
  study_type: 'study_type',
  study_design: 'study_design',
  study_phase: 'study_phase',
};

factory.define('trial', Trial, trialAttributes);

factory.define('trialWithRelated', Trial, trialAttributes, {
  afterCreate: (trial, options, callback) => {
    Promise.all([
      factory.create('intervention').then((intervention) => (
          trial.interventions().attach({
            intervention_id: intervention.id,
            role: 'other',
            context: JSON.stringify(''),
          })
      )),
      factory.create('problem').then((problem) => (
          trial.problems().attach({
            problem_id: problem.id,
            role: 'other',
            context: JSON.stringify(''),
          })
      )),
      factory.create('location').then((loc) => (
          trial.locations().attach({
            location_id: loc.id,
            role: 'other',
            context: JSON.stringify(''),
          })
      )),
      factory.create('person').then((person) => (
          trial.persons().attach({
            person_id: person.id,
            role: 'other',
            context: JSON.stringify(''),
          })
      )),
      factory.create('organisation').then((organisation) => (
          trial.organisations().attach({
            organisation_id: organisation.id,
            role: 'other',
            context: JSON.stringify(''),
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
  created_at: new Date('2016-01-01'),
  updated_at: new Date('2016-04-01'),
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

module.exports = factory;
