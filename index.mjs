import updateAll from './update.mjs';
import writeReadme from './writeMd.mjs';
import SimpleGit from 'simple-git';

const newAdded = await updateAll();
if (newAdded.length > 0) {
  console.log(`新增文章：${newAdded.length} 篇`);
  writeReadme(newAdded);
  await SimpleGit('./')
    .addConfig("user.email","958059970@qq.com")
    .addConfig("user.name","auto-fetch-rss")
    .add('./*')
    .commit('更新: ' + newAdded.map((n) => n.title).join('、'))
    .push(['-u', 'origin', 'master'], (error, result) => {
      if (error) {
        console.log(`推送失败：${error}`);
        process.exit();
      } else {
        console.log(`推送成功：${result}`);
        process.exit();
      }
    });
} else {
  console.log('没有抓取到最新的文章');
  process.exit();
}