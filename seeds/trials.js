exports.seed = (knex, Promise) => (
  Promise.all([
    // Deletes ALL existing entries
    knex('trials').del(),

    // Inserts seed entries
    knex('trials').insert({
      id: '721f1fea-d7c3-11e5-b5d2-0a1d41d68578',
      primary_register: 'primary_register',
      primary_id: '1',
      secondary_ids: JSON.stringify([]),
      registration_date: new Date('2016-01-01'),
      public_title: 'public_title',
      brief_summary: 'brief_summary',
      recruitment_status: 'recruitment_status',
      eligibility_criteria: JSON.stringify([]),
      study_type: 'study_type',
      study_design: 'study_design',
      study_phase: 'study_phase',
    }),
    knex('trials').insert({
      id: '779e4c98-d7c3-11e5-b5d2-0a1d41d68578',
      primary_register: 'primary_register',
      primary_id: '2',
      secondary_ids: JSON.stringify([]),
      registration_date: new Date('2016-01-02'),
      public_title: 'public_title',
      brief_summary: 'brief_summary',
      recruitment_status: 'recruitment_status',
      eligibility_criteria: JSON.stringify([]),
      study_type: 'study_type',
      study_design: 'study_design',
      study_phase: 'study_phase',
    }),
  ])
);
