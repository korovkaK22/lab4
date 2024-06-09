import bodyParser from 'body-parser';
import express from 'express';
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import routers from '../../web/routers';
import { ObjectId } from 'mongodb';
import Company from "../../model/company";
import { DriverPostDto } from "../../web/dto/driver";
import Driver from "../../model/driver";

const { expect } = chai;

chai.use(chaiHttp);
chai.should();

const sandbox = sinon.createSandbox();

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use('/', routers);
describe('Driver controller', () => {

  afterEach(() => {
    sandbox.restore();
  });

  it('should create driver when company exists', (done) => {
    const company = {
      _id: new ObjectId().toString(),
    };
    const driverId = new ObjectId().toString();
    const findOneStub = sandbox.stub(
      Company,
      'findById',
    );
    findOneStub.resolves(company);


    const driver: DriverPostDto = {
      name: "Alex",
      surname: "Johnson",
      age: 20,
      drivingExperience: 12,
      companyId: company._id,
      salary: 12222,
      cars: [],
    };

    const saveOneStub = sandbox.stub(
      Driver.prototype,
      'save',
    );


    saveOneStub.resolves({
      ...driver,
      _id: driverId,
    });
    chai.request(app)
      .post('/drivers')
      .send({ data: driver })
      .end((_, res) => {
        res.should.have.status(201);
        expect(res.body).to.deep.equal({ ...driver, id: driverId });
        done();
      });
  },
  );

  it('should not create driver when company not exist', (done) => {
    const company = {
      _id: new ObjectId().toString(),
    };
    const driverId = new ObjectId().toString();
    const findOneStub = sandbox.stub(
      Company,
      'findById',
    );
    findOneStub.resolves(undefined);


    const driver: DriverPostDto = {
      name: "Alex",
      surname: "Johnson",
      age: 20,
      drivingExperience: 12,
      companyId: company._id,
      salary: 12222,
      cars: [],
    };

    const saveOneStub = sandbox.stub(
      Driver.prototype,
      'save',
    );


    saveOneStub.resolves({
      ...driver,
      _id: driverId,
    });
    chai.request(app)
      .post('/drivers')
      .send({ data: driver })
      .end((_, res) => {
        res.should.have.status(404);
        done();
      });
  },
  );

  it('should not create driver with invalid data', (done) => {
    const company = {
      _id: new ObjectId().toString(),
    };
    const driverId = new ObjectId().toString();
    const findOneStub = sandbox.stub(
      Company,
      'findById',
    );
    findOneStub.resolves(company);


    const driver = {
      name: "",
      age: 20,
      drivingExperience: -5,
      companyId: company._id,
      salary: 12222,
      cars: [],
    };

    const saveOneStub = sandbox.stub(
      Driver.prototype,
      'save',
    );


    saveOneStub.resolves({
      ...driver,
      _id: driverId,
    });
    chai.request(app)
      .post('/drivers')
      .send({ data: driver })
      .end((_, res) => {
        res.should.have.status(400);
        done();
      });
  },
  );


  it('should retrieve list of drivers that belong to company', (done) => {

    const companyId = new ObjectId().toString();
    const driverIds = [new ObjectId().toString(), new ObjectId().toString(), new ObjectId().toString()];
    const drivers = [{
      companyId: companyId,
      _id: driverIds[0],
    }, {
      companyId: companyId,
      _id: driverIds[1],
    }, {
      companyId: companyId,
      _id: driverIds[2],
    }];

    sandbox.stub(Company, 'findById').resolves({ _id: companyId });
    const limitStub = sinon.stub().returns(drivers.slice(1));
    const skipStub = sinon.stub().returns({ limit: limitStub });
    sandbox.stub(Driver, 'find').returns(({skip:skipStub}as any));



    chai.request(app)
      .get(`/drivers`)
      .query({ companyId, from: 1, size: 2 })
      .end((_, res) => {
        res.should.have.status(200);
        expect(res.body.length).to.equal(2);
        done();
      });
  },
  );

  it('should count drivers belonging to multiple companies', (done) => {

    const companyIds = [new ObjectId().toString(), new ObjectId().toString()];
    const stub =
      sandbox.stub(Driver, 'countDocuments');
    stub.withArgs({companyId: companyIds[0]}).resolves(2);
    stub.withArgs({companyId: companyIds[1]}).resolves(1);



    chai.request(app)
      .post(`/drivers/_counts`)
      .send({data: {companyIds}})
      .end((_, res) => {
        res.should.have.status(200);
        expect(res.body).to.deep.equal({[companyIds[0]]:2, [companyIds[1]]:1});
        done();
      });
  },
  );
});
