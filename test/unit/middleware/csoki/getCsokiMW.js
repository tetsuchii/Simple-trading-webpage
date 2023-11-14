var expect = require('chai').expect;
var getCsokiMW = require('../../../../middleware/csoki/getCsokiMW');

describe('getCsokiMW middleware ', function () {

  it('should set res.locals.csoki with a csoki object from db', function (done) {
		const mw=getCsokiMW({
			CsokiModel:{
				findOne: (p1,cb)=>{
					expect(p1).to.be.eql({_id:'7'});
					cb(null,'mockcsoki');
				}
			}
		});
		const resMock={
			locals: {}
		};
		
		mw({
			params:{
				csokiid: '7'
			}
		},
		resMock,
		(err)=>{
			expect(err).to.be.eql(undefined);
			expect(resMock.locals).to.be.eql({ csoki: 'mockcsoki'});
			done();
		});
  });
  
  it('should call next with error when there is a db problem', function (done) {
		const mw=getCsokiMW({
			CsokiModel:{
				findOne: (p1,cb)=>{
					expect(p1).to.be.eql({_id:'7'});
					cb('nagyhiba',null);
				}
			}
		});
		const resMock={
			locals: {}
		};
		
		mw({
			params:{
				csokiid: '7' 
			}
		},
		resMock,
		(err)=>{
			expect(err).to.be.eql('nagyhiba');
			done();
		});
  });
  
  it('should call next when no csoki found in the db', function (done) {
		const mw=getCsokiMW({
			CsokiModel:{
				findOne: (p1,cb)=>{
					expect(p1).to.be.eql({_id:'7'});
					cb(undefined,null);
				}
			}
		});
		const resMock={
			locals: {}
		};
		
		mw({
			params:{
				csokiid: '7' 
			}
		},
		resMock,
		(err)=>{
			expect(err).to.be.eql(undefined);
			expect(resMock.locals).to.be.eql({});
			done();
		});
  });
});