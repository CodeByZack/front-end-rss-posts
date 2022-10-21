import _ from 'underscore';
import fs from 'fs-extra';
import dayjs from 'dayjs';

const sortData = (dataArr) => {
  const sortByTitle = dataArr.sort((a, b) =>
    /[\u4e00-\u9fa5]/.test(a.title) ? -1 : 1,
  );

  sortByTitle.forEach((e) => {
    e.posts = e.posts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  });

  return sortByTitle;
};

const writeReadme = (newAddedPosts = []) => {
  const dataArr = fs.readJsonSync('./data.json');
  let content = fs.readFileSync('./template/README.md');
  let compiled = _.template(content.toString());
  const currentDate = dayjs().format('YYYY-MM-DD HH:mm');
  content = compiled({
    homePage: 'http://fed.zackdk.com/',
    newData: newAddedPosts,
    linksJson: sortData(dataArr),
    currentDate,
  });
  fs.writeFileSync('./README.md', content, 'utf-8');
  console.log('更新 README.md');
};

export default writeReadme;
