<div align="center"><h1>前端文章集合</h1><p>点击右上角 <strong>Watch</strong> 订阅 <strong>最新前端技术文章</strong></p>
<a href="<%= obj.homePage %>"><%= obj.homePage %></a>
</div>

## 

- 项目目的：每天定时抓取最新前端技术文章，并推送到 GitHub 方便查看
- 文章来源：RSS 订阅源
- 抓取时间：每天的 06:00、08:00、12:00、18:00、22:00

## 

更新时间: <%= obj.currentDate %>，:rocket: 更新条数: +<%= obj.newData.length %>， ![](/assets/dot.png) 表示有更新

## 文章链接
<% _.each(obj.linksJson, function(e){ %>
<details open>
<summary id="<%= e.title.toLowerCase() %>">
 <%= e.title %>
</summary>

<% _.each(e.posts, function(item, index){  %>
- [<%= item.date %>-<%= item.title %>](<%= item.link %>) 
<% }) %>

</details>
<% }) %>
