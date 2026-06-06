const ICONS = {
  home: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  box: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7.3L12 12l8.7-4.7M12 22V12"/></svg>',
  cart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/><path d="M1 1h4l2.7 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>',
  users: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="7" r="3"/><path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1"/><path d="M16 11a3 3 0 1 0 0-6"/><path d="M21 20v-1a4 4 0 0 0-3-3.87"/></svg>',
  truck: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1 3h11v11H1zM12 7h4l3 4v4h-7V7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/></svg>',
  megaphone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11v2a4 4 0 0 0 4 4h1l5 4V3L8 7H7a4 4 0 0 0-4 4z"/><path d="M16 8a5 5 0 0 1 0 8"/><path d="M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
  settings: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  chart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 20h18"/><rect x="6" y="10" width="3" height="8" rx="1"/><rect x="11" y="6" width="3" height="12" rx="1"/><rect x="16" y="13" width="3" height="5" rx="1"/></svg>',
  tag: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.6 11.1L12.9 3.4a2 2 0 0 0-2.8 0L3.4 10.1a2 2 0 0 0 0 2.8l7.7 7.7a2 2 0 0 0 2.8 0l7.7-7.7a2 2 0 0 0 0-2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
};

const PAGES = {
  dashboard: { title: "لوحة المبيعات", sub: "نظرة شاملة على أداء متجر نواة اليوم", crumbs: ["الرئيسية", "لوحة المبيعات"] },
  products: { title: "المنتجات", sub: "إدارة كتالوج المنتجات والمخزون والتصنيفات", crumbs: ["المتجر", "المنتجات"] },
  orders: { title: "الطلبات", sub: "متابعة ومعالجة طلبات العملاء", crumbs: ["المتجر", "الطلبات"] },
  customers: { title: "العملاء", sub: "قاعدة بيانات العملاء وتاريخ المشتريات", crumbs: ["المتجر", "العملاء"] },
  shipping: { title: "الشحن والتوصيل", sub: "طرق الشحن وإحصائيات التسليم", crumbs: ["العمليات", "الشحن"] },
  marketing: { title: "التسويق", sub: "الكوبونات والحملات الترويجية", crumbs: ["العمليات", "التسويق"] },
  settings: { title: "إعدادات المتجر", sub: "إعدادات المتجر وبوابات الدفع ومناطق الشحن", crumbs: ["الإعدادات"] },
};

let route = "dashboard";
let orderFilter = "all";
let productFilter = "all";

const $ = (s) => document.querySelector(s);
const view = $("#view");

function orderTag(status) {
  const m = {
    new: ["tag-info", EcommerceAPI.ORDER_STATUSES.new],
    processing: ["tag-warn", EcommerceAPI.ORDER_STATUSES.processing],
    shipped: ["tag-purple", EcommerceAPI.ORDER_STATUSES.shipped],
    delivered: ["tag-success", EcommerceAPI.ORDER_STATUSES.delivered],
    cancelled: ["tag-danger", EcommerceAPI.ORDER_STATUSES.cancelled],
  };
  const [c, l] = m[status] || ["tag-neutral", status];
  return `<span class="tag ${c}">${l}</span>`;
}

function productStatusTag(status) {
  const m = {
    active: ["tag-success", "نشط"],
    draft: ["tag-neutral", "مسودة"],
    out_of_stock: ["tag-danger", "نفد المخزون"],
  };
  const [c, l] = m[status] || ["tag-neutral", status];
  return `<span class="tag ${c}">${l}</span>`;
}

function stockBadge(stock) {
  if (stock === 0) return `<span class="stock-badge stock-out">نفد المخزون</span>`;
  if (stock <= 10) return `<span class="stock-badge stock-low"><span class="num">${fmt(stock)}</span> قطعة — منخفض</span>`;
  return `<span class="stock-badge stock-in"><span class="num">${fmt(stock)}</span> قطعة</span>`;
}

