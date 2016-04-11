exports.seed = (knex) => {
  const locations = [
    {
      id: '1c28f8fa-fce8-11e5-86aa-5e5517507c66',
      name: 'Brazil',
      type: 'country',
      data: JSON.stringify({}),
    }, {
      id: '9025b75c-ffc7-11e5-86aa-5e5517507c66',
      name: 'United States of America',
      type: 'country',
      data: JSON.stringify({}),
    }, {
      id: '30433d28-fce8-11e5-86aa-5e5517507c66',
      name: 'United Kingdom',
      type: 'country',
      data: JSON.stringify({}),
    }, {
      id: '4871c0f4-fce8-11e5-86aa-5e5517507c66',
      name: 'London',
      type: 'city',
      data: JSON.stringify({}),
    },
  ];

  return knex('locations').del()
    .then(() => knex('locations').insert(locations));
};
