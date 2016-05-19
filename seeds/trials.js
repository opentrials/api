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
    },
    puertoRico: {
      id: '87e4b972-1a03-4b4b-8a6e-d512f99a6c57',
      name: 'Puerto Rico',
      type: 'country',
    },
  };

  const interventions = {
    questionnaire: {
      id: '1a2be669-299c-4fc4-aa0c-2cb6ec11a0da',
      name: 'Questionnaire',
      type: 'other',
    },
    hiv1mn: {
      id: '15b51693-b455-4851-b54c-911d958b246b',
      name: 'rgp120/HIV-1MN',
      type: 'drug',
    },
    hiv1sf2: {
      id: '37db8144-070a-4727-a7fe-d4c61d6c389c',
      name: 'rgp120/HIV-1 SF-2',
      type: 'drug',
    },
    placeboHiv1mn: {
      id: '9324a829-8982-4b93-99a4-88f7af32bfac',
      name: 'Placebo version of rgp120/HIV-1MN',
      type: 'other',
    },
    placeboHiv1sf2: {
      id: 'b7db98db-dfcd-4bb8-a8a0-8d7bf83c551b',
      name: 'Placebo version of rgp120/HIV-1SF2',
      type: 'other',
    },
  };

  const conditions = {
    hiv: {
      id: '0ae7346d-09bf-4781-bde0-3c07525c462d',
      name: 'HIV Infections',
    },
    hivSeronegativity: {
      id: 'e5e9a8b9-d671-48fc-8310-365f332025c3',
      name: 'HIV Seronegativity',
    },
    rectalCancer: {
      id: 'b330752f-ebe1-45c1-a7e3-8c62def8cfb6',
      name: 'Rectal Cancer',
    },
    colonCancer: {
      id: 'bb4a6173-afa8-4b3a-8915-c2332f1d7ee1',
      name: 'Colon Cancer',
    },
  };

  const persons = {
    salz: {
      id: '201eaf6c-8fc9-49e3-bd1d-4596a6f79487',
      name: 'Talya Salz, PhD',
    },
  };

  const organisations = {
    niaid: {
      id: '60a0f4b2-b0c5-4d6f-a442-4ef8e31abed5',
      name: 'National Institute of Allergy and Infectious Diseases (NIAID)',
    },
    mskcc: {
      id: '68b963fa-48d1-4ae8-95ab-0155314c8162',
      name: 'Memorial Sloan Kettering Cancer Center',
    },
  };

  const sources = {
    nct: {
      id: 'nct',
      name: 'nct',
      type: 'register',
    },
    isrctn: {
      id: 'isrctn',
      name: 'isrctn',
      type: 'register',
    },
  };

  const publications = {
    publication1: {
      id: '7cd88d88-031d-11e6-b512-3e1d05defe00',
      created_at: new Date('2016-01-01'),
      updated_at: new Date('2016-04-01'),
      source_id: sources.nct.id,
      source_url: 'https://clinicaltrials.gov/ct2/show/NCT00000774',
      title: 'Test title1',
      abstract: '',
      authors: ['author1', 'author2'],
    },
    publication2: {
      id: '7cd88d88-031d-11e6-b512-3e1d05defe01',
      created_at: new Date('2016-01-01'),
      updated_at: new Date('2016-04-01'),
      source_id: sources.nct.id,
      source_url: 'https://clinicaltrials.gov/ct2/show/NCT00000774',
      title: 'Test title2',
      abstract: '',
      authors: ['author1'],
    },
  };


  const trials = [
    {
      id: '05cc77ad-5575-4c04-9309-4c64d5144b07',
      primary_register: 'nct',
      primary_id: 'NCT00000774',
      identifiers: JSON.stringify({ others: ['11207'] }),
      registration_date: new Date('1999-11-02'),
      public_title: 'A Phase I Study to Evaluate the Safety and Immunogenicity of Recombinant HIV-1 Envelope Antigen in Children Born to HIV-Infected Mothers',
      brief_summary: 'PRIMARY: To determine the safety of envelope recombinant proteins rgp120/HIV-1MN (Genentech) and rgp120/HIV-1SF2 (Chiron/Biocine) in infants who are of indeterminate HIV status born to HIV-infected women. To evaluate changes in viral load in infants proven to be infected and absolute CD4 counts in all immunized infants. SECONDARY: To evaluate the immunogenicity of these envelope recombinant proteins in infants of indeterminate HIV status born to HIV-infected women. Only 30-50 percent of HIV-infected infants have detectable virus at birth. Successful early sensitization to HIV envelope epitopes may help prevent infection or, alternatively, may enhance HIV-specific immune function to alter HIV replication and disease progression.',
      recruitment_status: 'complete',
      eligibility_criteria: JSON.stringify([]),
      study_type: 'Interventional',
      study_design: 'Allocation: Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Parallel Assignment, Masking: Double Blind (Subject, Investigator), Primary Purpose: Treatment',
      study_phase: 'Phase 1',
      target_sample_size: 2000,
      gender: 'both',
      has_published_results: true,
      publications: [
        {
          publication: publications.publication1,
        },
        {
          publication: publications.publication2,
        },
      ],
      locations: [
        {
          location: locations.usa,
          role: 'recruitment_countries',
        },
        {
          location: locations.puertoRico,
          role: 'recruitment_countries',
        },
      ],
      interventions: [
        {
          intervention: interventions.hiv1mn,
        },
        {
          intervention: interventions.hiv1sf2,
        },
        {
          intervention: interventions.placeboHiv1mn,
        },
        {
          intervention: interventions.placeboHiv1sf2,
        },
      ],
      conditions: [
        {
          condition: conditions.hiv,
        },
        {
          condition: conditions.hivSeronegativity,
        },
      ],
      organisations: [
        {
          organisation: organisations.niaid,
          role: 'primary_sponsor',
        },
      ],
    },
    {
      id: '475456f3-23bc-4f5e-9d19-51f4a1165540',
      primary_register: 'nct',
      primary_id: 'NCT01003600',
      identifiers: JSON.stringify({ others: null }),
      public_title: 'Colorectal Cancer Survivors\' Needs and Preferences for Survivorship Information',
      brief_summary: 'We are doing this study to learn more about colon and rectal cancer survivors. We want to know if survivors want more information about life after cancer. Do cancer survivors want to know more about their own cancer? Do cancer survivors want to know about their treatment? Do cancer survivors want to know what health care they should get in the future? We want to know what information to give to cancer survivors when they finish treatment.',
      registration_date: new Date('2009-10-28'),
      recruitment_status: 'complete',
      eligibility_criteria: JSON.stringify([]),
      study_type: 'Observational',
      study_design: 'Observational Model: Cohort, Time Perspective: Prospective',
      study_phase: 'N/A',
      target_sample_size: 250,
      locations: [
        {
          location: locations.usa,
          role: 'recruitment_countries',
        },
      ],
      interventions: [
        {
          intervention: interventions.questionnaire,
        },
      ],
      conditions: [
        {
          condition: conditions.rectalCancer,
        },
        {
          condition: conditions.colonCancer,
        },
      ],
      persons: [
        {
          person: persons.salz,
          role: 'principal_investigator',
        },
      ],
      organisations: [
        {
          organisation: organisations.mskcc,
          role: 'primary_sponsor',
        },
      ],
    },
  ];

  // Records
  const records = [
    {
      id: '7cd88d88-031d-11e6-b512-3e1d05defe78',
      trial_id: trials[0].id,
      source_id: sources.nct.id,
      source_url: 'https://clinicaltrials.gov/ct2/show/NCT00000774',
      source_data: JSON.stringify({
        contacts: [
          {
            address: null,
            affilation: 'National University of Ireland, Galway',
            email: null,
            first_name: ' ',
            last_name: 'Amir Shafat, PhD',
            telephone: null,
          },
          {
            address: null,
            affilation: null,
            email: null,
            first_name: null,
            last_name: null,
            telephone: null,
          },
        ],
        countries_of_recruitment: [
          'Ireland',
        ],
        date_of_first_enrollment: 'April 2012',
        date_of_registration: '01/05/2013',
        health_conditions_or_conditions_studied: [
          'Diabetes Mellitus, Type 2',
        ],
        interventions: [
          'Other: Oral glucose breath test',
        ],
        key_inclusion_exclusion_criteria: null,
        last_refreshed_on: '2015-02-19',
        main_id: 'NCT01846767',
        meta_created: '2016-03-16T11:38:55Z',
        meta_id: '803bf32845d64a45ac21983a67302016',
        meta_source: 'http://apps.who.int/trialsearch/Trial3.aspx?trialid=NCT01846767',
        meta_updated: '2016-03-16T11:38:55Z',
        primary_outcomes: [
          'Peak Delta over baseline in 13CO2 breath enrichment',
        ],
        primary_sponsor: 'National University of Ireland, Galway, Ireland',
        public_title: 'Exogenous Glucose Oxidation Breath Test',
        recruitment_status: 'complete',
        register: 'ClinicalTrials.gov',
        scientific_title: 'Study of the Metabolism of 13C Labelled Glucose to 13CO2 in Human Breath',
        identifiers: [
          '13CGLU',
        ],
        secondary_outcomes: [
          'Per cent dose recovered',
        ],
        secondary_sponsors: [
          'Irish Endocrine Society',
        ],
        sources_of_monetary_support: [
          'Please refer to primary and secondary sponsors',
        ],
        study_design: 'Allocation: Randomized, Intervention Model: Parallel Assignment, Masking: Double Blind (Investigator, Outcomes Assessor), Primary Purpose: Basic Science',
        study_phase: 'N/A',
        study_type: 'Interventional',
        target_sample_size: 46,
        url: 'http://clinicaltrials.gov/show/NCT01846767',
      }),

      primary_register: 'nct',
      primary_id: 'NCT00000774',
      identifiers: JSON.stringify({ others: ['11207'] }),
      registration_date: new Date('1999-11-02'),
      public_title: 'A Phase I Study to Evaluate the Safety and Immunogenicity of Recombinant HIV-1 Envelope Antigen in Children Born to HIV-Infected Mothers',
      brief_summary: 'PRIMARY: To determine the safety of envelope recombinant proteins rgp120/HIV-1MN (Genentech) and rgp120/HIV-1SF2 (Chiron/Biocine) in infants who are of indeterminate HIV status born to HIV-infected women. To evaluate changes in viral load in infants proven to be infected and absolute CD4 counts in all immunized infants. SECONDARY: To evaluate the immunogenicity of these envelope recombinant proteins in infants of indeterminate HIV status born to HIV-infected women. Only 30-50 percent of HIV-infected infants have detectable virus at birth. Successful early sensitization to HIV envelope epitopes may help prevent infection or, alternatively, may enhance HIV-specific immune function to alter HIV replication and disease progression.',
      recruitment_status: 'complete',
      eligibility_criteria: JSON.stringify([]),
      study_type: 'Interventional',
      study_design: 'Allocation: Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Parallel Assignment, Masking: Double Blind (Subject, Investigator), Primary Purpose: Treatment',
      study_phase: 'Phase 1',
      target_sample_size: 2000,
      gender: 'both',
      has_published_results: true,
      created_at: new Date('2016-01-01'),
      updated_at: new Date('2016-04-01'),
    },
    {
      id: '2e3406c4-031f-11e6-b512-3e1d05defe78',
      trial_id: trials[0].id,
      source_id: sources.isrctn.id,
      source_url: 'http://www.isrctn.com/ISRCTN11631712',
      source_data: JSON.stringify({
        acronym: null,
        age_group: 'Not Specified',
        clinicaltrialsgov_number: null,
        condition: 'Cancer',
        condition_category: 'Cancer',
        contacts: [
          {
            contact_details: 'Section of Surgery  Floor E  West Block  Queen\'s Medical Centre  Nottingham  NG7 2UH  United Kingdom',
            primary_contact: 'Prof JH Scholefield',
            type: 'Scientific',
          },
        ],
        countries_of_recruitment: 'United Kingdom',
        date_applied: '2000-04-06',
        date_assigned: '2000-04-06',
        doi_isrctn_id: 'DOI 10.1186/ISRCTN11631712',
        drug_names: null,
        ethics_approval: 'Not provided at time of registration.',
        eudract_number: null,
        funders: [
          {
            alternative_names: 'MRC',
            funder_name: 'Medical Research Council (UK)',
            funder_type: 'Government',
            funding_body_subtype: 'other non-profit',
            funding_body_type: 'private sector organisation',
            location: 'United Kingdom',
          },
        ],
        gender: 'Not Specified',
        intention_to_publish_date: null,
        intervention: 'Haemoccult faecal occult blood screening test/control',
        intervention_type: 'Other',
        isrctn_id: 'ISRCTN11631712',
        last_edited: '2009-07-27',
        meta_created: '2016-02-04T09:56:08Z',
        meta_id: '0bb859ee5495440c8ae5e7ca41cd46c1',
        meta_source: 'http://www.isrctn.com/ISRCTN11631712?filters=GT+lastEdited%3A2001-01-01T00%3A00%3A00.000Z%2CLE+lastEdited%3A2016-02-04T00%3A00%3A00.000Z&offset=14262&page=143&pageSize=100&q=&searchType=advanced-search&sort=&totalResults=14298',
        meta_updated: '2016-02-04T09:56:08Z',
        overall_trial_end_date: '2009-09-30',
        overall_trial_start_date: '1984-01-01',
        overall_trial_status: 'Completed',
        participant_exclusion_criteria: 'Colorectal cancer within 5 yrs of entry date/GPs discretion',
        participant_inclusion_criteria: 'Population aged 50-74 years (June 06: changed from 50-75 years)',
        participant_level_data: 'Not provided at time of registration',
        participant_type: 'Patient',
        patient_information_sheet: null,
        phase: 'Not Specified',
        plain_english_summary: 'Not provided at time of registration',
        primary_outcome_measures: 'Not provided at time of registration.',
        primary_study_design: 'Interventional',
        prospectiveretrospective: 'Retrospectively registered',
        protocolserial_number: 'G8317732/G9826520',
        publication_and_dissemination_plan: 'Not provided at time of registration',
        publication_summary: '1. 1996 results in  http://www.ncbi.nlm.nih.gov/pubmed/8942775 2. 2002 results in  http://www.ncbi.nlm.nih.gov/pubmed/12010887',
        reason_abandoned: null,
        recruitment_end_date: '2009-09-30',
        recruitment_start_date: '1984-01-01',
        recruitment_status: 'suspended',
        scientific_title: null,
        secondary_outcome_measures: 'Not provided at time of registration.',
        secondary_study_design: 'Randomised controlled trial',
        sponsors: [
          {
            organisation: 'Medical Research Council (MRC) (UK)',
            sponsor_details: '20 Park Crescent  London  W1B 1AL  United Kingdom  \\n            \\n                +44 (0)20 7636 5422  \\n            \\n            \\n                 clinical.trial@headoffice.mrc.ac.uk',
            sponsor_type: 'Research council',
            website: 'http://www.mrc.ac.uk',
          },
        ],
        study_design: 'Randomised controlled trial',
        study_hypothesis: 'Demonstrate possible reduction in mortality from screening for colorectal cancer',
        target_number_of_participants: '152,000',
        title: 'A randomised controlled trial of faecal occult blood screening for colorectal cancer',
        trial_participating_centre: 'Section of Surgery \\n    \\n    \\n    \\n        Nottingham \\n    \\n    \\n        NG7 2UH \\n    \\n    \\n        United Kingdom',
        trial_setting: 'Not specified',
        trial_type: 'Not Specified',
        trial_website: null,
      }),

      primary_register: 'isrctn',
      primary_id: 'ISRCTN11631712',
      identifiers: JSON.stringify({ others: null }),
      public_title: 'A randomised controlled trial of faecal occult blood screening for colorectal cancer',
      brief_summary: 'We are doing this study to learn more about colon and rectal cancer survivors. We want to know if survivors want more information about life after cancer. Do cancer survivors want to know more about their own cancer? Do cancer survivors want to know about their treatment? Do cancer survivors want to know what health care they should get in the future? We want to know what information to give to cancer survivors when they finish treatment.',
      registration_date: new Date('2009-10-28'),
      recruitment_status: 'complete',
      eligibility_criteria: JSON.stringify([]),
      study_type: 'Observational',
      study_design: 'Observational Model: Cohort, Time Perspective: Prospective',
      study_phase: 'N/A',
      target_sample_size: 250,
      created_at: new Date('2016-01-20'),
      updated_at: new Date('2016-04-20'),
    },
  ];

  const trialsLocations = _generateRelationships(trials, 'location');
  const trialsInterventions = _generateRelationships(trials, 'intervention');
  const trialsConditions = _generateRelationships(trials, 'condition');
  const trialsPersons = _generateRelationships(trials, 'person');
  const trialsOrganisations = _generateRelationships(trials, 'organisation');
  const trialsPublications = _generateRelationships(trials, 'publication');

  const trialsWithoutRelatedModels = trials.map((trial) => {
    const result = Object.assign({}, trial);
    delete result.locations;
    delete result.interventions;
    delete result.conditions;
    delete result.persons;
    delete result.organisations;
    delete result.publications;

    return result;
  });

  return knex('trials_locations').del()
    .then(() => knex('locations').del())
    .then(() => knex('trials_interventions').del())
    .then(() => knex('interventions').del())
    .then(() => knex('trials_conditions').del())
    .then(() => knex('conditions').del())
    .then(() => knex('trials_persons').del())
    .then(() => knex('persons').del())
    .then(() => knex('trials_organisations').del())
    .then(() => knex('organisations').del())
    .then(() => knex('records').del())
    .then(() => knex('trials_publications').del())
    .then(() => knex('publications').del())
    .then(() => knex('sources').del())
    .then(() => knex('trials').del())
    // Insert
    .then(() => knex('trials').insert(trialsWithoutRelatedModels))
    .then(() => knex('locations').insert(_getEntries(locations)))
    .then(() => knex('trials_locations').insert(trialsLocations))
    .then(() => knex('interventions').insert(_getEntries(interventions)))
    .then(() => knex('trials_interventions').insert(trialsInterventions))
    .then(() => knex('conditions').insert(_getEntries(conditions)))
    .then(() => knex('trials_conditions').insert(trialsConditions))
    .then(() => knex('persons').insert(_getEntries(persons)))
    .then(() => knex('trials_persons').insert(trialsPersons))
    .then(() => knex('organisations').insert(_getEntries(organisations)))
    .then(() => knex('trials_organisations').insert(trialsOrganisations))
    .then(() => knex('sources').insert(_getEntries(sources)))
    .then(() => knex('publications').insert(_getEntries(publications)))
    .then(() => knex('trials_publications').insert(trialsPublications))
    .then(() => knex('records').insert(records));
};