function tierTag(tier) {
  const m = {
    "بلاتيني": "tag-purple",
    "ذهبي": "tag-warn",
    "فضي": "tag-info",
    "عادي": "tag-neutral",
  };
  return `<span class="tag ${m[tier] || "tag-neutral"}">${tier}</span>`;
}

function orderPipeline(status) {
  if (status === "cancelled") {
    return `<div class="pipeline"><div class="pipe-step cancelled" style="flex:1"><span class="pipe-num">✕</span>ملغي</div></div>`;
  }
  const steps = EcommerceAPI.ORDER_PIPELINE;
  const idx = { new: 0, processing: 1, shipped: 2, delivered: 3 }[status] ?? 0;
  return `<div class="pipeline">${steps.map((s, i) => {
    const cls = i < idx ? "done" : i === idx ? "active" : "";
    return `<div class="pipe-step ${cls}"><span class="pipe-num">${i + 1}</span>${s}</div>`;
  }).join("")}</div>`;
}

function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.hidden = false;
  setTimeout(() => { el.hidden = true; }, 3000);
}

function modal(title, body, actions = "") {
  const root = $("#modal-root");
  root.innerHTML = `<div class="modal-overlay" id="modal-close">
    <div class="modal" role="dialog"><div class="modal-header"><h3>${title}</h3></div>
    <div class="modal-body">${body}</div>
    <div class="modal-footer">${actions || '<button class="btn btn-secondary btn-sm" id="modal-ok">إغلاق</button>'}</div>
    </div></div>`;
  const close = () => { root.innerHTML = ""; };
  root.querySelector("#modal-close").addEventListener("click", (e) => { if (e.target.id === "modal-close") close(); });
  const ok = root.querySelector("#modal-ok");
  if (ok) ok.onclick = close;
  return { close, root };
}

function renderNav() {
  const sections = [
    { label: "عام", items: [["dashboard", "لوحة المبيعات", ICONS.home]] },
    { label: "المتجر", items: [
      ["products", "المنتجات", ICONS.box],
      ["orders", "الطلبات", ICONS.cart],
      ["customers", "العملاء", ICONS.users],
    ]},
    { label: "العمليات", items: [
      ["shipping", "الشحن", ICONS.truck],
      ["marketing", "التسويق", ICONS.megaphone],
    ]},
    { label: "إدارة", items: [
      ["settings", "الإعدادات", ICONS.settings],
    ]},
  ];
  $("#nav").innerHTML = sections.map((sec) =>
    `<div class="nav-section">${sec.label}</div>` +
    sec.items.map(([id, label, icon]) =>
      `<button class="nav-item${route === id ? " active" : ""}" data-r="${id}">${icon}${label}</button>`
    ).join("")
  ).join("");
  $("#nav").querySelectorAll("[data-r]").forEach((b) => { b.onclick = () => { route = b.dataset.r; render(); }; });
}

function setHeader() {
  const p = PAGES[route];
  $("#page-title").textContent = p.title;
  $("#page-sub").textContent = p.sub;
  $("#breadcrumb").innerHTML = p.crumbs.map((c, i) =>
    i < p.crumbs.length - 1 ? `<a href="#">${c}</a> / ` : c
  ).join("");
}

