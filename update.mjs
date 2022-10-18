import Parser from 'rss-parser';
import fs from 'fs-extra';
import dayjs from 'dayjs';

const rssArr = fs.readJsonSync('./rss.json');
const dataArr = fs.readJsonSync('./data.json');
const parser = new Parser({ timeout: 5000 });
const newAddedPosts = [];

const containObj = (arr, obj, key) => {
  if (!arr.length) return false;
  const target = arr.find((a) => a[key] === obj[key]);
  return !!target;
};

const fetch = async (rssUrl) => {
  try {
    const feed = await parser.parseURL(rssUrl);
    let targetFeedObj = dataArr.find((d) => d.title === feed.title);
    if (!targetFeedObj) {
      targetFeedObj = { title: feed.title, posts: [] };
      dataArr.push(targetFeedObj);
    }
    if (feed.items.length > 0) {
      feed.items.forEach((item) => {
        if (containObj(targetFeedObj.posts, item, 'title')) return;

        const obj = {
          title: item.title,
          link: item.link,
          date: dayjs(item.isoDate).format('YYYY-MM-DD'),
        };
        newAddedPosts.push(obj);
        targetFeedObj.posts.push(obj);
      });
    }
  } catch (err) {
    console.log(`${rssUrl} fetch failed,${err}`);
  }
};

const updateAll = async () => {
  for (const rssObj of rssArr) {
    const { rss } = rssObj;
    if (Array.isArray(rss)) {
      for (const rssUrl of rss) {
        await fetch(rssUrl);
      }
    } else {
      await fetch(rss);
    }
  }

  if (newAddedPosts.length > 0) {
    fs.writeJsonSync('./data.json', dataArr, { spaces: 2 });
  }

  return newAddedPosts;
};

export default updateAll;
