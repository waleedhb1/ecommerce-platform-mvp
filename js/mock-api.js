const EcommerceAPI = (() => {
  const ORDER_STATUSES = {
    new: "جديد",
    processing: "قيد المعالجة",
    shipped: "تم الشحن",
    delivered: "تم التسليم",
    cancelled: "ملغي",
  };

  const ORDER_PIPELINE = ["جديد", "قيد المعالجة", "تم الشحن", "تم التسليم"];

  const categories = [
    { id: "cat-1", name: "إلكترونيات", count: 24 },
    { id: "cat-2", name: "أزياء وموضة", count: 38 },
    { id: "cat-3", name: "عطور وتجميل", count: 19 },
    { id: "cat-4", name: "منزل ومطبخ", count: 31 },
    { id: "cat-5", name: "رياضة ولياقة", count: 15 },
    { id: "cat-6", name: "أطفال ورضع", count: 22 },
  ];

  const products = [
    { id: "PRD-1001", name: "سماعات بلوتوث نواة برو", sku: "NWA-BT-001", category: "إلكترونيات", price: 289, stock: 142, status: "active", sold: 384, emoji: "🎧" },
    { id: "PRD-1002", name: "عباية كلاسيكية — أسود", sku: "NWA-AB-042", category: "أزياء وموضة", price: 349, stock: 28, status: "active", sold: 156, emoji: "👗" },
    { id: "PRD-1003", name: "عطر نواة الذهبي 100مل", sku: "NWA-PR-018", category: "عطور وتجميل", price: 425, stock: 67, status: "active", sold: 221, emoji: "✨" },
    { id: "PRD-1004", name: "طقم أواني تيفال 12 قطعة", sku: "NWA-KT-007", category: "منزل ومطبخ", price: 599, stock: 15, status: "active", sold: 89, emoji: "🍳" },
    { id: "PRD-1005", name: "ساعة ذكية نواة فيت 3", sku: "NWA-WT-033", category: "إلكترونيات", price: 749, stock: 0, status: "out_of_stock", sold: 512, emoji: "⌚" },
    { id: "PRD-1006", name: "حذاء رياضي فلاي — أبيض", sku: "NWA-SP-021", category: "رياضة ولياقة", price: 319, stock: 54, status: "active", sold: 198, emoji: "👟" },
    { id: "PRD-1007", name: "مجموعة عناية بالبشرة", sku: "NWA-SK-009", category: "عطور وتجميل", price: 189, stock: 8, status: "active", sold: 267, emoji: "💄" },
    { id: "PRD-1008", name: "سرير أطفال قابل للطي", sku: "NWA-BB-004", category: "أطفال ورضع", price: 899, stock: 6, status: "active", sold: 34, emoji: "🛏️" },
    { id: "PRD-1009", name: "حقيبة يد جلد طبيعي", sku: "NWA-BG-015", category: "أزياء وموضة", price: 479, stock: 22, status: "active", sold: 143, emoji: "👜" },
    { id: "PRD-1010", name: "مكواة بخار احترافية", sku: "NWA-IR-002", category: "منزل ومطبخ", price: 259, stock: 41, status: "draft", sold: 0, emoji: "♨️" },
    { id: "PRD-1011", name: "دراجة تمارين منزلية", sku: "NWA-GY-011", category: "رياضة ولياقة", price: 1299, stock: 12, status: "active", sold: 47, emoji: "🚴" },
    { id: "PRD-1012", name: "كاميرا مراقبة ذكية", sku: "NWA-CM-028", category: "إلكترونيات", price: 399, stock: 73, status: "active", sold: 176, emoji: "📷" },
  ];

  const orders = [
    {
      id: "ORD-2026-4821", customer: "سارة بنت محمد القحطاني", phone: "0551234567", city: "الرياض",
      items: [{ name: "سماعات بلوتوث نواة برو", qty: 1, price: 289 }, { name: "ساعة ذكية نواة فيت 3", qty: 1, price: 749 }],
      total: 1038, status: "new", payment: "مدى", shipping: "أرامكس — توصيل سريع", date: "2026-06-06", address: "حي النرجس، شارع الأمير سلطان",
    },
    {
      id: "ORD-2026-4819", customer: "أحمد بن عبدالله العتيبي", phone: "0509876543", city: "جدة",
      items: [{ name: "عباية كلاسيكية — أسود", qty: 2, price: 349 }],
      total: 698, status: "processing", payment: "Apple Pay", shipping: "سمسا — توصيل عادي", date: "2026-06-05", address: "حي الروضة، طريق الملك عبدالعزيز",
    },
    {
      id: "ORD-2026-4815", customer: "نورة بنت فهد الشمري", phone: "0534567890", city: "الدمام",
      items: [{ name: "عطر نواة الذهبي 100مل", qty: 1, price: 425 }, { name: "مجموعة عناية بالبشرة", qty: 1, price: 189 }],
      total: 614, status: "shipped", payment: "تابي", shipping: "أرامكس — توصيل سريع", date: "2026-06-04", address: "حي الفيصلية، شارع الخليج",
    },
    {
      id: "ORD-2026-4810", customer: "خالد بن سعود المطيري", phone: "0543210987", city: "الرياض",
      items: [{ name: "طقم أواني تيفال 12 قطعة", qty: 1, price: 599 }],
      total: 599, status: "delivered", payment: "مدى", shipping: "سمسا — توصيل عادي", date: "2026-06-02", address: "حي الملقا، شارع أنس بن مالك",
    },
    {
      id: "ORD-2026-4805", customer: "ريم بنت عبدالرحمن الحربي", phone: "0567890123", city: "مكة المكرمة",
      items: [{ name: "حقيبة يد جلد طبيعي", qty: 1, price: 479 }, { name: "عطر نواة الذهبي 100مل", qty: 1, price: 425 }],
      total: 904, status: "delivered", payment: "Apple Pay", shipping: "أرامكس — توصيل سريع", date: "2026-06-01", address: "حي العزيزية، شارع إبراهيم الخليل",
    },
    {
      id: "ORD-2026-4801", customer: "عبدالله بن ناصر الدوسري", phone: "0556789012", city: "الخبر",
      items: [{ name: "حذاء رياضي فلاي — أبيض", qty: 1, price: 319 }],
      total: 319, status: "cancelled", payment: "مدى", shipping: "سمسا — توصيل عادي", date: "2026-05-30", address: "حي الراكة، شارع الملك فهد",
    },
    {
      id: "ORD-2026-4798", customer: "فاطمة بنت علي الزهراني", phone: "0502345678", city: "الطائف",
      items: [{ name: "دراجة تمارين منزلية", qty: 1, price: 1299 }],
      total: 1299, status: "processing", payment: "تابي", shipping: "أرامكس — توصيل سريع", date: "2026-06-05", address: "حي الشفا، شارع قريش",
    },
    {
      id: "ORD-2026-4795", customer: "محمد بن عمر الغامدي", phone: "0538901234", city: "أبها",
      items: [{ name: "كاميرا مراقبة ذكية", qty: 3, price: 399 }],
      total: 1197, status: "shipped", payment: "مدى", shipping: "سمسا — توصيل عادي", date: "2026-06-03", address: "حي المنسك، شارع الملك فيصل",
    },
    {
      id: "ORD-2026-4790", customer: "هند بنت سعد العمري", phone: "0545678901", city: "بريدة",
      items: [{ name: "سرير أطفال قابل للطي", qty: 1, price: 899 }],
      total: 899, status: "new", payment: "Apple Pay", shipping: "أرامكس — توصيل سريع", date: "2026-06-06", address: "حي الصفراء، شارع الملك عبدالله",
    },
    {
      id: "ORD-2026-4785", customer: "يوسف بن إبراهيم السبيعي", phone: "0559012345", city: "الرياض",
      items: [{ name: "سماعات بلوتوث نواة برو", qty: 2, price: 289 }, { name: "كاميرا مراقبة ذكية", qty: 1, price: 399 }],
      total: 977, status: "delivered", payment: "مدى", shipping: "سمسا — توصيل عادي", date: "2026-05-28", address: "حي الياسمين، شارع التحلية",
    },
  ];

  const customers = [
    { id: "CUS-001", name: "سارة بنت محمد القحطاني", email: "s.alqahtani@gmail.com", phone: "0551234567", city: "الرياض", orders: 12, totalSpent: 8450, joined: "2024-03-15", tier: "ذهبي" },
    { id: "CUS-002", name: "أحمد بن عبدالله العتيبي", email: "a.alotaibi@outlook.sa", phone: "0509876543", city: "جدة", orders: 8, totalSpent: 5230, joined: "2024-07-22", tier: "فضي" },
    { id: "CUS-003", name: "نورة بنت فهد الشمري", email: "n.alshamri@gmail.com", phone: "0534567890", city: "الدمام", orders: 15, totalSpent: 11200, joined: "2023-11-08", tier: "بلاتيني" },
    { id: "CUS-004", name: "خالد بن سعود المطيري", email: "k.almutairi@yahoo.com", phone: "0543210987", city: "الرياض", orders: 5, totalSpent: 2890, joined: "2025-01-10", tier: "فضي" },
    { id: "CUS-005", name: "ريم بنت عبدالرحمن الحربي", email: "r.alharbi@gmail.com", phone: "0567890123", city: "مكة المكرمة", orders: 9, totalSpent: 6780, joined: "2024-05-30", tier: "ذهبي" },
    { id: "CUS-006", name: "عبدالله بن ناصر الدوسري", email: "a.aldosari@hotmail.com", phone: "0556789012", city: "الخبر", orders: 3, totalSpent: 1240, joined: "2025-09-14", tier: "عادي" },
    { id: "CUS-007", name: "فاطمة بنت علي الزهراني", email: "f.alzahrani@gmail.com", phone: "0502345678", city: "الطائف", orders: 6, totalSpent: 4560, joined: "2024-12-01", tier: "فضي" },
    { id: "CUS-008", name: "محمد بن عمر الغامدي", email: "m.alghamdi@outlook.sa", phone: "0538901234", city: "أبها", orders: 11, totalSpent: 9340, joined: "2023-08-20", tier: "بلاتيني" },
    { id: "CUS-009", name: "هند بنت سعد العمري", email: "h.alomari@gmail.com", phone: "0545678901", city: "بريدة", orders: 2, totalSpent: 1890, joined: "2026-02-18", tier: "عادي" },
    { id: "CUS-010", name: "يوسف بن إبراهيم السبيعي", email: "y.alsubaie@gmail.com", phone: "0559012345", city: "الرياض", orders: 7, totalSpent: 5120, joined: "2024-10-05", tier: "ذهبي" },
  ];

  const shippingMethods = [
    { id: "ship-1", name: "أرامكس — توصيل سريع", duration: "1-2 يوم عمل", price: 25, coverage: "جميع مدن المملكة", orders: 342, onTime: 96 },
    { id: "ship-2", name: "سمسا — توصيل عادي", duration: "3-5 أيام عمل", price: 15, coverage: "جميع مدن المملكة", orders: 218, onTime: 91 },
    { id: "ship-3", name: "توصيل محلي — الرياض", duration: "نفس اليوم", price: 35, coverage: "الرياض فقط", orders: 156, onTime: 98 },
    { id: "ship-4", name: "استلام من الفرع", duration: "فوري", price: 0, coverage: "فروع الرياض وجدة", orders: 89, onTime: 100 },
  ];

  const coupons = [
    { id: "CPN-01", code: "NOVA20", type: "نسبة", value: 20, minOrder: 200, used: 145, maxUses: 500, expires: "2026-08-31", status: "active" },
    { id: "CPN-02", code: "WELCOME50", type: "مبلغ ثابت", value: 50, minOrder: 300, used: 89, maxUses: 200, expires: "2026-12-31", status: "active" },
    { id: "CPN-03", code: "EID2026", type: "نسبة", value: 15, minOrder: 150, used: 312, maxUses: 1000, expires: "2026-06-15", status: "active" },
    { id: "CPN-04", code: "VIP100", type: "مبلغ ثابت", value: 100, minOrder: 800, used: 23, maxUses: 50, expires: "2026-09-30", status: "active" },
    { id: "CPN-05", code: "SUMMER10", type: "نسبة", value: 10, minOrder: 100, used: 478, maxUses: 500, expires: "2026-05-31", status: "expired" },
  ];

  const campaigns = [
    { id: "CMP-01", name: "تخفيضات نهاية الأسبوع", channel: "بريد إلكتروني + واتساب", reach: 12400, clicks: 1860, conversions: 234, revenue: 89400, status: "active" },
    { id: "CMP-02", name: "إطلاق مجموعة العطور الجديدة", channel: "إنستغرام + سناب", reach: 28500, clicks: 4200, conversions: 512, revenue: 218000, status: "active" },
    { id: "CMP-03", name: "عرض العودة للمدارس", channel: "بريد إلكتروني", reach: 8900, clicks: 1120, conversions: 98, revenue: 34500, status: "scheduled" },
    { id: "CMP-04", name: "حملة رمضان 2026", channel: "متعدد القنوات", reach: 45200, clicks: 8900, conversions: 1240, revenue: 567000, status: "completed" },
  ];

  const activities = [
    { text: "طلب جديد ORD-2026-4821 من سارة القحطاني — 1,038 ر.س", time: "منذ 12 دقيقة", accent: true },
    { text: "تم شحن الطلب ORD-2026-4815 إلى نورة الشمري", time: "منذ ساعة", accent: false },
    { text: "تنبيه: مخزون منخفض — مجموعة عناية بالبشرة (8 قطع)", time: "منذ ساعتين", accent: false },
    { text: "تم تسليم ORD-2026-4810 لخالد المطيري بنجاح", time: "منذ 4 ساعات", accent: true },
    { text: "كوبون NOVA20 استُخدم 145 مرة هذا الشهر", time: "أمس", accent: false },
  ];

  const delay = (ms = 220) => new Promise((r) => setTimeout(r, ms));

  return {
    ORDER_STATUSES,
    ORDER_PIPELINE,
    categories,

    async getDashboard() {
      await delay();
      const todaySales = 4285;
      const monthRevenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0) + 186420;
      const activeOrders = orders.filter((o) => ["new", "processing", "shipped"].includes(o.status)).length;
      const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);

      return {
        stats: {
          todaySales,
          monthRevenue,
          totalOrders: orders.length + 1847,
          activeOrders,
          conversionRate: 3.8,
          avgOrderValue: 687,
          customers: customers.length + 2840,
        },
        chart: [
          { label: "يناير", value: 42 },
          { label: "فبراير", value: 55 },
          { label: "مارس", value: 48 },
          { label: "أبريل", value: 62 },
          { label: "مايو", value: 71 },
          { label: "يونيو", value: 58 },
        ],
        activities,
        recentOrders: orders.slice(0, 5),
        topProducts,
      };
    },

    async getProducts(filter = "all", q = "") {
      await delay();
      let list = [...products];
      if (filter === "active") list = list.filter((p) => p.status === "active");
      else if (filter === "low") list = list.filter((p) => p.stock > 0 && p.stock <= 10);
      else if (filter === "out") list = list.filter((p) => p.stock === 0);
      else if (filter === "draft") list = list.filter((p) => p.status === "draft");
      const term = q.trim();
      if (term) {
        list = list.filter((p) =>
          p.name.includes(term) || p.sku.includes(term) || p.category.includes(term) || p.id.includes(term)
        );
      }
      return list;
    },

    async getOrders(filter = "all", q = "") {
      await delay();
      let list = [...orders];
      if (filter !== "all") list = list.filter((o) => o.status === filter);
      const term = q.trim();
      if (term) {
        list = list.filter((o) =>
          o.id.includes(term) || o.customer.includes(term) || o.city.includes(term) || o.phone.includes(term)
        );
      }
      return list;
    },

    async updateOrderStatus(id, status) {
      await delay(350);
      const order = orders.find((o) => o.id === id);
      if (order) order.status = status;
      return order;
    },

    async getCustomers(q = "") {
      await delay();
      const term = q.trim();
      if (!term) return [...customers];
      return customers.filter((c) =>
        c.name.includes(term) || c.email.includes(term) || c.phone.includes(term) || c.city.includes(term) || c.id.includes(term)
      );
    },

    async getShipping() {
      await delay();
      const totalDelivered = orders.filter((o) => o.status === "delivered").length;
      const totalShipped = orders.filter((o) => o.status === "shipped").length;
      const avgDeliveryDays = 2.4;
      return {
        methods: [...shippingMethods],
        stats: {
          totalDelivered: totalDelivered + 1680,
          inTransit: totalShipped + 124,
          avgDeliveryDays,
          onTimeRate: 94.2,
        },
      };
    },

    async getMarketing() {
      await delay();
      return { coupons: [...coupons], campaigns: [...campaigns] };
    },

    async getSettings() {
      await delay();
      return {
        store: {
          name: "متجر نواة",
          domain: "nawa-store.sa",
          email: "support@nawa-store.sa",
          phone: "920001234",
          currency: "SAR",
          vat: 15,
          language: "العربية",
        },
        payments: [
          { id: "mada", name: "مدى", active: true, fee: "1.75%" },
          { id: "applepay", name: "Apple Pay", active: true, fee: "2.0%" },
          { id: "tabby", name: "تابي", active: true, fee: "5.0%" },
          { id: "stcpay", name: "STC Pay", active: false, fee: "1.5%" },
        ],
        shippingZones: [
          { id: "zone-1", name: "المنطقة الوسطى", cities: "الرياض، القصيم، حائل", rate: 15, freeAbove: 300 },
          { id: "zone-2", name: "المنطقة الغربية", cities: "جدة، مكة، المدينة، الطائف", rate: 20, freeAbove: 350 },
          { id: "zone-3", name: "المنطقة الشرقية", cities: "الدمام، الخبر، الظهران، الجبيل", rate: 20, freeAbove: 350 },
          { id: "zone-4", name: "المناطق الجنوبية", cities: "أبها، جازان، نجران", rate: 25, freeAbove: 400 },
        ],
        notifications: {
          newOrderEmail: true,
          lowStockAlert: true,
          dailyReport: true,
          smsCustomer: false,
        },
      };
    },
  };
})();