async function pageDashboard() {
  const d = await EcommerceAPI.getDashboard();
  $("#sidebar-sales").textContent = fmt(d.stats.todaySales);
  view.innerHTML = `
    <div class="grid-stats">
      <div class="card stat-card">
        <div class="stat-icon accent">${ICONS.chart}</div>
        <div class="stat-label">مبيعات اليوم</div>
        <div class="stat-value num">${fmtMoney(d.stats.todaySales)}</div>
        <div class="stat-meta up">+<span class="num">18%</span> عن أمس</div>
      </div>
      <div class="card stat-card">
        <div class="stat-icon">${ICONS.cart}</div>
        <div class="stat-label">إيرادات الشهر</div>
        <div class="stat-value num">${fmtMoney(d.stats.monthRevenue)}</div>
        <div class="stat-meta"><span class="num">${fmt(d.stats.totalOrders)}</span> طلب إجمالي</div>
      </div>
      <div class="card stat-card">
        <div class="stat-icon">${ICONS.box}</div>
        <div class="stat-label">طلبات نشطة</div>
        <div class="stat-value num">${fmt(d.stats.activeOrders)}</div>
        <div class="stat-meta">متوسط الطلب <span class="num">${fmtMoney(d.stats.avgOrderValue)}</span></div>
      </div>
      <div class="card stat-card">
        <div class="stat-icon accent">${ICONS.users}</div>
        <div class="stat-label">معدل التحويل</div>
        <div class="stat-value num">${fmtPct(d.stats.conversionRate)}</div>
        <div class="stat-meta up">+<span class="num">0.4%</span> تحسّن — <span class="num">${fmt(d.stats.customers)}</span> عميل</div>
      </div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-head"><h2>إيرادات المبيعات الشهرية</h2><button class="btn btn-ghost btn-sm">عرض التفاصيل</button></div>
        <div class="card-body"><div class="bar-chart">${d.chart.map((c) =>
          `<div class="bar-col"><div class="bar-fill" style="height:${c.value}%"></div><span class="bar-label">${c.label}</span></div>`
        ).join("")}</div></div>
      </div>
      <div class="card">
        <div class="card-head"><h2>آخر الأنشطة</h2></div>
        <div class="card-body"><ul class="activity-list">${d.activities.map((a) =>
          `<li class="activity-item"><span class="activity-dot${a.accent ? " accent" : ""}"></span><div style="flex:1">${a.text}<div class="activity-time">${a.time}</div></div></li>`
        ).join("")}</ul></div>
      </div>
    </div>
    <div class="grid-2" style="margin-top:20px">
      <div class="card">
        <div class="card-head"><h2>أحدث الطلبات</h2><button class="btn btn-secondary btn-sm" data-go="orders">عرض الكل</button></div>
        <div class="table-wrap"><table>
          <thead><tr><th>رقم الطلب</th><th>العميل</th><th>المبلغ</th><th>الحالة</th></tr></thead>
          <tbody>${d.recentOrders.map((o) => `<tr>
            <td class="td-primary num">${o.id}</td>
            <td>${o.customer}<span class="td-sub">${o.city}</span></td>
            <td class="num amount">${fmtMoney(o.total)}</td>
            <td>${orderTag(o.status)}</td>
          </tr>`).join("")}</tbody>
        </table></div>
      </div>
      <div class="card">
        <div class="card-head"><h2>المنتجات الأكثر مبيعاً</h2><button class="btn btn-secondary btn-sm" data-go="products">عرض الكل</button></div>
        <div class="table-wrap"><table>
          <thead><tr><th>المنتج</th><th>المبيعات</th><th>المخزون</th></tr></thead>
          <tbody>${d.topProducts.map((p) => `<tr>
            <td><div class="product-cell"><span class="product-thumb">${p.emoji}</span><div>${p.name}<span class="td-sub">${p.category}</span></div></div></td>
            <td class="num">${fmt(p.sold)}</td>
            <td>${stockBadge(p.stock)}</td>
          </tr>`).join("")}</tbody>
        </table></div>
      </div>
    </div>`;
  view.querySelectorAll("[data-go]").forEach((b) => {
    b.addEventListener("click", () => { route = b.dataset.go; render(); });
  });
}

