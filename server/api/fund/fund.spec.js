'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var fundCtrlStub = {
  index: 'fundCtrl.index',
  show: 'fundCtrl.show',
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var fundIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './fund.controller': fundCtrlStub
});

describe('Fund API Router:', function() {

  it('should return an express router instance', function() {
    fundIndex.should.equal(routerStub);
  });

  describe('GET /api/funds', function() {

    it('should route to fund.controller.index', function() {
      routerStub.get
        .withArgs('/', 'fundCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/funds/:id', function() {

    it('should route to fund.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'fundCtrl.show')
        .should.have.been.calledOnce;
    });

  });

});
