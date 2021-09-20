/* middlewares.js */

const middlewareFunc = (req, route, verb, operation) => {
    // ... insert your logic here 
    // possibly modify req object:
    //req.body.newParam = { key: val }; 
    console.log('request:',req);
    return req;
}

module.exports = { middlewareFunc };