async function pageProducts() {
  const q = $("#global-search").value;
  const list = await EcommerceAPI.getProducts(productFilter, q);
  view.innerHTML = `
    <div class="toolbar">
      <select id="product-filter" class="select">
        <option value="all">كل المنتجات</option>
        <option value="active">نشطة</option>
        <option value="low">مخزون منخفض</option>
        <option value="out">نفد المخزون</option>
        <option value="draft">مسودات</option>
      </select>
      <button class="btn btn-primary btn-sm">+ منتج جديد</button>
    </div>
    <div class="card">
      <div class="card-head"><h2>كتالوج المنتجات — <span class="num">${fmt(list.length)}</span> منتج</h2></div>
      <div class="table-wrap"><table>
        <thead><tr><th>المنتج</th><th>SKU</th><th>التصنيف</th><th>السعر</th><th>المخزون</th><th>المبيعات</th><th>الحالة</th></tr></thead>
        <tbody>${list.length ? list.map((p) => `<tr>
          <td><div class="product-cell"><span class="product-thumb">${p.emoji}</span><div class="td-primary">${p.name}<span class="td-sub num">${p.id}</span></div></div></td>
          <td class="num">${p.sku}</td>
          <td>${p.category}</td>
          <td class="num amount">${fmtMoney(p.price)}</td>
          <td>${stockBadge(p.stock)}</td>
          <td class="num">${fmt(p.sold)}</td>
          <td>${productStatusTag(p.status)}</td>
        </tr>`).join("") : `<tr><td colspan="7" class="empty-state">لا توجد منتجات مطابقة</td></tr>`}</tbody>
      </table></div>
    </div>`;
  const filter = view.querySelector("#product-filter");
  filter.value = productFilter;
  filter.onchange = () => { productFilter = filter.value; pageProducts(); };
}

async function pageOrders() {
  const q = $("#global-search").value;
  const list = await EcommerceAPI.getOrders(orderFilter, q);
  view.innerHTML = `
    <div class="toolbar">
      <select id="order-filter" class="select">
        <option value="all">كل الطلبات</option>
        <option value="new">جديد</option>
        <option value="processing">قيد المعالجة</option>
        <option value="shipped">تم الشحن</option>
        <option value="delivered">تم التسليم</option>
        <option value="cancelled">ملغي</option>
      </select>
      <button class="btn btn-primary btn-sm">+ طلب يدوي</button>
    </div>
    <div class="card">
      <div class="table-wrap"><table>
        <thead><tr><th>رقم الطلب</th><th>العميل</th><th>المدينة</th><th>المبلغ</th><th>الدفع</th><th>الشحن</th><th>التاريخ</th><th>الحالة</th><th>إجراء</th></tr></thead>
        <tbody>${list.length ? list.map((o) => `<tr>
          <td class="td-primary num">${o.id}</td>
          <td>${o.customer}<span class="td-sub num">${o.phone}</span></td>
          <td>${o.city}</td>
          <td class="num amount">${fmtMoney(o.total)}</td>
          <td>${o.payment}</td>
          <td>${o.shipping}</td>
          <td class="num">${o.date}</td>
          <td>${orderTag(o.status)}</td>
          <td><div class="btn-group">
            <button class="btn btn-ghost btn-sm" data-view="${o.id}">تفاصيل</button>
            ${o.status === "new" ? `<button class="btn btn-primary btn-sm" data-status="${o.id}" data-next="processing">معالجة</button>` : ""}
            ${o.status === "processing" ? `<button class="btn btn-accent btn-sm" data-status="${o.id}" data-next="shipped">شحن</button>` : ""}
            ${o.status === "shipped" ? `<button class="btn btn-accent btn-sm" data-status="${o.id}" data-next="delivered">تسليم</button>` : ""}
            ${["new", "processing"].includes(o.status) ? `<button class="btn btn-ghost btn-sm" data-status="${o.id}" data-next="cancelled" style="color:var(--danger)">إلغاء</button>` : ""}
          </div></td>
        </tr>`).join("") : `<tr><td colspan="9" class="empty-state">لا توجد طلبات مطابقة</td></tr>`}</tbody>
      </table></div>
    </div>`;

  const filter = view.querySelector("#order-filter");
  filter.value = orderFilter;
  filter.onchange = () => { orderFilter = filter.value; pageOrders(); };

  view.querySelectorAll("[data-view]").forEach((b) => {
    b.onclick = () => {
      const o = list.find((x) => x.id === b.dataset.view);
      const itemsHtml = o.items.map((it) =>
        `<li><span>${it.name} × <span class="num">${fmt(it.qty)}</span></span><strong class="num amount">${fmtMoney(it.price * it.qty)}</strong></li>`
      ).join("");
      modal(`تفاصيل ${o.id}`, `
        <p><strong>${o.customer}</strong> — ${o.city}</p>
        <div class="modal-detail-grid">
          <div class="modal-detail-item"><span>الهاتف</span><strong class="num">${o.phone}</strong></div>
          <div class="modal-detail-item"><span>طريقة الدفع</span><strong>${o.payment}</strong></div>
          <div class="modal-detail-item"><span>الشحن</span><strong>${o.shipping}</strong></div>
          <div class="modal-detail-item"><span>التاريخ</span><strong class="num">${o.date}</strong></div>
        </div>
        <p style="margin-top:8px"><strong>العنوان:</strong> ${o.address}</p>
        <p style="margin-top:12px;font-weight:600;color:var(--text)">المنتجات:</p>
        <ul class="modal-items">${itemsHtml}</ul>
        <p style="margin-top:12px;text-align:left"><strong>الإجمالي: <span class="num amount">${fmtMoney(o.total)}</span></strong></p>
        ${orderPipeline(o.status)}
      `);
    };
  });

  view.querySelectorAll("[data-status]").forEach((b) => {
    b.onclick = async () => {
      const next = b.dataset.next;
      await EcommerceAPI.updateOrderStatus(b.dataset.status, next);
      const labels = EcommerceAPI.ORDER_STATUSES;
      toast(`تم تحديث حالة الطلب إلى: ${labels[next]}`);
      pageOrders();
    };
  });
}

