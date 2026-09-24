const { User, Post, Comment } = require("../association/oneToMany.accociation");

class UserController {
  async CreateUser(req, res) {
    try {
      //console.log(req.body)
      const { name, email, phone } = req.body;
      const product = await User.create({ name, email, phone });
      res.status(201).json({
        success: true,
        message: "user created successfully",
        data: product,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async getUser(req, res) {
    try {
      //console.log(req.body)

      const product = await User.findAll();
      res.status(201).json({
        success: true,
        message: "get all user",
        data: product,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  //**********************create Post ********************** */
  async CreatePost(req, res) {
    try {
      const { title, content, userId } = req.body;
      const post = await Post.create({ title, content, userId });
      res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  //**********get user with post */

  async getUserwuthPost(req, res) {
    try {
      const user = await User.findAll({
        //where:{id:1},
        include: [
          {
            model: Post,
            as: "posts",
          },
        ],
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "image"],
        },

        //raw:true //get raw data in json
      });
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async getUserwithPostbyId(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        //where:{id:1},
        include: [
          {
            model: Post,
            as: "posts",
          },
        ],
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "image"],
        },

        //raw:true //get raw data in json
      });
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  //************get post with user */

  async getPostwithUser(req, res) {
    try {
      const post = await Post.findAll({
        //where:{id:1},
        include: [
          {
            model: User,
            as: "user",
          },
        ],
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "image"],
        },

        //raw:true //get raw data in json
      });
      res.status(201).json({
        success: true,
        data: post,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  //*************comment */

  async createComment(req, res) {
    try {
      const { postId } = req.params;
      const { conmment, userId } = req.body;

      // 1. Check Post
      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      // 2. Check User
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // 3. Create Comment
      const comment = await Comment.create({
        conmment,
        userId,
        postId,
      });

      res.status(201).json({
        success: true,
        message: "Comment added successfully",
        data: comment,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async getCommentsByPost(req,res){
    try{
      const { postId } = req.params;
       const post = await Post.findByPk(postId, {

            include: [

                {
                    model: User,
                    as: "user",
                    attributes: ["id", "name", "email"]
                },

                {
                    model: Comment,
                    as: "comments",

                    include: [
                        {
                            model: User,
                            as: "user",
                            attributes: ["id", "name"]
                        }
                    ]
                }

            ]

        });
        if (!post) {

            return res.status(404).json({
                success: false,
                message: "Post not found"
            });

        }


        return res.status(200).json({
            success: true,
            data: post
        });

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }

  }
}

module.exports = new UserController();
