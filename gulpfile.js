/*
 * @Author: LiWei 
 * @Date: 2018-12-03 09:09:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-03 10:03:14
 */

var gulp=require('gulp');

var sass=require("gulp-sass");

var minCss=require('gulp-clean-css');

var server=require('gulp-webserver');

var fs=require('fs');

var path=require('path');

var url=require('url');

var babel=require('gulp-babel');

var uglify=require('gulp-uglify');



  //编译scss,并压缩css
    gulp.task('devSass',function(){
          return gulp.src('./src/sass/*.scss')
                 .pipe(sass())
                 .pipe(minCss())
                 .pipe(gulp.dest("./src/css"))
    })
    //监听
    gulp.task('watch',function(){
          return gulp.watch('./src/sass/*.scss',gulp.series('devSass'))  
    })
    //起服务
     gulp.task('devServer',function(){
         return gulp.src('./src')
                .pipe(server({
                    port:9090,
                    open:true,
                    middleware:function(req,res,next){
                     
                           var pathname=req.url;
                           if(pathname==='/favicon.ico'){
                               return res.end();
                           }
                           pathname=pathname==='/'?'index.html':pathname;
                          res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
                    }
                }))
     })


   //开发环境
    gulp.task('dev',gulp.series('devSass','devServer','watch'));

    //线上环境

    //压缩js
    gulp.task('bjs',function(){
        return gulp.src('./src/js/*.js')
               .pipe(uglify())
               .pipe(gulp.dest("./bulid/js"))
    })
    //拷贝js
    gulp.task('Copyjs',function(){
        return gulp.src('./src/js、libs/*.js')
               .pipe(gulp.dest("./bulid/js/libs"))
    })
