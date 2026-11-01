// Trang tổng hợp portfolio: dựng danh sách từ js/members.js
const $ = (selector) => document.querySelector(selector);

// Bỏ dấu tiếng Việt để gõ "thu" vẫn tìm ra "Thư"
function normalize(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
}

// Chữ cái đầu của họ và tên, dùng khi chưa có ảnh đại diện
function getInitials(name) {
  const words = name.trim().split(/\s+/);
  const first = words[0][0];
  const last = words[words.length - 1][0];
  return (words.length > 1 ? first + last : first).toUpperCase();
}

// Mỗi tên cho một màu nền riêng (0-359)
function getHue(name) {
  return [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360;
}

// Ảnh đại diện; nếu ảnh lỗi hoặc thiếu thì hiện chữ cái đầu
function createAvatar(member) {
  const avatar = document.createElement("span");
  avatar.className = "member__avatar";
  avatar.style.setProperty("--hue", getHue(member.name));
  avatar.textContent = getInitials(member.name);

  const image = document.createElement("img");
  image.className = "member__image";
  image.src = member.avatar || `members/${member.folder}/images/avatar.jpg`;
  image.alt = `Ảnh đại diện của ${member.name}`;
  image.addEventListener("load", () => avatar.replaceChildren(image));
  return avatar;
}

function createText(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

// Một thẻ thành viên: bấm vào bất kỳ đâu trên thẻ là mở portfolio của bạn đó
function createCard(member, index) {
  const item = document.createElement("li");
  item.className = "member";
  item.style.setProperty("--i", index);

  const link = document.createElement("a");
  link.className = "member__link";
  link.href = member.link || `members/${member.folder}/index.html`;
  link.setAttribute("aria-label", `Xem portfolio của ${member.name}`);
  link.append(createAvatar(member), createText("span", "member__name", member.name));
  if (member.role) link.append(createText("span", "member__role", member.role));
  link.append(createText("span", "member__cta", "Xem portfolio →"));

  item.append(link);
  return item;
}

// Vẽ danh sách theo từ khóa tìm kiếm
function renderMembers(keyword = "") {
  const query = normalize(keyword.trim());
  const matches = MEMBERS.filter((member) => normalize(member.name).includes(query));

  $("#memberGrid").replaceChildren(...matches.map(createCard));
  $("#emptyState").hidden = matches.length > 0;
  $("#memberCount").textContent = query
    ? `Tìm thấy ${matches.length} / ${MEMBERS.length} thành viên`
    : `${MEMBERS.length} thành viên`;
}

function initSearch() {
  $("#searchInput").addEventListener("input", (event) => renderMembers(event.target.value));
}

// Tiêu đề, mô tả, nhãn lấy từ SITE trong members.js
function initSiteInfo() {
  $("#siteTitle").textContent = SITE.title;
  $("#siteSubtitle").textContent = SITE.subtitle;
  if (SITE.badge) {
    $("#siteBadge").textContent = SITE.badge;
    $("#siteBadge").hidden = false;
  }
  document.title = SITE.title;
}

// Dark / Light mode, lưu bằng localStorage
function initTheme() {
  const button = $("#themeBtn");
  const root = document.documentElement;

  function applyTheme(theme) {
    root.dataset.theme = theme;
    button.textContent = theme === "dark" ? "☀" : "☾";
  }

  let saved = "light";
  try {
    saved = localStorage.getItem("theme") || "light";
  } catch (error) {
    // Bỏ qua nếu trình duyệt chặn localStorage
  }
  applyTheme(saved);

  button.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (error) {
      // Bỏ qua nếu trình duyệt chặn localStorage
    }
  });
}

// Ánh sáng chạy theo con trỏ chuột ở phần đầu trang
function initGlow() {
  const hero = $(".hero");
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", event.clientX - rect.left + "px");
    hero.style.setProperty("--my", event.clientY - rect.top + "px");
  });
}

initSiteInfo();
initTheme();
initGlow();
initSearch();
renderMembers();
