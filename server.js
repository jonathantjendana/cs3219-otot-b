
const app = require("./index.js");

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on ${port}`));
module.exports = app