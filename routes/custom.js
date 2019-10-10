//404 not found middleware.
const NotFound = (req,res) => res.status(404).json({error: "Route not found"});

//HEALTH route.
const health = (req,res) => res.status(200).json({status:true,value:"Server ok"});

module.exports = {
  NotFound,
  health
};
