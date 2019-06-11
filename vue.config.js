module.exports={
    devServer:{
        proxy:{
            '/api':{
                target:'http://localhost:8084/',
                changeOrigin: true,
                ws: true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}