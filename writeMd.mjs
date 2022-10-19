import _ from 'underscore';
import fs from 'fs-extra';
import dayjs from 'dayjs';

const writeReadme = (newAddedPosts = []) => {
  const dataArr = fs.readJsonSync('./data.json');
  let content = fs.readFileSync('./template/README.md');
  let compiled = _.template(content.toString());
  const currentDate = dayjs().format('YYYY-MM-DD HH:mm');
  content = compiled({
    homePage: 'http://fed.zackdk.com/',
    newData: newAddedPosts,
    linksJson: dataArr.sort((a, b) =>
      /[\u4e00-\u9fa5]/.test(a.title) ? -1 : 1,
    ),
    currentDate,
  });
  fs.writeFileSync('./README.md', content, 'utf-8');
  console.log('更新 README.md');
};

export default writeReadme;
