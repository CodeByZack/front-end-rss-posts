import _ from 'underscore';
import fs from 'fs-extra';
import dayjs from 'dayjs';

const writeReadme = (newAddedPosts = []) => {
  const dataArr = fs.readJsonSync('./data.json');
  let content = fs.readFileSync('./template/README.md');
  let compiled = _.template(content.toString());
  const currentDate = dayjs().format('YYYY-MM-DD HH:mm');
  content = compiled({
    homePage: 'https://github.com/CodeByZack',
    newData: newAddedPosts,
    linksJson: dataArr,
    currentDate,
  });
  fs.writeFileSync('./README.md', content, 'utf-8');
  console.log("更新 README.md");
};

export default writeReadme;
