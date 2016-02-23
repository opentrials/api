const uuid = require('node-uuid');
const Trial = require('../../api/models/trial');
const Location = require('../../api/models/location');

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

function locationFixture() {
  const loc = {
    name: 'UK',
    type: 'country',
    data: JSON.stringify(''),
  };

  return new Location(loc);
}

module.exports = {
  trial: trialFixture,
  'location': locationFixture,
}
