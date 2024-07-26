const { connect } = require("mongoose");
const { mongo_url } = require(".");

console.log(mongo_url);
const database = {
    authenticate: () => {
       return connect(mongo_url)
    }
}
module.exports = {database}