async function pageCustomers(q = "") {
  const list = await EcommerceAPI.getCustomers(q);
  view.innerHTML = `
    <div class="card">
      <div class="card-head"><h2>قاعدة العملاء — <span class="num">${fmt(list.length)}</span> عميل</h2></div>
      <div class="table-wrap"><table>
        <thead><tr><th>العميل</th><th>البريد</th><th>الهاتف</th><th>المدينة</th><th>الطلبات</th><th>إجمالي الإنفاق</th><th>التصنيف</th><th>تاريخ الانضمام</th></tr></thead>
        <tbody>${list.length ? list.map((c) => `<tr>
          <td class="td-primary">${c.name}<span class="td-sub num">${c.id}</span></td>
          <td>${c.email}</td>
          <td class="num">${c.phone}</td>
          <td>${c.city}</td>
          <td class="num">${fmt(c.orders)}</td>
          <td class="num amount">${fmtMoney(c.totalSpent)}</td>
          <td>${tierTag(c.tier)}</td>
          <td class="num">${c.joined}</td>
        </tr>`).join("") : `<tr><td colspan="8" class="empty-state">لا توجد نتائج مطابقة</td></tr>`}</tbody>
      </table></div>
    </div>`;
}

async function pageShipping() {
  const d = await EcommerceAPI.getShipping();
  view.innerHTML = `
    <div class="grid-stats" style="grid-template-columns:repeat(4,1fr)">
      <div class="card stat-card">
        <div class="stat-icon accent">${ICONS.truck}</div>
        <div class="stat-label">طلبات مُسلّمة</div>
        <div class="stat-value num">${fmt(d.stats.totalDelivered)}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-icon">${ICONS.cart}</div>
        <div class="stat-label">قيد التوصيل</div>
        <div class="stat-value num">${fmt(d.stats.inTransit)}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-icon">${ICONS.chart}</div>
        <div class="stat-label">متوسط أيام التسليم</div>
        <div class="stat-value num">${d.stats.avgDeliveryDays}</div>
        <div class="stat-meta">يوم عمل</div>
      </div>
      <div class="card stat-card">
        <div class="stat-icon accent">${ICONS.tag}</div>
        <div class="stat-label">نسبة التسليم في الوقت</div>
        <div class="stat-value num">${fmtPct(d.stats.onTimeRate)}</div>
        <div class="stat-meta up">+<span class="num">2.1%</span> عن الشهر السابق</div>
      </div>
    </div>
    <div class="person-grid">${d.methods.map((m) => `
      <div class="card shipping-card">
        <h3>${m.name}</h3>
        <p class="meta">${m.duration} — ${m.coverage}</p>
        <div class="shipping-stat">
          <div><span>السعر</span><strong class="num amount">${fmtMoney(m.price)}</strong></div>
          <div><span>الطلبات</span><strong class="num">${fmt(m.orders)}</strong></div>
          <div><span>في الوقت</span><strong class="num">${fmtPct(m.onTime)}</strong></div>
        </div>
      </div>`).join("")}</div>`;
}

