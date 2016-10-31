'use strict';

const esHelpers = require('./helpers');
const Document = require('../../api/models/document');


const fdaApprovalMapping = {
  properties: {
    id: {
      type: 'string',
      index: 'not_analyzed',
    },
    notes: {
      type: 'string',
    },
    supplement_number: {
      type: 'integer',
    },
    type: {
      type: 'string',
    },
    action_date: {
      type: 'date',
      format: 'dateOptionalTime',
    },
    fda_application: {
      properties: {
        id: {
          type: 'string',
          index: 'not_analyzed',
        },
        active_ingredients: {
          type: 'string',
        },
        drug_name: {
          type: 'string',
        },
        type: {
          type: 'string',
          index: 'not_analyzed',
        },
        url: {
          type: 'string',
          index: 'not_analyzed',
        },
      },
    },
  },
}

const fdaDocumentMapping = {
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
    fda_approval: fdaApprovalMapping,
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
        pages: {
          type: 'string',
          analyzer: 'english',
        },
      },
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
      },
    },
  },
}

const index = {
  body: {
    mappings: {
      fda_document: fdaDocumentMapping,
    },
  },
}

function indexer(name) {
  return esHelpers.indexModel(
    Document,
    name,
    'fda_document',
    {
      where: {
        source_id: 'fda',
      },
    },
    {
      withRelated: Document.relatedModels,
    }
  )
}

module.exports = {
  alias: 'documents',
  index,
  indexer,
}
