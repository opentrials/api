const uuid = require('node-uuid');
const Trial = require('../../api/models/trial');
const Location = require('../../api/models/location');
const Intervention = require('../../api/models/intervention');
const Problem = require('../../api/models/problem');
const Person = require('../../api/models/person');
const Organisation = require('../../api/models/organisation');

function trialFixture() {
  const attributes = {
    primary_register: 'primary_register',
    primary_id: 'primary_id',
    secondary_ids: JSON.stringify([]),
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
  }

  return new Trial(attributes);
}

function locationFixture() {
  const attributes = {
    name: 'UK',
    type: 'country',
    data: JSON.stringify(''),
  };

  return new Location(attributes);
}

function interventionFixture() {
  const attributes = {
    name: 'Placebo',
    type: 'drug',
    data: JSON.stringify(''),
  };

  return new Intervention(attributes);
}

function problemFixture() {
  const attributes = {
    name: 'HIV Infection',
    type: 'condition',
    data: JSON.stringify(''),
  };

  return new Problem(attributes);
}

function personFixture() {
  const attributes = {
    name: 'John Smith',
    type: 'other',
    data: JSON.stringify(''),
  };

  return new Person(attributes);
}

function organisationFixture() {
  const attributes = {
    name: 'PharmaCo',
    type: 'other',
    data: JSON.stringify(''),
  };

  return new Organisation(attributes);
}

function trialWithRelated() {
  let trial_id;

  return trialFixture().save()
    .then((trial) => {
      trial_id = trial.id;

      return Promise.all([
        interventionFixture().save().then((intervention) => (
            trial.interventions().attach({
              intervention_id: intervention.id,
              role: 'other',
              context: JSON.stringify(''),
            })
        )),
        problemFixture().save().then((problem) => (
            trial.problems().attach({
              problem_id: problem.id,
              role: 'other',
              context: JSON.stringify(''),
            })
        )),
        locationFixture().save().then((loc) => (
            trial.locations().attach({
              location_id: loc.id,
              role: 'other',
              context: JSON.stringify(''),
            })
        )),
        personFixture().save().then((person) => (
            trial.persons().attach({
              person_id: person.id,
              role: 'other',
              context: JSON.stringify(''),
            })
        )),
        organisationFixture().save().then((organisation) => (
            trial.organisations().attach({
              organisation_id: organisation.id,
              role: 'other',
              context: JSON.stringify(''),
            })
        )),
      ]);
    }).then(() => {
      return new Trial({ id: trial_id })
        .fetch({ withRelated: Trial.relatedModels });
    });
}

module.exports = {
  trial: trialFixture,
  'location': locationFixture,
  intervention: interventionFixture,
  problem: problemFixture,
  person: personFixture,
  organisation: organisationFixture,
  trialWithRelated: trialWithRelated,
}