async function pageMarketing() {
  const d = await EcommerceAPI.getMarketing();
  view.innerHTML = `
    <div class="grid-2">
      <div class="card">
        <div class="card-head"><h2>كوبونات الخصم</h2><button class="btn btn-primary btn-sm">+ كوبون جديد</button></div>
        <div class="table-wrap"><table>
          <thead><tr><th>الكود</th><th>النوع</th><th>القيمة</th><th>الحد الأدنى</th><th>الاستخدام</th><th>الانتهاء</th><th>الحالة</th></tr></thead>
          <tbody>${d.coupons.map((c) => `<tr>
            <td class="td-primary">${c.code}</td>
            <td>${c.type}</td>
            <td class="num">${c.type === "نسبة" ? fmtPct(c.value) : fmtMoney(c.value)}</td>
            <td class="num amount">${fmtMoney(c.minOrder)}</td>
            <td class="num">${fmt(c.used)} / ${fmt(c.maxUses)}</td>
            <td class="num">${c.expires}</td>
            <td>${c.status === "active" ? '<span class="tag tag-success">نشط</span>' : '<span class="tag tag-neutral">منتهي</span>'}</td>
          </tr>`).join("")}</tbody>
        </table></div>
      </div>
      <div class="card">
        <div class="card-head"><h2>الحملات الترويجية</h2><button class="btn btn-primary btn-sm">+ حملة جديدة</button></div>
        <div class="card-body" style="padding-top:0">${d.campaigns.map((c) => `
          <div style="padding:16px 0;border-bottom:1px solid var(--border-light)">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <h3 style="font-size:14px">${c.name}</h3>
              ${c.status === "active" ? '<span class="tag tag-success">نشطة</span>' : c.status === "scheduled" ? '<span class="tag tag-info">مجدولة</span>' : '<span class="tag tag-neutral">مكتملة</span>'}
            </div>
            <p style="font-size:12px;color:var(--text-muted);margin-top:4px">${c.channel}</p>
            <div class="kpi-row" style="margin-top:10px">
              <div class="kpi-item"><span>الوصول</span><strong class="num">${fmt(c.reach)}</strong></div>
              <div class="kpi-item"><span>النقرات</span><strong class="num">${fmt(c.clicks)}</strong></div>
              <div class="kpi-item"><span>التحويلات</span><strong class="num">${fmt(c.conversions)}</strong></div>
              <div class="kpi-item"><span>الإيرادات</span><strong class="num amount">${fmtMoney(c.revenue)}</strong></div>
            </div>
          </div>`).join("")}
        </div>
      </div>
    </div>`;
}

