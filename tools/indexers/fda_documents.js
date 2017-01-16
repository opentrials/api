'use strict';

const esHelpers = require('./helpers');
const Document = require('../../api/models/document');


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
    fda_approval: {
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
          copy_to: 'action_date',
        },
        fda_application: {
          properties: {
            id: {
              type: 'string',
              index: 'not_analyzed',
              copy_to: 'application_id',
            },
            active_ingredients: {
              type: 'string',
              copy_to: 'active_ingredients',
            },
            drug_name: {
              type: 'string',
              copy_to: 'drug',
            },
            type: {
              type: 'string',
              index: 'not_analyzed',
              copy_to: 'application_type',
            },
            url: {
              type: 'string',
              index: 'not_analyzed',
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
        public_title: {
          type: 'string',
        },
      },
    },
  },
};

const pageMapping = {
  _parent: {
    type: 'document',
  },
  properties: {
    id: {
      type: 'string',
      index: 'not_analyzed',
    },
    text: {
      type: 'string',
      analyzer: 'english',
    },
    num: {
      type: 'integer',
    },
  },
};

const index = {
  body: {
    mappings: {
      document: fdaDocumentMapping,
      page: pageMapping,
    },
  },
};

function indexer(name) {
  return indexerFDADocuments(name)
    .then(() => indexerPages(name));
}

function indexerFDADocuments(name) {
  return esHelpers.indexModel(
    Document,
    name,
    'document',
    {
      where: {
        source_id: 'fda',
      },
    },
    {
      withRelated: Document.relatedModels,
    },
    (entities) => entities.models.map((entity) => entity.toJSONSummary())
  );
}

function indexerPages(name) {
  return esHelpers.indexModel(
    Document,
    name,
    'page',
    {
      where: {
        source_id: 'fda',
      },
      whereNotNull: 'file_id',
    },
    {
      withRelated: ['file'],
    },
    _convertDocumentsFilesPages,
    1
  );
}

function _convertDocumentsFilesPages(docs) {
  return docs.models.reduce((result, doc) => {
    const docJSON = doc.toJSON();
    const pages = (docJSON.file.pages || []).map((page, i) => (Object.assign(
      {},
      page,
      {
        _parent: docJSON.id,
        // Must add parent's ID because multiple documents can point to the
        // same file. This means we'll be indexing the same file multiple
        // times.
        id: `${docJSON.id}_${docJSON.file.id}_${i + 1}`,
      }
    )));

    return result.concat(pages);
  }, []);
}

module.exports = {
  alias: 'fda_documents',
  index,
  indexer,
};
