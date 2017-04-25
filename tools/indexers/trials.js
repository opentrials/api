'use strict';

const esHelpers = require('./helpers');
const Trial = require('../../api/models/trial');

const sourceMapping = {
  properties: {
    id: {
      type: 'string',
      index: 'not_analyzed',
    },
    name: {
      type: 'string',
      index: 'not_analyzed',
    },
    source_url: {
      type: 'string',
      index: 'not_analyzed',
    },
    terms_and_conditions_url: {
      type: 'string',
      index: 'not_analyzed',
    },
    type: {
      type: 'string',
      index: 'not_analyzed',
    },
  },
};

const trialMapping = {
  dynamic_templates: [
    {
      identifiers_values_arent_analyzed: {
        path_match: 'identifiers.*',
        mapping: {
          type: 'string',
          index: 'not_analyzed',
        },
      },
    },
    {
      sources_consists_of_source_objects: {
        path_match: 'sources.*',
        mapping: sourceMapping,
      },
    },
  ],
  dynamic: 'strict',
  properties: {
    identifiers: {
      type: 'object',
      dynamic: true,
    },
    sources: {
      type: 'object',
      dynamic: true,
    },
    brief_summary: {
      type: 'string',
    },
    url: {
      type: 'string',
      index: 'not_analyzed',
    },
    id: {
      type: 'string',
      index: 'not_analyzed',
    },
    source_id: {
      type: 'string',
      index: 'not_analyzed',
    },
    interventions: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        name: {
          type: 'string',
          copy_to: 'intervention',
        },
        url: {
          type: 'string',
          index: 'not_analyzed',
        },
        type: {
          type: 'string',
          index: 'not_analyzed',
        },
      },
    },
    intervention: {
      type: 'string',
    },
    locations: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        name: {
          type: 'string',
          copy_to: 'location',
        },
        url: {
          type: 'string',
          index: 'not_analyzed',
        },
        type: {
          type: 'string',
          index: 'not_analyzed',
        },
        role: {
          type: 'string',
          index: 'not_analyzed',
        },
      },
    },
    location: {
      type: 'string',
    },
    conditions: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        name: {
          type: 'string',
          copy_to: 'condition',
        },
        url: {
          type: 'string',
          index: 'not_analyzed',
        },
      },
    },
    condition: {
      type: 'string',
    },
    persons: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        name: {
          type: 'string',
          copy_to: 'person',
        },
        url: {
          type: 'string',
          index: 'not_analyzed',
        },
        role: {
          type: 'string',
          index: 'not_analyzed',
        },
      },
    },
    person: {
      type: 'string',
    },
    organisations: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        name: {
          type: 'string',
          copy_to: 'organisation',
        },
        url: {
          type: 'string',
          index: 'not_analyzed',
        },
        role: {
          type: 'string',
          index: 'not_analyzed',
        },
      },
    },
    organisation: {
      type: 'string',
    },
    publications: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        url: {
          type: 'string',
          index: 'not_analyzed',
        },
        title: {
          type: 'string',
          copy_to: 'publication',
        },
        source_url: {
          type: 'string',
          index: 'not_analyzed',
        },
        source_id: {
          type: 'string',
          index: 'not_analyzed',
        },
      },
    },
    publication: {
      type: 'string',
    },
    documents: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        name: {
          type: 'string',
        },
        source_id: {
          type: 'string',
          index: 'not_analyzed',
        },
        source_url: {
          type: 'string',
          index: 'not_analyzed',
        },
        trials: {
          properties: {
            id: {
              type: 'string',
              index: 'not_analyzed',
            },
            url: {
              type: 'string',
              index: 'not_analyzed',
            },
            public_title: {
              type: 'string',
            },
          },
        },
        document_category: {
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'string',
              index: 'not_analyzed',
            },
            group: {
              type: 'string',
              index: 'not_analyzed',
            },
          },
        },
        url: {
          type: 'string',
          index: 'not_analyzed',
        },
        fda_approval: {
          properties: {
            action_date: {
              type: 'date',
              format: 'dateOptionalTime',
            },
            id: {
              type: 'string',
              index: 'not_analyzed',
            },
            notes: {
              type: 'string',
            },
            supplement_number: {
              type: 'long',
            },
            type: {
              type: 'string',
              index: 'not_analyzed',
            },
            fda_application: {
              properties: {
                id: {
                  type: 'string',
                  index: 'not_analyzed',
                },
                type: {
                  type: 'string',
                  index: 'not_analyzed',
                },
                url: {
                  type: 'string',
                  index: 'not_analyzed',
                },
                drug_name: {
                  type: 'string',
                },
                active_ingredients: {
                  type: 'string',
                },
              },
            },
          },
        },
        file: {
          properties: {
            id: {
              type: 'string',
              index: 'not_analyzed',
            },
            documentcloud_id: {
              type: 'string',
              index: 'not_analyzed',
            },
            sha1: {
              type: 'string',
              index: 'not_analyzed',
            },
            source_url: {
              type: 'string',
              index: 'not_analyzed',
            },
          },
        },
      },
    },
    discrepancies: {
      properties: {
        status: getDiscrepancyRecordMapping({
          type: 'string',
          index: 'not_analyzed',
        }),
        recruitment_status: getDiscrepancyRecordMapping({
          type: 'string',
          index: 'not_analyzed',
        }),
        has_published_results: getDiscrepancyRecordMapping({
          type: 'boolean',
        }),
        gender: getDiscrepancyRecordMapping({
          type: 'string',
          index: 'not_analyzed',
        }),
        target_sample_size: getDiscrepancyRecordMapping({
          type: 'integer',
        }),
      },
    },
    records: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        source_id: {
          type: 'string',
          index: 'not_analyzed',
        },
        url: {
          type: 'string',
          index: 'not_analyzed',
        },
        is_primary: {
          type: 'boolean',
        },
        last_verification_date: {
          type: 'date',
          format: 'dateOptionalTime',
        },
        source_url: {
          type: 'string',
          index: 'not_analyzed',
        },
        updated_at: {
          type: 'date',
          format: 'date_time',
        },
      },
    },
    risks_of_bias: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        source_id: {
          type: 'string',
          index: 'not_analyzed',
        },
        source_url: {
          type: 'string',
          index: 'not_analyzed',
        },
        updated_at: {
          type: 'date',
          format: 'date_time',
        },
        created_at: {
          type: 'date',
          format: 'date_time',
        },
        study_id: {
          type: 'string',
          index: 'not_analyzed',
        },
        trial_id: {
          type: 'string',
          index: 'not_analyzed',
        },
        source: sourceMapping,
        risk_of_bias_criteria: {
          properties: {
            id: {
              type: 'string',
              index: 'not_analyzed',
            },
            name: {
              type: 'string',
              index: 'not_analyzed',
            },
            value: {
              type: 'string',
              index: 'not_analyzed',
            },
          },
        },
      },
    },
    public_title: {
      type: 'string',
    },
    target_sample_size: {
      type: 'integer',
    },
    gender: {
      type: 'string',
      index: 'not_analyzed',
    },
    age_range: {
      properties: {
        minimum_age: {
          type: 'string',
        },
        maximum_age: {
          type: 'string',
        },
      },
    },
    has_published_results: {
      type: 'boolean',
    },
    recruitment_status: {
      type: 'string',
      index: 'not_analyzed',
    },
    registration_date: {
      type: 'date',
      format: 'dateOptionalTime',
    },
    completion_date: {
      type: 'date',
      format: 'dateOptionalTime',
    },
    study_phase: {
      type: 'string',
      index: 'not_analyzed',
    },
    status: {
      type: 'string',
      index: 'not_analyzed',
    },
    results_exemption_date: {
      type: 'date',
      format: 'dateOptionalTime',
    },
    source: sourceMapping,
  },
};


function getDiscrepancyRecordMapping(valueMapping) {
  return {
    properties: {
      field: {
        enabled: 'false',
      },
      record_id: {
        type: 'string',
        index: 'not_analyzed',
      },
      source_name: {
        type: 'string',
        index: 'not_analyzed',
      },
      value: valueMapping,
    },
  };
}


module.exports = {
  alias: 'trials',
  index: {
    body: {
      mappings: {
        trial: trialMapping,
      },
    },
  },
  indexer: (indexName) => (
    esHelpers.indexModel(Trial, indexName, 'trial', {}, { withRelated: Trial.relatedModels })
  ),
};
