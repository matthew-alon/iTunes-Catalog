const
  express = require('express'),
  appRouter = express.Router(),
  axios = require('axios'),
  API_URL = 'https://itunes.apple.com/search?'

// request to iTunes API
function search(params) {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]);

  return axios
    .get(API_URL + queryString)
    .then(response => {
      const obj = {};
      const data = response.data.results;

      // sort data by media type
      data.map(o => {
        if(obj[o.kind || o.wrapperType]) {
          obj[o.kind || o.wrapperType].push(o);
        } else {
          obj[o.kind || o.wrapperType] = [o];
        }
      });


      return obj;
    })
    .catch(err => {
      // need error handling
      console.log(err);
    });
}

appRouter.route('/search')
  .post(async (req, res) => {
    const itunesData = await search(req.body)

    res.json({data: itunesData});
  });

module.exports = appRouter;
