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
      type: 'procedure',
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
    delcor: {
      id: '1a3a35f8-7142-11e6-a0cd-0242ac12000b',
      name: 'DELCOR ASSET CORP',
    },
  };

  const sources = {
    nct: {
      id: 'nct',
      name: 'ClinicalTrials.gov',
      source_url: 'https://clinicaltrials.gov',
      terms_and_conditions_url: 'https://clinicaltrials.gov/ct2/about-site/terms-conditions',
      type: 'register',
    },
    isrctn: {
      id: 'isrctn',
      name: 'ISRCTN',
      source_url: 'http://www.isrctn.com',
      terms_and_conditions_url: 'http://www.isrctn.com/page/terms',
      type: 'register',
    },
    cochrane: {
      id: 'cochrane',
      name: 'Cochrane Library',
      type: 'other',
    },
    fda: {
      id: 'fda',
      name: 'U.S. Food and Drug Administration',
      type: 'other',
    },
    pubmed: {
      id: 'pubmed',
      name: 'PubMed',
      type: 'journal',
    },
  };

  const publications = {
    publication1: {
      id: '7cd88d88-031d-11e6-b512-3e1d05defe00',
      source_id: sources.nct.id,
      source_url: 'https://clinicaltrials.gov/ct2/show/NCT00000774',
      title: 'Test title1',
      abstract: '',
      authors: ['author1', 'author2'],
    },
    publication2: {
      id: '7cd88d88-031d-11e6-b512-3e1d05defe01',
      source_id: sources.nct.id,
      source_url: 'https://clinicaltrials.gov/ct2/show/NCT00000774',
      title: 'Test title2',
      abstract: '',
      authors: ['author1'],
    },
  };

  const files = [
    {
      id: '93adc23a-75b9-11e6-8b77-86f30ca893d3',
      documentcloud_id: '1-example-file',
      sha1: '60b27f004e454aca81b0480209cce5081ec52390',
      source_url: 'http://example.org/file1.pdf',
      pages: [
        'Lorem ipsum dolor sit amet',
        'consectetur adipiscing elit',
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      ],
    },
    {
      id: '9e536a14-75b9-11e6-8b77-86f30ca893d3',
      documentcloud_id: '2-example-file',
      sha1: 'cb99b709a1978bd205ab9dfd4c5aaa1fc91c7523',
      source_url: 'http://example.org/file2.pdf',
      pages: [
        'Sed ut perspiciatis unde omnis iste natus',
        'error sit voluptatem accusantium doloremque laudantium',
      ],
    },
  ];

  const FDAApplications = [
    {
      id: 'ANDA089644',
      active_ingredients: 'LIDOCAINE HYDROCHLORIDE AND EPINEPHRINE',
      drug_name: 'EPINEPHRINE; LIDOCAINE HYDROCHLORIDE',
    },
    {
      id: 'NDA021738',
      active_ingredients: 'EXTINA',
      drug_name: 'KETOCONAZOLE',
      organisation_id: organisations.delcor.id,
    },
  ];

  const FDAApprovals = [
    {
      id: 'ANDA089644-000',
      supplement_number: 0,
      type: 'Approval',
      action_date: new Date('2015-07-07'),
      notes: 'Label is not available',
      fda_application_id: FDAApplications[0].id,
    },
    {
      id: 'NDA021738-000',
      supplement_number: 0,
      type: 'Approval',
      action_date: new Date('2015-07-07'),
      fda_application_id: FDAApplications[1].id,
    },
  ];

  const documentCategories = [
    {
      id: 33,
      name: 'Patient information sheet / Consent form',
      group: 'Study documents',
    },
    {
      id: 22,
      name: 'Clinical study report',
      group: 'Results',
    },
    {
      id: 20,
      name: 'Other',
    },
  ];

  const documents = [
    {
      id: '77b81059-19b2-4f5d-a00b-85b9c12b6002',
      source_id: sources.nct.id,
      name: 'Blank Consent Form',
      document_category_id: documentCategories[0].id,
      source_url: 'http://example.com/7a80616a-9c2d-11e6-8e62-e4b3181a2c8c',
    },
    {
      id: 'e43a38cc-6a32-44f3-9f97-d4859fc6de47',
      source_id: sources.isrctn.id,
      file_id: files[1].id,
      name: 'Clinical Study Report (CSR)',
      document_category_id: documentCategories[1].id,
    },
    {
      id: '7a80616a-9c2d-11e6-8e62-e4b3181a2c8c',
      source_id: sources.fda.id,
      file_id: files[0].id,
      name: 'FDA approval document',
      document_category_id: documentCategories[2].id,
      fda_approval_id: FDAApprovals[0].id,
    },
    {
      id: '1d12e160-9c37-11e6-8e62-e4b3181a2c8c',
      source_id: sources.fda.id,
      file_id: files[1].id,
      name: 'FDA approval document',
      document_category_id: documentCategories[2].id,
      fda_approval_id: FDAApprovals[1].id,
    },
  ];

  const trials = [
    {
      id: '05cc77ad-5575-4c04-9309-4c64d5144b07',
      identifiers: { nct: 'NCT00000774', isrctn: 'ISRCTN2342342' },
      source_id: sources.nct.id,
      registration_date: new Date('1999-11-02'),
      completion_date: new Date('2002-02-12'),
      results_exemption_date: new Date('2001-09-14'),
      public_title: 'A Phase I Study to Evaluate the Safety and Immunogenicity of Recombinant HIV-1 Envelope Antigen in Children Born to HIV-Infected Mothers',
      brief_summary: 'PRIMARY: To determine the safety of envelope recombinant proteins rgp120/HIV-1MN (Genentech) and rgp120/HIV-1SF2 (Chiron/Biocine) in infants who are of indeterminate HIV status born to HIV-infected women. To evaluate changes in viral load in infants proven to be infected and absolute CD4 counts in all immunized infants. SECONDARY: To evaluate the immunogenicity of these envelope recombinant proteins in infants of indeterminate HIV status born to HIV-infected women. Only 30-50 percent of HIV-infected infants have detectable virus at birth. Successful early sensitization to HIV envelope epitopes may help prevent infection or, alternatively, may enhance HIV-specific immune function to alter HIV replication and disease progression.',
      status: 'complete',
      recruitment_status: 'not_recruiting',
      eligibility_criteria: JSON.stringify([]),
      study_type: 'Interventional',
      study_design: 'Allocation: Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Parallel Assignment, Masking: Double Blind (Subject, Investigator), Primary Purpose: Treatment',
      study_phase: ['Phase 1', 'Phase 2'],
      target_sample_size: 2000,
      gender: 'both',
      age_range: {
        min_age: '18 Years',
        max_age: '60 Years',
      },
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
      documents: [
        {
          document: documents[0],
        },
        {
          document: documents[3],
        },
      ],
    },
    {
      id: '475456f3-23bc-4f5e-9d19-51f4a1165540',
      identifiers: { nct: 'NCT01003600' },
      source_id: sources.nct.id,
      public_title: 'Colorectal Cancer Survivors\' Needs and Preferences for Survivorship Information',
      brief_summary: 'We are doing this study to learn more about colon and rectal cancer survivors. We want to know if survivors want more information about life after cancer. Do cancer survivors want to know more about their own cancer? Do cancer survivors want to know about their treatment? Do cancer survivors want to know what health care they should get in the future? We want to know what information to give to cancer survivors when they finish treatment.',
      registration_date: new Date('2009-10-28'),
      status: 'ongoing',
      recruitment_status: 'recruiting',
      eligibility_criteria: JSON.stringify([]),
      study_type: 'Observational',
      study_design: 'Observational Model: Cohort, Time Perspective: Prospective',
      study_phase: ['Not applicable'],
      target_sample_size: 250,
      age_range: {
        min_age: '18 Years',
      },
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
      documents: [
        {
          document: documents[1],
        },
        {
          document: documents[2],
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
      is_primary: true,
      identifiers: { nct: 'NCT00000774', isrctn: '1234567890' },
      registration_date: new Date('1999-11-02'),
      completion_date: new Date('2002-02-12'),
      results_exemption_date: new Date('2001-09-14'),
      last_verification_date: new Date('2001-04-30'),
      public_title: 'A Phase I Study to Evaluate the Safety and Immunogenicity of Recombinant HIV-1 Envelope Antigen in Children Born to HIV-Infected Mothers',
      brief_summary: 'PRIMARY: To determine the safety of envelope recombinant proteins rgp120/HIV-1MN (Genentech) and rgp120/HIV-1SF2 (Chiron/Biocine) in infants who are of indeterminate HIV status born to HIV-infected women. To evaluate changes in viral load in infants proven to be infected and absolute CD4 counts in all immunized infants. SECONDARY: To evaluate the immunogenicity of these envelope recombinant proteins in infants of indeterminate HIV status born to HIV-infected women. Only 30-50 percent of HIV-infected infants have detectable virus at birth. Successful early sensitization to HIV envelope epitopes may help prevent infection or, alternatively, may enhance HIV-specific immune function to alter HIV replication and disease progression.',
      status: 'complete',
      recruitment_status: 'not_recruiting',
      eligibility_criteria: JSON.stringify([]),
      study_type: 'Interventional',
      study_design: 'Allocation: Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Parallel Assignment, Masking: Double Blind (Subject, Investigator), Primary Purpose: Treatment',
      study_phase: ['Phase 1'],
      target_sample_size: 2000,
      gender: 'both',
      has_published_results: true,
    },
    {
      id: '2e3406c4-031f-11e6-b512-3e1d05defe78',
      trial_id: trials[1].id,
      source_id: sources.isrctn.id,
      source_url: 'http://www.isrctn.com/ISRCTN11631712',
      is_primary: true,
      identifiers: { isrctn: 'ISRCTN11631712' },
      public_title: 'A randomised controlled trial of faecal occult blood screening for colorectal cancer',
      brief_summary: 'We are doing this study to learn more about colon and rectal cancer survivors. We want to know if survivors want more information about life after cancer. Do cancer survivors want to know more about their own cancer? Do cancer survivors want to know about their treatment? Do cancer survivors want to know what health care they should get in the future? We want to know what information to give to cancer survivors when they finish treatment.',
      registration_date: new Date('2009-10-28'),
      last_verification_date: null,
      status: 'complete',
      recruitment_status: 'not_recruiting',
      eligibility_criteria: JSON.stringify([]),
      study_type: 'Observational',
      study_design: 'Observational Model: Cohort, Time Perspective: Prospective',
      study_phase: ['Not applicable'],
      target_sample_size: 250,
    },
    {
      id: '8e1e260c-4dad-4cc6-bab5-eb414cbde32d',
      trial_id: trials[1].id,
      source_id: sources.nct.id,
      source_url: 'https://clinicaltrials.gov/ct2/show/NCT00403793',
      is_primary: false,
      identifiers: { nct: 'NCT00403793' },
      public_title: 'Hormonal Contraception in Healthy Young Men (P42306)(COMPLETED)(P06057)',
      brief_summary: 'Male volunteers receive a new hormonal contraceptive consisting of an implant releasing a hormone and hormone injections in order to investigate the suppressive effect on sperm production and reversibility of sperm production after end of treatment.',
      registration_date: new Date('2006-11-22'),
      last_verification_date: new Date('2015-07-01'),
      status: 'complete',
      recruitment_status: 'not_recruiting',
      eligibility_criteria: JSON.stringify([]),
      study_type: 'Interventional',
      study_design: 'Allocation: Randomized, Endpoint Classification: Safety/Efficacy Study, Intervention Model: Parallel Assignment, Masking: Double Blind (Subject, Investigator), Primary Purpose: Prevention',
      study_phase: ['Phase 2'],
      target_sample_size: 350,
      created_at: new Date('2016-12-05'),
      updated_at: new Date('2017-01-18'),
    },
  ];

  const riskOfBiasCriterias = [
    {
      id: '756b06ca-8414-11e6-a6fa-e4b3181a2c8c',
      name: 'blinding',
    },
    {
      id: '7036b016-841c-11e6-a6fa-e4b3181a2c8c',
      name: 'detection bias',
    },
  ];

  const riskOfBiases = [
    {
      id: 'fbc67980-83af-11e6-831c-e4b3181a2c8c',
      source_id: sources.cochrane.id,
      trial_id: trials[0].id,
      source_url: 'http://onlinelibrary.wiley.com/doi/10.1002/14651858.CD006081/full',
      study_id: 'STD-Barr-2013',
    },
    {
      id: '44470c86-83ee-11e6-a6fa-e4b3181a2c8c',
      source_id: sources.cochrane.id,
      trial_id: trials[1].id,
      source_url: 'http://onlinelibrary.wiley.com/doi/10.1002/14651858.CD009766/full',
      study_id: 'STD-Bell-2008',
    },
  ];

  const riskOfBiasesriskOfBiasCriterias = [
    {
      risk_of_bias_id: riskOfBiases[0].id,
      risk_of_bias_criteria_id: riskOfBiasCriterias[0].id,
      value: 'unknown',
    },
    {
      risk_of_bias_id: riskOfBiases[1].id,
      risk_of_bias_criteria_id: riskOfBiasCriterias[1].id,
      value: 'yes',
    },
  ];

  const trialsLocations = _generateRelationships(trials, 'location');
  const trialsInterventions = _generateRelationships(trials, 'intervention');
  const trialsConditions = _generateRelationships(trials, 'condition');
  const trialsPersons = _generateRelationships(trials, 'person');
  const trialsOrganisations = _generateRelationships(trials, 'organisation');
  const trialsPublications = _generateRelationships(trials, 'publication');
  const trialsDocuments = _generateRelationships(trials, 'document');

  const trialsWithoutRelatedModels = trials.map((trial) => {
    const result = Object.assign({}, trial);
    delete result.locations;
    delete result.interventions;
    delete result.conditions;
    delete result.persons;
    delete result.organisations;
    delete result.publications;
    delete result.documents;

    return result;
  });

  return knex('trials_locations').del()
    .then(() => knex('locations').del())
    .then(() => knex('trials_documents').del())
    .then(() => knex('documents').del())
    .then(() => knex('fda_approvals').del())
    .then(() => knex('fda_applications').del())
    .then(() => knex('files').del())
    .then(() => knex('trials_interventions').del())
    .then(() => knex('interventions').del())
    .then(() => knex('trials_conditions').del())
    .then(() => knex('conditions').del())
    .then(() => knex('trials_persons').del())
    .then(() => knex('persons').del())
    .then(() => knex('trials_organisations').del())
    .then(() => knex('organisations').del())
    .then(() => knex('trial_deduplication_logs').del())
    .then(() => knex('records').del())
    .then(() => knex('trials_publications').del())
    .then(() => knex('publications').del())
    .then(() => knex('risk_of_biases_risk_of_bias_criterias').del())
    .then(() => knex('risk_of_biases').del())
    .then(() => knex('risk_of_bias_criterias').del())
    .then(() => knex('trials').del())
    .then(() => knex('sources').del())
    // Insert
    .then(() => knex('sources').insert(_getEntries(sources)))
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
    .then(() => knex('publications').insert(_getEntries(publications)))
    .then(() => knex('trials_publications').insert(trialsPublications))
    .then(() => knex('files').insert(files))
    .then(() => knex('fda_applications').insert(FDAApplications))
    .then(() => knex('fda_approvals').insert(FDAApprovals))
    .then(() => knex('documents').insert(documents))
    .then(() => knex('trials_documents').insert(trialsDocuments))
    .then(() => knex('risk_of_biases').insert(riskOfBiases))
    .then(() => knex('risk_of_bias_criterias').insert(riskOfBiasCriterias))
    .then(() => knex('risk_of_biases_risk_of_bias_criterias').insert(riskOfBiasesriskOfBiasCriterias))
    .then(() => knex('records').insert(records));
};
