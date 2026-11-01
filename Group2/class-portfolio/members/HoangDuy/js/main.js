'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* 1. Năm ở footer */
$('#year').textContent = new Date().getFullYear();

/* 2. Dark mode (nhớ lựa chọn) */
const root = document.documentElement;
root.classList.add('js');
try {
  const saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;
  else if (matchMedia('(prefers-color-scheme: dark)').matches) root.dataset.theme = 'dark';
} catch (e) {}
$('#theme-btn').addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

/* 3. Menu mobile */
const menu = $('#menu'), menuBtn = $('#menu-btn');
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.textContent = open ? '✕' : '☰';
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') { menu.classList.remove('open'); menuBtn.textContent = '☰'; menuBtn.setAttribute('aria-expanded', false); }
});

/* 4. Đánh dấu mục menu đang xem */
const links = $$('.nav a');
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) links.forEach(a => a.classList.toggle('current', a.hash === '#' + en.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
links.forEach(a => { const s = $(a.hash); if (s) spy.observe(s); });

/* 5. Tabs học vấn / kinh nghiệm / hoạt động */
const tabs = $$('[role="tab"]');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute('aria-selected', on);
    $('#' + t.getAttribute('aria-controls')).hidden = !on;
  });
}));

/* 6. Lọc dự án */
$$('.chip').forEach(chip => chip.addEventListener('click', () => {
  $$('.chip').forEach(c => c.classList.toggle('active', c === chip));
  const f = chip.dataset.filter;
  $$('.project').forEach(p => { p.hidden = !(f === 'all' || p.dataset.cat.split(' ').includes(f)); });
}));

