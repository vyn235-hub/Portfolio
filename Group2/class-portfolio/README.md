# Trang tổng hợp portfolio

Mở `index.html` để xem danh sách. Bấm vào ảnh đại diện của bạn nào thì mở trang portfolio của bạn đó.

## Cấu trúc thư mục

```
index.html
css/style.css
js/members.js     <- danh sách thành viên (chỉ sửa file này)
js/main.js
members/
  ThienThu/       <- mỗi bạn một thư mục (chứa index.html, css/, js/, images/)
  TenBan2/
```

## Cách thêm portfolio của bạn

1. Đổi tên thư mục bài của bạn thành tên **không dấu, không khoảng trắng** (VD: `NguyenVanA`). Trong đó phải có file `index.html` và ảnh đại diện `images/avatar.jpg`.
2. Chép cả thư mục đó vào `members/`.
3. Mở `js/members.js`, thêm một khối vào mảng `MEMBERS` (nhớ dấu phẩy giữa các khối):

```js
{
  name: "Nguyễn Văn A",
  folder: "NguyenVanA",
  role: "Công nghệ thông tin"
}
```

4. Mở lại `index.html`, thấy ảnh và tên của bạn là xong.

Nếu ảnh của bạn tên khác (VD `avatar.png`), thêm dòng `avatar: "members/NguyenVanA/images/avatar.png"`. Nếu chưa có ảnh, trang tự hiện chữ cái đầu của tên.

## Lưu ý
- Chỉ **một người** (lớp trưởng) sửa `js/members.js` để tránh ghi đè; các bạn khác gửi thư mục bài và thông tin 3 dòng ở bước 3.
- Mọi đường dẫn trong bài của từng bạn đã là đường dẫn tương đối nên chạy được khi đặt trong `members/`.
- Muốn đưa lên mạng: tạo repo GitHub rồi bật GitHub Pages.
