import gulp from 'gulp';
import debug from 'gulp-debug';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import spritesmith from 'gulp.spritesmith';
import svgSprite from 'gulp-svg-sprite';

import config from '../config.js';

const src = {
    png: config.src + '/images/sprites/png/*.png',
    svg: config.src + '/images/sprites/svg/*.svg'
};
const dist = {
    img: config.dist + '/' + config.assets + '/images',
    css: config.src + '/styles/utils'
};

gulp.task('sprites:png', (done) => {
    new Promise((resolve, reject) => {
        const spriteData = 
            gulp.src(src.png)
                .pipe(plumber( {errorHandler: notify.onError("Error: <%= error.message %>")} ))
                .pipe(spritesmith({
                    imgName: 'spritePng.png',
                    imgPath: '../images/spritePng.png',
                    cssName: 'spritePng.sass',
                    cssFormat: 'sass',
                    algorithm: 'binary-tree'
                }));
                
        spriteData.img.pipe(gulp.dest(dist.img));
        spriteData.css.pipe(gulp.dest(dist.css));
        spriteData
            .pipe(debug())
            .on('end', resolve)
            .on('error', reject)
    });
    done();
});

gulp.task('sprites:svg', (done) => {
    new Promise((resolve, reject) => {
        gulp.src(src.svg)
            .pipe(plumber( {errorHandler: notify.onError("Error: <%= error.message %>")} ))
            .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: '../spriteSvg.svg'
                    }
                }
            }))    
            .pipe(gulp.dest(dist.img))
            .pipe(debug())
            .on('end', resolve)
            .on('error', reject)
    });
    done();
});