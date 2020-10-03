// Import the dependencies for testing

import chai from "chai";
import chaiHttp from 'chai-http';
import app from '../index';

import Contact from '../contactModel'
import mongoose from 'mongoose'
// let Contact = mongoose.model('tests', contactSchema)

// Configure chai
chai.use(chaiHttp);
chai.should();
let validId = ""
describe("Contacts", () => {
    describe("GET /api/contacts/", () => {
        var contact = new Contact();
        contact.name = "Test1"
        contact.gender = "Male";
        contact.email = "test@email.com";
        contact.phone = 81234567;
        before((done) => {
            mongoose.disconnect(() => {
                mongoose.connect(process.env.db_connection_string + "testdb", { useNewUrlParser: true })
                const db = mongoose.connection;
                db.useDb("testDB", { useCache: true })
                
                console.log(db)
                contact.save(function (err) {
                    if (err)
                        return done(err)
                    else {
                        validId = contact._id
                        done()
                    }
                });
            });
        })

        it("should create a contact record", (done) => {
            chai.request(app)
                .post('/api/contacts')
                .send({
                    "name": "Test 2",
                    "gender": "Female",
                    "email": "Test2@abc.com",
                    "phone": "85496675"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })

        // Test to get all contacts record
        it("should get all contacts record", (done) => {
            chai.request(app)
                .get('/api/contacts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        // Test to get single contact record
        it("should get a single contact record", (done) => {
            //  const id = 1;
            chai.request(app)
                .get(`/api/contacts/${validId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should delete a single contact record", (done) => {
            chai.request(app)
                .delete(`/api/contacts/${validId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("message", "Contact deleted");
                    done();
                })
        })

        // Test to get single contact record
        it("should not get a single contact record", (done) => {
            const id = "5f789c6f31b84e51fbdf7038";
            chai.request(app)
                .get(`/api/contacts/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    console.log(res.body)
                    res.body.should.have.property("data", null)
                    done();
                });
        });

        after(() => {
            mongoose.connection.db.dropDatabase(function () {
                mongoose.connection.close(done);
            });
        })
    });
});