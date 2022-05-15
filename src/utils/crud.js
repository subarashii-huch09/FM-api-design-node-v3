export const getOne = model => async (req, res) => {
  
  const {id} = req.params
  const {userId} = req.user._id
  const doc = model.findOne({_id: id, createdBy:userId }).exec()

  if(!doc){
    return res.status(404).end()
  }

  res.status(200).json({data:doc})
}

export const getMany = model => async (req, res) => {
  const docs = await model.find({createdBy: req.user._id}).exect()
  res.status(200).json({data:docs})
}

export const createOne = model => async (req, res) => {
  const doc = await model.create({...req.body, createdBy:req.user._id})
  // the createdById will over write, so basically ...req.body is to set an object layout first then createdById comes in to over-ride
  console.log(doc)
  
  res.status(201).json({data:doc})
}

export const updateOne = model => async (req, res) => {
  const doc = await model.findOneAndUpdate(
    {_id: req.params.id, createdBY: req.user._id}, req.body,{new:true})
  // reason for findOneAndUpdate is we have 2 parameters that we need to find by , the ID of the doc and the authenticated user
  if(!doc) {
    return res.status(400).end()
  }
  res.status(200).json({data:doc})
}

export const removeOne = model => async (req, res) => {
  const doc = await model.findOneAndRemove({
    _id: req.params.id,
    createdBY: req.user._id
  }).exec()

  if(!doc) {
    return res.status(400).end()
  }
  res.ststus(200).json({data:doc})
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
