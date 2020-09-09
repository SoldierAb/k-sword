const path = require('path');
const gulp = require('gulp');
const rollup = require('rollup');
const fxa = require('fs-extra');
const chalk = require('chalk');
const conventionalChangelog = require('conventional-changelog');
const { execSync } = require('child_process');

const { name, version } = require('./package.json');
const LIB_NAME_VERSION = `${name}:${version}`;

const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor');
const rollupConfig = require('./rollup.config');

const PATH_API_EXTRA = path.resolve(__dirname,'./api-extractor.json');
const PATH_LIB =  path.resolve(__dirname,'./lib');
const PATH_DOC = path.resolve(__dirname,'./dist');
const PATH_TEMP = path.resolve(__dirname,'./temp');
const PATH_CHANGELOG = path.join(path.resolve(__dirname,'./'),'CHANGELOG.md');

const COMMAND_DOC = 'npm run build:doc';

const log = {
  info: info =>{
    console.log(chalk.cyan(info));
  },
  success: str =>{
    console.log(chalk.green(str));
  },
  error: err =>{
    console.log(chalk.red(err));
  }
}

gulp.task('clean',async function (done){
  fxa.removeSync(PATH_LIB);
  fxa.removeSync(PATH_DOC);
  fxa.removeSync(PATH_TEMP);
  done();
});

gulp.task('bundle',async function (done){
  const { input, plugins, output }  = rollupConfig;
  const inputOption = {
    input,
    plugins
  };

  const bundleRes = await rollup.rollup(inputOption)

  await bundleRes.write(output)

  done()

})

gulp.task('typing',async function (done){
  const extraConf = ExtractorConfig.loadFileAndPrepare(PATH_API_EXTRA);
  const existsEntry = fxa.pathExistsSync(extraConf.mainEntryPointFilePath)
  if(!existsEntry){
    log.error('/lib/index.d.ts not found');
    return;
  }

  const extraRes = await Extractor.invoke(extraConf, {
    localBuild: true,
    showVerboseMessages: true
  })

  if(extraRes.succeeded){
    log.success(`\n\n Generate declaretion file [ lib/index.d.ts ] successfully! \n\n`)
  }else{
    log.error(` generate failed!`)
  }

  done();

})

gulp.task('doc',async function (){
  const stdout = execSync(COMMAND_DOC)
  log.info(`stdout: ${stdout}`);
})


gulp.task('changelog',async function (done){
  const logPipe = await conventionalChangelog({
    preset: 'angular',
    releaseCount:0,
  });

  logPipe.setEncoding('utf-8');

  const logRes = ['# K-Sword 更新日志 \n\n 🌈 一个 JavaScript/TypeScript 实用程序库。 \n\n']

  logPipe.on('data', (chunk) => {
    chunk = chunk.replace(/\/commits\//g, '/commit/')
    logRes.push(chunk)
  })

  logPipe.on('end', async () => {
    await fxa.createWriteStream(PATH_CHANGELOG).write(logRes.join(''))
    done()
  })
})


gulp.task('build',gulp.parallel(gulp.series('bundle','typing'),'doc','changelog'));

gulp.task('success',function (done){
  log.success(`\n\n Congratulations, ${LIB_NAME_VERSION} build finish \n\n`)
  done();
})

gulp.task('default',gulp.series('clean','build','success'))
