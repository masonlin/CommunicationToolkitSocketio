# CommunicationToolkitSocketio
Use **Node/Socket.io/React/Flux/BootStrap** to implement a suit communication tool and use **Webpack** to create the bundle.　　

=============
1. Messanger (100%) - realtime sharing message.  　　

  ![messanger] (http://web.cc.ncu.edu.tw/~104554013/images/Messanger) ![MessangerIPhone] (http://web.cc.ncu.edu.tw/~104554013/images/MessangerIPhone6P.png)  

   這個即時訊息傳送網頁程式是利用Socket.io作為媒介，所有的用戶在前端輸入伺服器IP及自己的匿稱後，即可隨時加入進行即時通信。因前端使用Bootstrap，故可在一般電腦上透過瀏覽器使用，或在行動裝置的瀏覽器使用。
   

2. share photo on - Sharing (100%)  
  
3. Refactoring Sharing - Sharing2 (100%) - realtime sharing photo.
  
  ![sharing2] (https://github.com/masonlin/CommunicationToolkitSocketio/blob/master/Sharing2/Client/img/show.png?raw=true)
   *   Refactoring for the gallery features, change codes from ES5 to ES6.  
   *   Add react-image-gallery.js  
   *   In server side, Use babel-cli to replace the ES6 statment.
   *   In client side, Webpack include the babel-loader
   *   Refactoring to ES6 is completed.  
   
   於 server 目錄下執行 babel-node sharing.js 啟動照片分享平台，只要登入該伺服器 IP 即可即時與好友分享圖片，前端使用Bootstrap，故行動裝置瀏覽器亦可使用。

3. share file (0%)　　

4. vedio and audio stream (webRTC) (0%)　　

5. meassanger bot (0%)　　

6. data encryption and decryption (0%)　　

7. draw on browser (0%)　　

8. data onto DB (0%)　　

9. Integration all (0%)　　

2. React Native - Messanger (0%)  


