const geocode = require("../geocode")

exports.geocode = (req, res) => {
    const address = req.query.address;
  
    geocode(address, (error, response) => {
      if (error) {
        return res.status(400).json({ error });
      }
  
      res.json(response);
    });
  }