var express = require('express')
var router = express.Router()
var controllers = require('../controllers')



/* GET home page. */
router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]

  controller.find(req.query, function(err, results){
    if(err){
      res.json({
        confirmation:'fail',
        message: err
      })
      return
    }
    res.json({
      confirmation:'success',
      results: results
    })
    return
  })
});

router.get('/:resource/:id', function(req, res, next){
  var resource = req.params.resource
  var controller = controllers[resource]
  var id = req.params.id

  controller.findById(id, function(err, result){
    if(err){
      res.json({
        confirmation:'fail',
        message: err
      })
      return
    }
    res.json({
      confirmation:'success',
      result: result
    })
    return
  })
})


router.post('/:resource', function(req, res, next){
  var resource = req.params.resource
  var controller = controllers[resource]

  controller.create(req.body,function(err, result){
    if(err){
      res.json({
        confirmation:'fail',
        message: err
      })
      return
    }
    res.json({
      confirmation:'success',
      result: result
    })
    return
  })
})

router.put('/:resource/:id', function(req,res,next){
  var resource = req.params.resource
  var controller = controllers[resource]
  var id = req.params.id

  controller.findByIdAndUpdate(id, req.body, {new:true}, function(err, result){
    if(err){
      res.json({
        confirmation:'fail',
        message: err
      })
      return
    }
    res.json({
      confirmation:'success',
      result: result
    })
    return
  })
})

router.delete('/:resource/:id', function(req, res, next){
  var resource = req.params.resource
  var controller = controllers[resource]
  var id = req.params.id


  controller.findByIdAndRemove(id, function(err){
    if(err){
      res.json({
        confirmation:'fail',
        message: err
      })
      return
    }
    res.json({
      confirmation:'success',
      result: result
    })
    return
  })
})





module.exports = router
