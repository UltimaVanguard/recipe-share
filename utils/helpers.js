module.exports = {
    findRecipeOwner:(ownerId, userId) => {
        return ownerId === userId
    }
}