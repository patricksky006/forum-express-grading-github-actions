# 餐廳論壇-實作網站

## 介紹

- 製作一個餐廳論壇網站，區分前台和後台平台，同時針對身為後端腳色，設置API給前端

## 動機
- 學習成為一個後端工程師
  
## 功能
* 使用者可以註冊/登入/登出網站
* 使用者可以透過Facebook登入此網站
* 使用者可以瀏覽所有餐廳與個別餐廳詳細資料
* 使用者可以在瀏覽所有餐廳資料時，可以用分類篩選餐廳
* 使用者可以對餐廳留下評論
* 使用者可以收藏/取消收藏餐廳
* 使用者可以點讚/取消點讚餐廳
* 使用者可以查看最新上架的 10 筆餐廳
* 使用者可以查看最新的 10 筆評論
* 使用者可以編輯自己的個人資料
* 使用者可以查看自己評論過、收藏過的餐廳
* 使用者可以追蹤/取消追蹤其他的使用者

後台功能:
* 只有管理者可以進去管理後台
* 管理者擁有一般使用者全部在餐廳論台上的操作功能
* 管理者可以新增/修改/刪除一家餐廳
* 管理者可以刪除餐廳的評論
* 管理者可以瀏覽全部已註冊使用者清單
* root管理員帳號可設定/取消其他使用者帳號的管理者權限，root管理員帳號本身管理者權限不可修改
* 管理者可以新增/修改/刪除餐廳分類

## 啟動專案 
打開終端機

將專案複製到本地:
```
$ git clone https://github.com/patricksky006/forum-express-grading-github-actions.git
```
進入專案資料夾:
```
$ cd forum-express-grading-github-actions
```
安裝npm:
```
$ npm install
```
設定資料庫MySQL
需要與 config/config.json 一致
```
create database forum;
```

環境參數.env檔如下  
JWT_SECRET: 自行設定

建立資料表
```
npx sequelize db:migrate
```

建立種子資料
```
npx sequelize db:seed:all
```
建立 upload和temp 資料夾
```
mkdir upload
```
```
mkdir temp
```
啟動專案:
```
$ npm run start
```
成功時，終端機會顯示以下訊息，請打開瀏覽器進入網址(http://localhost:3000):
```
express server is running on http://localhost:3000
```
內建試用帳號:
```
管理者帳號:
帳號: root@example.com
密碼: 12345678

使用者帳號:
帳號: user1@example.com
密碼: 12345678
帳號: user2@example.com
密碼: 12345678
```
欲結束使用:
```
ctrl + c
```
## 開發工具
* Visual Studio Code v1.81.1
* Git v2.41.0.window.3
* npm 9.5.0
* nvm 1.1.11
* node v14.16.0
* nodemon v3.0.1
* bcryptjs 2.4.3
* connect-flash 0.1.1
* dayjs 1.10.6
* dotenv 10.0.0
* express 4.17.1
* express-handlebars 5.3.3
* express-session 1.17.2
* faker 5.5.3
* jsonwebtoken 8.5.1
* method-override 3.0.0
* multer 1.4.3
* mysql2 2.3.0
* passport 0.4.1
* passport-jwt 4.0.0
* passport-local 1.0.0
* sequelize 6.6.5
* sequelize-cli 6.2.0
* Bootstrap 5.0.2 CDN
* popper.js 2.9.2 CDN