/* 7. Modal chi tiết dự án */
const projects = {
  m1: { title: 'Mô hình hóa kiến trúc hệ thống', tech: 'PlantUML, Mermaid.js, UML, ERD, Sequence Diagram',
        desc: 'Thiết kế bộ sơ đồ UML, ERD và Sequence Diagram hoàn chỉnh cho hệ thống quản lý, chuẩn hóa bằng PlantUML và Mermaid.' },
  m2: { title: 'Đánh giá & phân tích an toàn web', tech: 'OWASP ZAP, DVWA, OWASP Top 10',
        desc: 'Quét lỗ hổng OWASP Top 10 trên môi trường DVWA bằng OWASP ZAP, lập báo cáo khắc phục chi tiết.' },
  m3: { title: 'Website Portfolio cá nhân', tech: 'HTML5, CSS3, JavaScript',
        desc: 'Website giới thiệu bản thân, kỹ năng, học vấn và dự án, tập trung vào giao diện hiện đại, responsive, dark mode và điều hướng rõ ràng.' },
  m4: { title: 'Hệ thống đặt lịch sân thể thao', tech: 'HTML/CSS/JS, SQL, UML',
        desc: 'Ý tưởng nền tảng đặt lịch sân bóng đá/cầu lông cho trường học hoặc câu lạc bộ, hỗ trợ xem lịch, gửi yêu cầu và quản lý trạng thái đặt sân.' },
  m5: { title: 'Cộng đồng nhiếp ảnh phim', tech: 'Web App, UI/UX, Database',
        desc: 'Ý tưởng nền tảng kết nối người yêu nhiếp ảnh phim với dịch vụ phòng tối và phòng chụp, có thể mở rộng hồ sơ người dùng và danh sách dịch vụ.' },
  m6: { title: 'Giao diện quản lý thông tin', tech: 'UI Design, CSS Grid, JavaScript',
        desc: 'Mẫu giao diện quản lý dữ liệu với bố cục dễ nhìn, bảng thông tin, biểu mẫu nhập liệu và các trạng thái tương tác cơ bản.' }
};
const projectExtra = {"m1": {"img": "du-an-kien-truc.jpg", "feat": ["Sequence Diagram luồng đăng nhập Client → API → Database", "ERD và UML cho hệ thống quản lý", "Chuẩn hóa tài liệu bằng PlantUML và Mermaid"]}, "m2": {"img": "du-an-bao-mat.jpg", "feat": ["Quét OWASP Top 10 trên DVWA bằng OWASP ZAP", "Phát hiện SQL Injection, XSS, thiếu CSRF token, thiếu header bảo mật", "Lập báo cáo kèm hướng khắc phục"]}, "m3": {"img": "du-an-portfolio.jpg", "feat": ["Responsive trên Desktop, Tablet, Mobile", "Dark mode, tabs, lọc dự án, modal, form kiểm tra dữ liệu", "Mô phỏng request an toàn ở mục Thử nghiệm"]}, "m4": {"img": "du-an-dat-san.jpg", "feat": ["Xem lịch sân theo ngày và khung giờ", "Gửi yêu cầu đặt sân", "Quản lý trạng thái: trống, chờ duyệt, đã đặt"]}, "m5": {"img": "du-an-nhiep-anh-phim.jpg", "feat": ["Bảng tin chia sẻ ảnh phim", "Danh sách phòng tối, phòng chụp", "Mở rộng hồ sơ người dùng"]}, "m6": {"img": "du-an-quan-ly.jpg", "feat": ["Thống kê tổng quan bằng thẻ số liệu và biểu đồ", "Bảng người dùng có trạng thái", "Biểu mẫu nhập liệu và trạng thái tương tác"]}};
const modal = $('#modal');
$$('[data-modal]').forEach(btn => btn.addEventListener('click', () => {
  const p = projects[btn.dataset.modal];
  const ex = projectExtra[btn.dataset.modal];
  $('#modal-img').src = 'images/' + ex.img; $('#modal-img').alt = 'Ảnh giao diện: ' + p.title;
  $('#modal-feat').innerHTML = ex.feat.map(f => '<li>' + f + '</li>').join('');
  $('#modal-title').textContent = p.title;
  $('#modal-desc').textContent = p.desc;
  $('#modal-tech').textContent = p.tech;
  modal.showModal();
}));
$('#modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

/* 7b. Xem ảnh lớn trong thư viện (lightbox) */
const box = $('#lightbox');
$$('.shot').forEach(b => b.addEventListener('click', () => {
  $('#lightbox-img').src = b.dataset.src;
  $('#lightbox-img').alt = $('img', b).alt;
  $('#lightbox-cap').textContent = b.dataset.cap;
  box.showModal();
}));
$('#lightbox-close').addEventListener('click', () => box.close());
box.addEventListener('click', e => { if (e.target === box) box.close(); });

/* 8. Thử nghiệm: mô phỏng request đi qua Client → API → Database */
const steps = $$('#flow li');
const reset = () => steps.forEach(li => li.className = '');
const setText = (i, t) => steps[i].querySelector('span').textContent = t;
let timer;
$('#lab-run').addEventListener('click', () => {
  clearTimeout(timer); reset();
  const v = $('#lab-input').value.trim();
  const attack = /('|--|;|\bor\b\s+\S+=|<\s*script|<\/|onerror)/i.test(v);
  setText(0, 'POST /login'); setText(3, 'Đang xử lý…');
  const run = i => {
    if (i > 3) return;
    if (i === 1 && attack) {
      steps[1].className = 'bad'; setText(1, 'Phát hiện SQLi / XSS');
      steps[3].className = 'bad'; setText(3, '400: request bị chặn');
      return;
    }
    if (i === 3) { steps[3].className = 'good'; setText(3, v ? '200 OK · đăng nhập hợp lệ' : '401: thiếu tên đăng nhập'); if (!v) steps[3].className = 'bad'; return; }
    steps[i].className = 'on';
    if (i === 1) setText(1, 'Đầu vào hợp lệ');
    timer = setTimeout(() => run(i + 1), 550);
  };
  run(0);
});

/* 9. Form liên hệ: kiểm tra dữ liệu bằng JavaScript */
const form = $('#contact-form');
const rules = {
  name:  v => v.length < 2 ? 'Họ tên cần ít nhất 2 ký tự.' : '',
  email: v => !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? 'Email chưa đúng định dạng, ví dụ name@example.com.' : '',
  msg:   v => v.length < 10 ? 'Nội dung cần ít nhất 10 ký tự.' : ''
};
const field = k => ({ input: $('#f-' + k), err: $('#e-' + k) });
const check = k => {
  const { input, err } = field(k);
  const m = rules[k](input.value.trim());
  err.textContent = m;
  input.closest('.field').classList.toggle('invalid', !!m);
  input.setAttribute('aria-invalid', !!m);
  return !m;
};
Object.keys(rules).forEach(k => field(k).input.addEventListener('blur', () => check(k)));
form.addEventListener('submit', e => {
  e.preventDefault();
  const ok = Object.keys(rules).map(check).every(Boolean);
  const msg = $('#form-ok');
  if (ok) { msg.textContent = 'Đã gửi. Cảm ơn bạn, mình sẽ phản hồi sớm.'; form.reset(); setTimeout(() => msg.textContent = '', 4000); }
  else { msg.textContent = ''; $('.invalid input, .invalid textarea')?.focus(); }
});

/* 10. Hiệu ứng hiện dần khi cuộn */
const revealEls = $$('.about-head, .about-photo, .about-info, .card, .project, .hobby, .gallery li, .goal, .lab, form, .pane, .tabs, .filters, .contact > div:first-child');
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold: .12 });
revealEls.forEach(el => {
  el.classList.add('reveal');
  el.style.transitionDelay = ($$(':scope > .reveal', el.parentElement).indexOf(el) * 90) + 'ms';
  io.observe(el);
});

/* 11. Ánh sáng thẻ theo chuột */
document.addEventListener('pointermove', e => {
  const t = e.target.closest('.card, .project, .hobby');
  if (!t) return;
  const r = t.getBoundingClientRect();
  t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  t.style.setProperty('--my', (e.clientY - r.top) + 'px');
});

/* 12. Thanh tiến trình cuộn trang */
const bar = $('#progress');
const onScroll = () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1) * 100) + '%';
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();
