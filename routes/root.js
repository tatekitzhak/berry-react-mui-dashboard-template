import express from 'express';
import path from 'path';

const rootRouter = express.Router();


rootRouter.get('/', (req, res) => {
    console.log('root:', req.query)
    // res.sendFile(path.join(path.resolve(), '..', 'views', 'index.html'));
    res.send('pppp')

    /**
     
    const locationsListByDistance = async(req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const near = {
    type: "Point",
    coordinates: [lng, lat]
  };
  const geoOptions = {
    distanceField: "distance.calculated",
    key: 'coords',
    spherical: true,
    maxDistance: 20000,
    limit: 10
  };
  if (!lng || !lat) {
    return res
      .status(404)
      .json({
      "message": "lng and lat query parameters are required"
    });
  }
  try {
    const results = await Loc.aggregate([
      {
        $geoNear: {
          near,
          ...geoOptions
        }
      }
    ]);
    const locations = results.map(result => {
      return {
        id: result._id
        name: result.name,
        address: result.address,
        rating: result.rating,
        facilities: result.facilities,
        distance: `${result.distance.calculated.toFixed()}m`
      }
    });
    res
      .status(200)
      .json(locations);
  } catch (err) {
    res
      .status(404)
      .json(err);
  }
};

     */
});

export { rootRouter };
/* 
const locationsListByDistance = async (req, res) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
 
    if (!lng || !lat) {
        return res
            .status(404)
            .json({
                "message": "lng and lat query parameters are required"
            });
    }
    try {

        res
            .status(200)
            .json(locations);
    } catch (err) {
        res
            .status(404)
            .json(err);
    }
}; */