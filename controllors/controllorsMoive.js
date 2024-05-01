
const MovieTable = require('../dataBase/movie')


//create section
exports.create = async (req,res,next) => {
   const {name , category, description} = req.body
    const movie = MovieTable({name , category, description});
    await movie.save()
    res.json({message: "the new movie good registered"})
}
//find section
exports.find = async (req,res,next) => {
    const {id} = req.params
    const movieName = await MovieTable.findById(id).select('-reviews')
    if(!movieName){
       return res.json({message:'id not found ...'})
    }
     res.json({message: "the id is valide" , movieName})
 }

//update section
exports.update = async (req,res,next) => {
    const {id} = req.params;
    const {name , category, description} = req.body
    await MovieTable.updateOne(
        {_id: id},
        {
            $set: {
                name , category, description
            }
        }
    )
    res.json({message: "the element updated"})

}

//delete section
exports.delete = async (req,res,next) => {
    const {id} = req.params
    const moiveDelete = await MovieTable.findByIdAndDelete(id)
    if(!moiveDelete){
        return res.json({message: 'id not found for delete'})

    }
    res.json({message: "the acount was deleted "})

}
//list section
exports.list = async (req,res,next) => {
    const movieList = await MovieTable.find().select("-reviews");

    res.json({message: "function don  ", data: movieList})

}

exports.reviews = async(req, res , next) => {
    const { id } = req.params
    const movie = await MovieTable.findById(id).select('-reviews._id').populate('reviews.user', 'name')
    if(!movie) return res.status(404).send()
    res.json({
        message: "the reviews section done ",
        data: movie.reviews
    })
}
exports.addReviews = async(req, res , next) => {
    const {id} = req.params
    const {comment , rate} = req.body
    const movie = await MovieTable.findById(id)
    if(!movie) return res.status(404).json({message: " the movie not found it "})
    const isRated = movie.reviews.findIndex(m => m.user == req.userId)
    if(isRated > -1) return res.status(403).json({message: "review is already added."})
    const totlaRate = movie.reviews.reduce((sum,review) => sum + review.rate, 0)
    const finalRate = (totlaRate + rate) / (movie.reviews.length + 1)

    await MovieTable.updateOne(
        {_id: id},
        {
            $push: {
               reviews:{
                user: req.userId , comment , rate
               }
            },
            $set: {rate: finalRate}
        }
    )
        res.status(200).json({
        message: "the reviews addReviews done "
    })
}

