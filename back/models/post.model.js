module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        title: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.STRING
        }
    });

    //post.hadOne(user);
    //post.hasMany(like);

    //https://sequelize.org/v3/docs/associations/
    return Post;
}