async function pageSettings() {
  const s = await EcommerceAPI.getSettings();
  view.innerHTML = `
    <div class="grid-2">
      <div class="card card-pad">
        <div class="settings-section">
          <h3>معلومات المتجر</h3>
          <div class="settings-row"><label>اسم المتجر</label><strong>${s.store.name}</strong></div>
          <div class="settings-row"><label>النطاق</label><strong class="num">${s.store.domain}</strong></div>
          <div class="settings-row"><label>البريد الإلكتروني</label><strong>${s.store.email}</strong></div>
          <div class="settings-row"><label>الهاتف</label><strong class="num">${s.store.phone}</strong></div>
          <div class="settings-row"><label>العملة</label><strong>ريال سعودي (SAR)</strong></div>
          <div class="settings-row"><label>ضريبة القيمة المضافة</label><strong class="num">${fmtPct(s.store.vat)}</strong></div>
        </div>
        <div class="settings-section">
          <h3>الإشعارات</h3>
          <div class="settings-row"><label>بريد — طلب جديد</label><strong class="${s.notifications.newOrderEmail ? "toggle-on" : "toggle-off"}">${s.notifications.newOrderEmail ? "مفعّل" : "معطّل"}</strong></div>
          <div class="settings-row"><label>تنبيه مخزون منخفض</label><strong class="${s.notifications.lowStockAlert ? "toggle-on" : "toggle-off"}">${s.notifications.lowStockAlert ? "مفعّل" : "معطّل"}</strong></div>
          <div class="settings-row"><label>تقرير يومي</label><strong class="${s.notifications.dailyReport ? "toggle-on" : "toggle-off"}">${s.notifications.dailyReport ? "مفعّل" : "معطّل"}</strong></div>
          <div class="settings-row"><label>رسائل SMS للعملاء</label><strong class="${s.notifications.smsCustomer ? "toggle-on" : "toggle-off"}">${s.notifications.smsCustomer ? "مفعّل" : "معطّل"}</strong></div>
        </div>
        <button class="btn btn-secondary btn-sm">تعديل الإعدادات</button>
      </div>
      <div>
        <div class="card card-pad" style="margin-bottom:20px">
          <div class="settings-section" style="margin-bottom:0">
            <h3>بوابات الدفع</h3>
            <div class="gateway-list">${s.payments.map((p) =>
              `<div class="gateway-badge ${p.active ? "active" : "inactive"}">
                <span>${p.name}</span>
                <span style="font-size:11px;font-weight:400">عمولة ${p.fee}</span>
              </div>`
            ).join("")}</div>
          </div>
        </div>
        <div class="card card-pad">
          <div class="settings-section" style="margin-bottom:0">
            <h3>مناطق الشحن</h3>
            <ul class="zone-list">${s.shippingZones.map((z) =>
              `<li class="zone-item">
                <div><strong>${z.name}</strong><span style="display:block;font-size:12px;color:var(--text-muted)">${z.cities}</span></div>
                <div style="text-align:left"><span class="num amount">${fmtMoney(z.rate)}</span><span style="display:block;font-size:11px;color:var(--text-muted)">شحن مجاني فوق <span class="num">${fmt(z.freeAbove)}</span> ر.س</span></div>
              </li>`
            ).join("")}</ul>
          </div>
        </div>
      </div>
    </div>`;
}

async function render() {
  setHeader();
  renderNav();
  view.innerHTML = `<div class="loading-state"><span class="spinner"></span> جاري تحميل البيانات...</div>`;
  const pages = {
    dashboard: pageDashboard,
    products: pageProducts,
    orders: pageOrders,
    customers: () => pageCustomers($("#global-search").value),
    shipping: pageShipping,
    marketing: pageMarketing,
    settings: pageSettings,
  };
  await pages[route]();
}

$("#global-search").addEventListener("input", () => {
  if (route === "customers") pageCustomers($("#global-search").value);
  else if (route === "orders") pageOrders();
  else if (route === "products") pageProducts();
});

$("#notif-btn").addEventListener("click", () => modal("الإشعارات", "<p>7 إشعارات جديدة: 2 طلبات جديدة، 1 مخزون منخفض، 3 طلبات بانتظار الشحن، تقرير مبيعات يومي جاهز.</p>"));

$("#store-select").addEventListener("change", (e) => {
  const labels = { main: "مدير المتجر", riyadh: "مدير فرع الرياض", jeddah: "مدير فرع جدة" };
  $("#profile-role").textContent = labels[e.target.value];
  toast("تم التبديل إلى: " + e.target.options[e.target.selectedIndex].text);
});

render();
