var expect = require('chai').expect;
var getSajatadatokMW = require('../../../../middleware/user/getSajatadatokMW');

describe('getSajatadatokMW middleware ', function () {

  it('should set res.locals.user with a user object from db', function (done) {
		const mw=getSajatadatokMW({
			UserModel:{
				findOne: (p1,cb)=>{
					expect(p1).to.be.eql({_id:'7'});
					cb(null,'mockuser');
				}
			}
		});
		const resMock={
			locals: {}
		};
		
		mw({
			session:{
				userid: '7'
			}
		},
		resMock,
		(err)=>{
			expect(err).to.be.eql(undefined);
			expect(resMock.locals).to.be.eql({ user: 'mockuser'});
			done();
		});
  });
  
  it('should call next with error when there is a db problem', function (done) {
		const mw=getSajatadatokMW({
			UserModel:{
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
			session:{
				userid: '7' 
			}
		},
		resMock,
		(err)=>{
			expect(err).to.be.eql('nagyhiba');
			done();
		});
  });
  
  it('should call next when no user found in the db', function (done) {
		const mw=getSajatadatokMW({
			UserModel:{
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
			session:{
				userid: '7' 
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