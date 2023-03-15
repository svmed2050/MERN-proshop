/* 
rafce - react arrow function component export

REST - representational state transfer

*/

/* 
MongoDB: 
svmed2050
NywNBAalHkmeB54U

mongodb+srv://svmed2050:NywNBAalHkmeB54U@cluster0.yzwizuv.mongodb.net/?retryWrites=true&w=majority

*/

/* 
Что такое функция Action creator?

1. Делает fetch/axios запрос к серверу, 
чтобы получить data

2. Получаем data от серверу и диспатчим
action в reducer, куда также прикладываем
payload (где содержится data)

3. Reducer записывает эту дату в state
и предоставляет эти данные к любому компоненту

*/

/* 
Instead of  just fetching data from the component and use effect, we're going to fetch it through a redux action and then pass the data down through state, through reducer

1. Create constants
2. Create reducer
3. Add reducer to store
4. Create action-creator
for fetching data (with axios)
5. Use new reducer in component with hooks - useDispatch and useSelector 
*/

/* 
Authentication - проверка подлинности

Authorization - процесс входа в аккаунт
посредством получения WEB токена (JWT)
JSON Web Token

1. When we login, it's going to create
and sign a JWT (with a secret key)

2. Token get send back to the client
(from server)

3. We store token in the browser

4. When we want to access the protected 
routes, we can send that token in the header
(to server)

*/

/* 

Смещение текущей строки вниз
Ctrl + Shift + Enter

*/

/* 
Production

1. Biuld out static assets for react

2. Backend loads that index.html file 

npm run build
*/
