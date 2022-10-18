import updateAll from './update.mjs';
import writeReadme from './writeMd.mjs';
import SimpleGit from 'simple-git';

const newAdded = await updateAll();
if (newAdded.length > 0) {
  console.log(`新增文章：${newAdded.length} 篇`);
  writeReadme(newAdded);
  await SimpleGit('./')
    .add('./*')
    .commit('更新: ' + newAdded.map((n) => n.title).join('、'))
    .push(['-u', 'origin', 'master'], (error, result) => {
      if (error) {
        console.log(`推送失败：${error}`);
      } else {
        console.log(`推送成功：${result}`);
      }
    });
} else {
  console.log('没有抓取到最新的文章');
}
