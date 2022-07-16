// 文章的路由模块


const express = require('express')
// 导入文章的验证模块
const { add_article_schema, delete_schema } = require('../schema/article')
const router = express.Router()
// 导入解析formdata格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 创建multer的实例对象，通过dest属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的处理函数模块
const article_handler = require('../router_handler/article')

// 发布文章的路由 
// 注意：在当前的路由中，先后使用了两个中间件：
// 先试用multer解析表单数据
// 再使用expressJoi对解析度表单数据进行验证

// upload.single()是一个局部生效的中间件，用来解析FormData格式的表单数据
// 将文件类型的数据，解析并挂载到req.file属性中
// 将文本类型的数据，解析并挂载到req.body属性中

router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)
// 获取文章列表数据的路由
router.get('/list', article_handler.getArtList)
// 根据ID删除文章的路由
router.get('/delete/:id', expressJoi(delete_schema), article_handler.deleteById)

module.exports = router