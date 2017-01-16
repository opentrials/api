'use strict';

describe('server', () => {
  it('has CORS enabled', () => (
    server.inject({
      url: '/v1/swagger.yaml',
      headers: {
        Origin: 'http://foo.com',
      },
    }).then((response) => {
      response.headers.should.containEql({ 'access-control-allow-origin': '*' });
    })
  ));
});
