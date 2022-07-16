// 文章的处理函数
// 导入数据库操作模块
const db = require('../db/index')
// 导入处理路径的path模块
const path = require('path')
exports.addArticle = (req, res) => {
    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')

    const articleInfo = {
        // 标题、内容、状态、所属的分类id
        ...req.body,
        // 文章封面照服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的id
        author_id: req.auth.id,
    }
    const sql = `insert into ev_articles set?`
    // 执行SQL语句
    db.query(sql, articleInfo, (err, results) => {
        // 执行SQL语句失败
        if (err) return res.cc(err)
        // 执行SQL语句成功，但是影响行数不等于1
        if (results.affectedRows !== 1) return res.cc('发布文章失败！')
        // 发布文章成功
        res.cc('发布文章成功', 0)
    })
}

// 获取文章分类列表的处理函数
exports.getArtList = (req, res) => {
    // 定义查询分类列表数据的SQL语句
    const sql = `select * from ev_articles where is_delete=0 order by id asc`
    const sql2 = `select * from ev_articl_cate where is_delete=0 order by id asc`
    // 调用db.query()执行SQL语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results,
        })
    })
}

// 删除文章的处理函数
exports.deleteById = (req, res) => {
    // 定义标记删除的SQL语句
    const sql = `update ev_articles set is_delete=1 where id=?`
    // 调用db.query()执行SQL语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
        res.cc('删除文章分类成功！', 0)
    })
}