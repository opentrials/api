'use strict';

const esHelpers = require('./helpers');
const Trial = require('../../api/models/trial');

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
  ],
  properties: {
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
        type: {
          type: 'string',
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
        public_title: getDiscrepancyRecordMapping({
          type: 'string',
        }),
        brief_summary: getDiscrepancyRecordMapping({
          type: 'string',
        }),
        gender: getDiscrepancyRecordMapping({
          type: 'string',
          index: 'not_analyzed',
        }),
        target_sample_size: getDiscrepancyRecordMapping({
          type: 'integer',
        }),
        registration_date: getDiscrepancyRecordMapping({
          type: 'date',
          format: 'dateOptionalTime',
        }),
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
  },
};


function getDiscrepancyRecordMapping(valueMapping) {
  return {
    properties: {
      field: {
        enabled: 'false',
      },
      records: {
        properties: {
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
      },
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
