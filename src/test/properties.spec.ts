// @ts-ignore
const chai = require('chai');
const expect = require('chai').expect;
const dotenv = require('dotenv');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // We have a self signed CERT
dotenv.config({path:__dirname+'/./../../.env'});
const chaiHttp = require('chai-http');

/**
 * Follow https://livecodestream.dev/post/testing-in-nodejs-using-mocha-and-chai-part-2/
 * Since we are using async/await, we need to let our value await
 *
 */
const url = `https://${process.env.SERVER}:${process.env.PORT}`;
let ourValue = 0
chai.use(chaiHttp); // I have not a fucking clue why we really need this
describe('Property Controller', async () => {
    /**
     * Test the GET route
     */
    let result = [
        {
            "id": "1",
            "address": "501 Test Ave.",
            "zip": "78222"
        },
        {
            "id": "2",
            "address": "124 Main Street",
            "zip": "78222"
        }
    ]
    describe('GET Properties', async () => {
        it('Returns a list of stored US properties (id, address, and zip) ordered by id.', async () => {
            let res = await chai
                .request(url)
                .get('/properties')
            expect(res.status).to.equal(200)
            console.log(result)
            expect(res.body).to.eql(result)
        })
    })
    /**
     * Test the POST route
     */
    describe('POST Properties', async () => {
        // GOOD API KEY
        it('Add a property', async () => {
            let res = await chai
                .request(url)
                .post('/properties')
                .set({'api_key': `${process.env.API_KEY}`, Accept: 'application/json'})
                .send({
                    address: "501 Test Ave",
                    city: "San Antonio",
                    state: "TX",
                    zip: "78222"})
            expect(res.status).to.equal(200)
            ourValue = res.body[0].id
        })
        it('Add a property BAD REQUEST', async () => {
            let res = await chai
                .request(url)
                .post('/properties')
                .set({'api_key': `${process.env.API_KEY}`, Accept: 'application/json'})
                .send({
                    address: "501 Test Ave",
                    city: "San Antonio",
                    state: "T",
                    zip: "78222"})
            expect(res.status).to.equal(400)
            console.log(res.body)
        })
        // BAD API KEY
        it('Add a property without AUTH', async () => {
            let res = await chai
                .request(url)
                .post('/properties')
                .set({'api_key': `eggs`, Accept: 'application/json'})
                .send({
                    address: "501 Test Ave",
                    city: "San Antonio",
                    state: "TX",
                    zip: "78222"})
            expect(res.status).to.equal(401)
            console.log(res.body)
        })
    })
    /**
     * Test the GET (by id) route
     */
    describe('GET Properties (by id)', async () => {
        // GOOD REQ
        it('GET a property SUCCESS', async () => {
            let res = await chai
                .request(url)
                .get('/properties/{id}')
                .query({PropertyID: `${ourValue}`})
            expect(res.status).to.equal(200)
            console.log(res.body)
        })// BAD REQ
        it('GET a property BAD BODY', async () => {
            let res = await chai
                .request(url)
                .get('/properties/{id}')
                .query({PropertyID: 'eggs'})
            expect(res.status).to.equal(400)
            console.log(res.body)
        })
        it('GET a property NO ID FOUND', async () => {
            let res = await chai
                .request(url)
                .get('/properties/{id}')
                .query({PropertyID: '99'})
            expect(res.status).to.equal(404)
            console.log(res.body)
        })
    })
    /**
     * Test the PUT (by id) route
     */
    describe('PUT Properties (by id)', async () => {
        // GOOD REQ
        it('PUT Properties (by id) SUCCESS', async () => {
            let res = await chai
                .request(url)
                .put('/properties/{id}')
                .set({'api_key': `${process.env.API_KEY}`, Accept: 'application/json'})
                .query({PropertyID: `${ourValue}`})
                .send({
                    address: "14719 War Admiral",
                    city: "San Antonio",
                    state: "TX",
                    zip: "78222"})
            expect(res.status).to.equal(200)
            console.log(res.body)
        })// BAD REQ
        it('PUT Properties (by id) BAD BODY', async () => {
            let res = await chai
                .request(url)
                .put('/properties/{id}')
                .set({'api_key': `${process.env.API_KEY}`, Accept: 'application/json'})
                .query({PropertyID: 'eggs'})
            expect(res.status).to.equal(400)
            console.log(res.body)
        })
        it('PUT Properties (by id) NO AUTH', async () => {
            let res = await chai
                .request(url)
                .put('/properties/{id}')
                .set({'api_key': `nope`, Accept: 'application/json'})
                .query({ProtpertyID: '3'})
                .send({
                    address: "501 Test Ave",
                    city: "San Antonio",
                    state: "TX",
                    zip: "78222"})
            console.log(res.body)
            expect(res.status).to.equal(401)

        })
        it('PUT Properties (by id) NO ID FOUND', async () => {
            let res = await chai
                .request(url)
                .put('/properties/{id}')
                .set({'api_key': `${process.env.API_KEY}`, Accept: 'application/json'})
                .query({PropertyID: '99'})
                .send({
                    address: "501 Test Ave",
                    city: "San Antonio",
                    state: "TX",
                    zip: "78222"})
            expect(res.status).to.equal(404)
            console.log(res.body)
        })
    })
    /**
     * Test the DELETE (by id) route
     */
    describe('DELETE Properties (by id)', async () => {
        // GOOD REQ
        it('DELETE Properties (by id) SUCCESS', async () => {
            let res = await chai
                .request(url)
                .delete('/properties/{id}')
                .set({'api_key': `${process.env.API_KEY}`, Accept: 'application/json'})
                .query({PropertyID: `${ourValue}`})
            expect(res.status).to.equal(200)
            console.log(res.body)
        })// BAD REQ
        it('DELETE Properties (by id) BAD BODY', async () => {
            let res = await chai
                .request(url)
                .delete('/properties/{id}')
                .set({'api_key': `${process.env.API_KEY}`, Accept: 'application/json'})
                .query({PropertyID: 'eggs'})
            expect(res.status).to.equal(400)
            console.log(res.body)
        })
        it('DELETE Properties (by id) NO AUTH', async () => {
            let res = await chai
                .request(url)
                .delete('/properties/{id}')
                .set({'api_key': `nope`, Accept: 'application/json'})
                .query({ProtpertyID: '7'})
            console.log(res.body)
            expect(res.status).to.equal(401)

        })
        it('DELETE Properties (by id) NO ID FOUND', async () => {
            let res = await chai
                .request(url)
                .delete('/properties/{id}')
                .set({'api_key': `${process.env.API_KEY}`, Accept: 'application/json'})
                .query({PropertyID: '99'})
            expect(res.status).to.equal(404)
            console.log(res.body)
        })
    })
})