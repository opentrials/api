/* eslint-disable max-len */
'use strict';

function _generateRelationships(trials, relationshipName) {
  // Returns list of objects with trial_id, `${relationshipName}`_id, and all
  // attributes in trial[`${relationshipName}s`] except the relationship model
  // itself.
  return trials.reduce((results, trial) => (
    results.concat((trial[`${relationshipName}s`] || []).map((item) => {
      const result = Object.assign({
        trial_id: trial.id,
      }, item);
      result[`${relationshipName}_id`] = item[relationshipName].id;
      delete result[relationshipName];

      return result;
    }))
  ), []);
}

function _getEntries(obj) {
  return Object.keys(obj).map((key) => obj[key]);
}

exports.seed = (knex) => {
  const locations = {
    usa: {
      id: '525740cd-12ef-43ba-87a0-0bf98b2c5026',
      name: 'United States of America',
      type: 'country',
      data: JSON.stringify({}),
    },
    puertoRico: {
      id: '87e4b972-1a03-4b4b-8a6e-d512f99a6c57',
      name: 'Puerto Rico',
      type: 'country',
      data: JSON.stringify({}),
    },
  };

  const interventions = {
    questionnaire: {
      id: '1a2be669-299c-4fc4-aa0c-2cb6ec11a0da',
      name: 'Questionnaire',
      type: 'other',
      data: JSON.stringify({}),
    },
    hiv1mn: {
      id: '15b51693-b455-4851-b54c-911d958b246b',
      name: 'rgp120/HIV-1MN',
      type: 'drug',
      data: JSON.stringify({}),
    },
    hiv1sf2: {
      id: '37db8144-070a-4727-a7fe-d4c61d6c389c',
      name: 'rgp120/HIV-1 SF-2',
      type: 'drug',
      data: JSON.stringify({}),
    },
    placeboHiv1mn: {
      id: '9324a829-8982-4b93-99a4-88f7af32bfac',
      name: 'Placebo version of rgp120/HIV-1MN',
      type: 'other',
      data: JSON.stringify({}),
    },
    placeboHiv1sf2: {
      id: 'b7db98db-dfcd-4bb8-a8a0-8d7bf83c551b',
      name: 'Placebo version of rgp120/HIV-1SF2',
      type: 'other',
      data: JSON.stringify({}),
    },
  };

  const problems = {
    hiv: {
      id: '0ae7346d-09bf-4781-bde0-3c07525c462d',
      name: 'HIV Infections',
      type: 'condition',
      data: JSON.stringify({}),
    },
    hivSeronegativity: {
      id: 'e5e9a8b9-d671-48fc-8310-365f332025c3',
      name: 'HIV Seronegativity',
      type: 'condition',
      data: JSON.stringify({}),
    },
    rectalCancer: {
      id: 'b330752f-ebe1-45c1-a7e3-8c62def8cfb6',
      name: 'Rectal Cancer',
      type: 'condition',
      data: JSON.stringify({}),
    },
    colonCancer: {
      id: 'bb4a6173-afa8-4b3a-8915-c2332f1d7ee1',
      name: 'Colon Cancer',
      type: 'condition',
      data: JSON.stringify({}),
    },
  };

  const persons = {
    salz: {
      id: '201eaf6c-8fc9-49e3-bd1d-4596a6f79487',
      name: 'Talya Salz, PhD',
      type: 'other',
      data: JSON.stringify({}),
    },
  };

  const organisations = {
    niaid: {
      id: '60a0f4b2-b0c5-4d6f-a442-4ef8e31abed5',
      name: 'National Institute of Allergy and Infectious Diseases (NIAID)',
      type: 'other',
      data: JSON.stringify({}),
    },
    mskcc: {
      id: '68b963fa-48d1-4ae8-95ab-0155314c8162',
      name: 'Memorial Sloan Kettering Cancer Center',
      type: 'other',
      data: JSON.stringify({}),
    },
  };

  const trials = [
    {
      id: '05cc77ad-5575-4c04-9309-4c64d5144b07',
      primary_register: 'nct',
      primary_id: 'NCT00000774',
      secondary_ids: JSON.stringify({ others: ['11207'] }),
      registration_date: new Date('1999-11-02'),
      public_title: 'A Phase I Study to Evaluate the Safety and Immunogenicity of Recombinant HIV-1 Envelope Antigen in Children Born to HIV-Infected Mothers',
      brief_summary: 'PRIMARY: To determine the safety of envelope recombinant proteins rgp120/HIV-1MN (Genentech) and rgp120/HIV-1SF2 (Chiron/Biocine) in infants who are of indeterminate HIV status born to HIV-infected women. To evaluate changes in viral load in infants proven to be infected and absolute CD4 counts in all immunized infants. SECONDARY: To evaluate the immunogenicity of these envelope recombinant proteins in infants of indeterminate HIV status born to HIV-infected women. Only 30-50 percent of HIV-infected infants have detectable virus at birth. Successful early sensitization to HIV envelope epitopes may help prevent infection or, alternatively, may enhance HIV-specific immune function to alter HIV replication and disease progression.',
      recruitment_status: 'Completed',
      eligibility_criteria: JSON.stringify([]),
      study_type: 'Interventional',
      study_design: 'Allocation: Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Parallel Assignment, Masking: Double Blind (Subject, Investigator), Primary Purpose: Treatment',
      study_phase: 'Phase 1',
      target_sample_size: 2000,
      gender: 'both',
      has_published_results: true,
      locations: [
        {
          location: locations.usa,
          role: 'recruitment_countries',
          context: JSON.stringify({}),
        },
        {
          location: locations.puertoRico,
          role: 'recruitment_countries',
          context: JSON.stringify({}),
        },
      ],
      interventions: [
        {
          intervention: interventions.hiv1mn,
          context: JSON.stringify({}),
        },
        {
          intervention: interventions.hiv1sf2,
          context: JSON.stringify({}),
        },
        {
          intervention: interventions.placeboHiv1mn,
          context: JSON.stringify({}),
        },
        {
          intervention: interventions.placeboHiv1sf2,
          context: JSON.stringify({}),
        },
      ],
      problems: [
        {
          problem: problems.hiv,
          context: JSON.stringify({}),
        },
        {
          problem: problems.hivSeronegativity,
          context: JSON.stringify({}),
        },
      ],
      organisations: [
        {
          organisation: organisations.niaid,
          role: 'primary_sponsor',
          context: JSON.stringify({}),
        },
      ],
    },
    {
      id: '475456f3-23bc-4f5e-9d19-51f4a1165540',
      primary_register: 'nct',
      primary_id: 'NCT01003600',
      secondary_ids: JSON.stringify({ others: null }),
      public_title: 'Colorectal Cancer Survivors\' Needs and Preferences for Survivorship Information',
      brief_summary: 'We are doing this study to learn more about colon and rectal cancer survivors. We want to know if survivors want more information about life after cancer. Do cancer survivors want to know more about their own cancer? Do cancer survivors want to know about their treatment? Do cancer survivors want to know what health care they should get in the future? We want to know what information to give to cancer survivors when they finish treatment.',
      registration_date: new Date('2009-10-28'),
      recruitment_status: 'Completed',
      eligibility_criteria: JSON.stringify([]),
      study_type: 'Observational',
      study_design: 'Observational Model: Cohort, Time Perspective: Prospective',
      study_phase: 'N/A',
      target_sample_size: 250,
      locations: [
        {
          location: locations.usa,
          role: 'recruitment_countries',
          context: JSON.stringify({}),
        },
      ],
      interventions: [
        {
          intervention: interventions.questionnaire,
          context: JSON.stringify({}),
        },
      ],
      problems: [
        {
          problem: problems.rectalCancer,
          context: JSON.stringify({}),
        },
        {
          problem: problems.colonCancer,
          context: JSON.stringify({}),
        },
      ],
      persons: [
        {
          person: persons.salz,
          role: 'principal_investigator',
          context: JSON.stringify({}),
        },
      ],
      organisations: [
        {
          organisation: organisations.mskcc,
          role: 'primary_sponsor',
          context: JSON.stringify({}),
        },
      ],
    },
  ];

  const trialsLocations = _generateRelationships(trials, 'location');
  const trialsInterventions = _generateRelationships(trials, 'intervention');
  const trialsProblems = _generateRelationships(trials, 'problem');
  const trialsPersons = _generateRelationships(trials, 'person');
  const trialsOrganisations = _generateRelationships(trials, 'organisation');

  const trialsWithoutRelatedModels = trials.map((trial) => {
    const result = Object.assign({}, trial);
    delete result.locations;
    delete result.interventions;
    delete result.problems;
    delete result.persons;
    delete result.organisations;

    return result;
  });

  return knex('trials_locations').del()
    .then(() => knex('locations').del())
    .then(() => knex('trials_interventions').del())
    .then(() => knex('interventions').del())
    .then(() => knex('trials_problems').del())
    .then(() => knex('problems').del())
    .then(() => knex('trials_persons').del())
    .then(() => knex('persons').del())
    .then(() => knex('trials_organisations').del())
    .then(() => knex('organisations').del())
    .then(() => knex('trials').del())
    // Insert
    .then(() => knex('trials').insert(trialsWithoutRelatedModels))
    .then(() => knex('locations').insert(_getEntries(locations)))
    .then(() => knex('trials_locations').insert(trialsLocations))
    .then(() => knex('interventions').insert(_getEntries(interventions)))
    .then(() => knex('trials_interventions').insert(trialsInterventions))
    .then(() => knex('problems').insert(_getEntries(problems)))
    .then(() => knex('trials_problems').insert(trialsProblems))
    .then(() => knex('persons').insert(_getEntries(persons)))
    .then(() => knex('trials_persons').insert(trialsPersons))
    .then(() => knex('organisations').insert(_getEntries(organisations)))
    .then(() => knex('trials_organisations').insert(trialsOrganisations));
};
