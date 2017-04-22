## Giới thiệu
Repo này sử dụng hệ thống API của Goship để build một ứng dụng SPA đơn giản. Giúp các developer tiếp cận code và hệ thống nhanh hơn và dễ dàng hơn. Bạn có thể sử dụng code trong Repo này ngay cho hệ thống có sẵn của bạn hoặc tham khảo để tự xây dựng 1 hệ thống ship riêng dựa trên Goship API.
### Phiên bản khác xem tại đây
- [vuejs](https://github.com/alvintran/goship-example-vue)
- [jquery](https://github.com/alvintran/goship-example-jquery)
## Tài liệu liên quan
- [Tài liệu api goship](https://goship.io/developers)
- [react](https://facebook.github.io/react/)
- [react-router](https://github.com/ReactTraining/react-router)
- [axios](https://github.com/mzabriskie/axios)
- [lodash](https://lodash.com/)
## Cài đặt project
```bash
$ git clone https://github.com/alvintran/goship-example-react.git
$ cd goship-example-react
$ npm install
$ npm start
```
Tạo tài khoản goship lấy `client_key `& `client_secret` theo hướng dẫn [tại đây](https://goship.io/developers/24-authentication-api).
Copy `client_key` & `client_secret` của bạn vào file `/src/components/login/index.js`

```javascript
    this.state = {
      client_id: {{your_client_key}},
      client_secret: {{your_client_secret}},
      username: '',
      password: ''
    }
```
## Liên hệ
- [https://goship.io/about-us](https://goship.io/about-us)

