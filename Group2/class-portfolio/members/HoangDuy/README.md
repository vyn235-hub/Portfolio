# Portfolio – Nguyễn Hoàng Duy

Mở `index.html` bằng trình duyệt để xem (cần Internet chỉ để tải font Google; không có vẫn chạy bình thường).

## Cấu trúc
```
portfolio/
├── index.html
├── css/style.css
├── js/main.js
└── images/   (avatar, ảnh gallery, ảnh minh họa dự án & sở thích)
```

## Đối chiếu 19 tiêu chí
| # | Tiêu chí | Nằm ở đâu |
|---|----------|-----------|
| 1 | Header / Navbar / Banner | `<header>` + hero đầu trang, menu trỏ đúng các section |
| 2 | Giới thiệu bản thân | `#about` (About Me, 2 cột): họ tên, ảnh `images/avatar.jpg`, ngành, định hướng, đoạn giới thiệu, thẻ thông tin |
| 3 | Mục tiêu nghề nghiệp | `#goal` |
| 4 | Kỹ năng | `#skills` (HTML, CSS, JS, Python, SQL, Git, OWASP...) |
| 5 | Học vấn / Kinh nghiệm / Hoạt động | `#background` (3 tab) |
| 6 | Dự án cá nhân (≥2) | `#projects`: 6 dự án có tên, mô tả, công nghệ, hình, link |
| 7 | Chứng chỉ / Giải thưởng / Sở thích | `#certs`, `#extras` (ghi rõ "Chưa có chứng chỉ chính thức") |
| 8 | Cấu trúc HTML | header, nav, main, section, article, figure, dialog, footer |
| 9 | Layout | CSS Grid + Flexbox |
| 10 | Thẩm mỹ | Bảng màu, font, khoảng cách thống nhất; light/dark |
| 11 | Responsive | Breakpoint 1100 / 1000 / 820 / 520 px |
| 12 | CSS3 | hover, transition, transform, keyframes, backdrop-filter |
| 13 | JavaScript | DOM + Event trong `js/main.js` |
| 14 | Chức năng tương tác (≥2) | Menu mobile, Dark mode, Tabs, Lọc dự án, Modal, Lightbox ảnh, scroll-spy |
| 15 | Form liên hệ | `#contact-form`, kiểm tra họ tên / email / nội dung bằng JS |
| 16 | Clean code | Có chú thích, đặt tên rõ ràng |
| 17 | Tổ chức source | Tách `css/`, `js/`, `images/` |
| 18 | Cá nhân hóa | Ảnh, kỹ năng, dự án, liên hệ của chính sinh viên |
| 19 | Sáng tạo | Mục "Thử nghiệm": mô phỏng request Client → API → Database, phát hiện SQLi/XSS |

## Thay ảnh bằng ảnh thật của bạn
Các ảnh dự án, học vấn, sở thích (`du-an-*.jpg`, `edu-*.jpg`, `hobby-*.jpg`) là ảnh giao diện minh họa dựng sẵn.
Để dùng ảnh thật, chỉ cần chụp rồi **lưu đè cùng tên file** trong `images/` (tỉ lệ 16:10, ví dụ 960x600), không cần sửa code:
- `du-an-bao-mat.jpg`: ảnh chụp báo cáo OWASP ZAP thật của bạn
- `du-an-kien-truc.jpg`: ảnh sơ đồ PlantUML/Mermaid bạn đã vẽ
- `hobby-chay-bo.jpg`: ảnh chụp Strava hoặc ảnh chạy bộ
- `edu-uth.jpg`: ảnh khuôn viên trường
- `avatar.jpg`: ảnh chân dung
