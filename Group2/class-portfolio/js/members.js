// ===== CẤU HÌNH TRANG =====
const SITE = {
  title: "Portfolio thành viên",
  subtitle: "Nhấp vào ảnh đại diện để xem trang cá nhân của từng bạn.",
  badge: "" // VD: "Lớp 23CNTT1 - Môn Lập trình Web" (để trống thì ẩn)
};

// ===== DANH SÁCH THÀNH VIÊN (xếp theo tên A-Z) =====
// Mỗi bạn chỉ cần thêm 1 khối { ... } vào mảng bên dưới:
//   name:   họ tên (bắt buộc)
//   folder: tên thư mục bài của bạn nằm trong members/ (bắt buộc, không dấu)
//   role:   dòng mô tả ngắn (không bắt buộc)
//   avatar: đường dẫn ảnh đại diện (không bắt buộc, mặc định members/<folder>/images/avatar.jpg)
//   link:   đường dẫn trang cá nhân (không bắt buộc, mặc định members/<folder>/index.html)
const MEMBERS = [
  {
    name: "Đặng Ngọc Thùy Dung",
    folder: "ThuyDung",
    role: "An ninh mạng"
  },
  {
    name: "Nguyễn Hoàng Duy",
    folder: "HoangDuy",
    role: "Full-stack Developer"
  },
  {
    name: "Nguyễn Đình Hào",
    folder: "DinhHao",
    role: "Phát triển game"
  },
  {
    name: "Trần Quang Trí Nguyên",
    folder: "QuangTriNguyen",
    role: "Công nghệ thông tin"
  },
  {
    name: "Dương Nguyễn Thiện Thư",
    folder: "ThienThu",
    role: "Khoa học dữ liệu và AI"
  },
  {
    name: "Nguyễn Lê Bảo Vy",
    folder: "BaoVy",
    role: "An ninh mạng",
    avatar: "members/BaoVy/image/avt1.jpg"
  }
];
