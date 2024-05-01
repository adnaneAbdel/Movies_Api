const UserTable = require('../dataBase/database')


exports.add = async (req,res ,next) => {
    const {movie , watched} = req.body 
    const user = await UserTable.findById(req.userId)
    const index = user.watchList.findIndex(e => e.movie == movie)

    if(index > -1) {
        user.watchList[index].watched = watched

    }else{
        user.watchList.push({movie, watched})
    }
    await user.save()
    res.json({
        message: "the add list watched done"
    })
}
exports.delete = async (req,res ,next) => {
    const {movie} = req.params
    const user = await UserTable.findById(req.userId)
    user.watchList = user.watchList.filter(e => e.movie != movie)
    await user.save()
    res.json({
        message: "the delete list watched done"
    })
}
exports.list = async (req,res ,next) => {
    const user = await UserTable.findById(req.userId)

    res.json({
        message: "the list list watched done",
        data: user.watchList
    })
}