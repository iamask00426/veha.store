"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useStore, useToast } from "@/context";
import { formatINR, safeLocalStorageGet, safeLocalStorageSet } from "@/lib/utils";
import type { Product, Order, Coupon, OrderStatus, BadgeType, Metal } from "@/types";
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Percent, 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  ChevronRight, 
  RefreshCw, 
  Truck, 
  Eye, 
  EyeOff,
  AlertCircle,
  TrendingUp,
  Coins,
  Inbox,
  Users,
  Layers,
  Printer,
  Calendar,
  Globe,
  Tag,
  Briefcase
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { brands as defaultBrands, categories as defaultCategories } from "@/lib/data";

export default function AdminDashboard() {
  const { 
    products, 
    orders, 
    coupons, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus, 
    addCoupon, 
    deleteCoupon 
  } = useStore();
  
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "orders" | "coupons" | "customers" | "metadata"
  >("overview");

  // Date Range Stats state
  const [overviewPeriod, setOverviewPeriod] = useState<"today" | "7d" | "30d" | "all">("all");

  // Filter States
  const [productSearch, setProductSearch] = useState("");
  const [productCategory, setProductCategory] = useState("all");
  const [productStatusFilter, setProductStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [productBadgeFilter, setProductBadgeFilter] = useState<"all" | string>("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [customerSearch, setCustomerSearch] = useState("");

  // Categories & Brands custom list loaded from localStorage
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [brandsList, setBrandsList] = useState<any[]>([]);

  useEffect(() => {
    const localCats = safeLocalStorageGet<any[]>("veha_categories", defaultCategories);
    setCategoriesList(localCats);

    const localBrands = safeLocalStorageGet<any[]>("veha_brands", defaultBrands);
    setBrandsList(localBrands);
  }, []);

  // Form States (Modals)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    title: "",
    categorySlug: "rings",
    metal: "silver" as Metal,
    material: "925 Sterling Silver",
    price: 0,
    mrp: 0,
    discountPct: 0,
    images: [] as string[],
    badges: [] as BadgeType[],
    virtualTryOn: false,
    sameDayDelivery: false,
    inStock: true,
    stock: 10,
    description: "",
    subcategory: "Silver Rings",
    isActive: true
  });

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: "",
    type: "percent" as "percent" | "flat" | "freeShipping",
    value: 10,
    minOrder: 499,
    appliesTo: "all" as "all" | string[],
    description: "",
    expiresAt: "",
    maxUses: 100,
    isActive: true
  });

  // Category and Brand addition form states
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    icon: "💍"
  });

  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [brandForm, setBrandForm] = useState({
    name: "",
    slug: "",
    tagline: "",
    logo: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=120&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80"
  });

  // Tracking info modal state
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState({ trackingId: "", carrier: "" });
  const [isInvoicePrintOpen, setIsInvoicePrintOpen] = useState(false);

  // Filter orders by date range
  const dateFilteredOrders = useMemo(() => {
    const now = Date.now();
    return orders.filter((o) => {
      const orderDate = new Date(o.createdAt).getTime();
      const diffTime = now - orderDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (overviewPeriod === "today") return diffDays <= 1;
      if (overviewPeriod === "7d") return diffDays <= 7;
      if (overviewPeriod === "30d") return diffDays <= 30;
      return true;
    });
  }, [orders, overviewPeriod]);

  // Statistics Calculations based on date filter
  const stats = useMemo(() => {
    const activeOrders = dateFilteredOrders.filter((o) => o.status !== "Cancelled");
    const totalRevenue = activeOrders.reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = dateFilteredOrders.filter((o) => o.status === "Pending").length;
    const completedOrders = dateFilteredOrders.filter((o) => o.status === "Delivered").length;
    const avgOrderValue = activeOrders.length > 0 ? totalRevenue / activeOrders.length : 0;
    
    return {
      revenue: totalRevenue,
      ordersCount: dateFilteredOrders.length,
      pending: pendingOrders,
      completed: completedOrders,
      avgValue: avgOrderValue,
      productsCount: products.length,
      couponsCount: coupons.length
    };
  }, [dateFilteredOrders, products, coupons]);

  // Best Selling Products Calculation based on period filter
  const topSellingProducts = useMemo(() => {
    const salesMap: Record<string, { qty: number; revenue: number; product: Product | null }> = {};
    
    dateFilteredOrders.forEach((order) => {
      if (order.status === "Cancelled") return;
      order.items.forEach((item) => {
        if (!salesMap[item.productId]) {
          const prod = products.find(p => p.id === item.productId) || null;
          salesMap[item.productId] = { qty: 0, revenue: 0, product: prod };
        }
        salesMap[item.productId].qty += item.qty;
        salesMap[item.productId].revenue += item.price * item.qty;
      });
    });

    return Object.values(salesMap)
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);
  }, [dateFilteredOrders, products]);

  // Unique customers listing derived from orders
  const customerList = useMemo(() => {
    const customersMap: Record<string, {
      name: string;
      email: string;
      phone: string;
      city: string;
      orderCount: number;
      totalSpent: number;
    }> = {};

    orders.forEach((o) => {
      const email = o.customer.email.toLowerCase().trim();
      if (!customersMap[email]) {
        customersMap[email] = {
          name: o.customer.name,
          email: o.customer.email,
          phone: o.customer.phone,
          city: o.customer.city,
          orderCount: 0,
          totalSpent: 0
        };
      }
      customersMap[email].orderCount += 1;
      if (o.status !== "Cancelled") {
        customersMap[email].totalSpent += o.total;
      }
    });

    return Object.values(customersMap).filter(c => 
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) || 
      c.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.city.toLowerCase().includes(customerSearch.toLowerCase())
    );
  }, [orders, customerSearch]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(productSearch.toLowerCase()) || p.id.includes(productSearch);
      const matchCategory = productCategory === "all" || p.categorySlug === productCategory;
      const matchStatus = productStatusFilter === "all" ||
        (productStatusFilter === "active" && p.isActive !== false) ||
        (productStatusFilter === "inactive" && p.isActive === false);
      const matchBadge = productBadgeFilter === "all" || (p.badges && p.badges.includes(productBadgeFilter as any));
      return matchSearch && matchCategory && matchStatus && matchBadge;
    });
  }, [products, productSearch, productCategory, productStatusFilter, productBadgeFilter]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch = o.id.toLowerCase().includes(orderSearch.toLowerCase()) || 
                          o.customer.name.toLowerCase().includes(orderSearch.toLowerCase());
      const matchStatus = orderStatusFilter === "all" || o.status === orderStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // Initialize tracking input when an order is selected
  useEffect(() => {
    if (selectedOrderDetails) {
      setTrackingInput({
        trackingId: selectedOrderDetails.trackingId || "",
        carrier: selectedOrderDetails.carrier || ""
      });
    }
  }, [selectedOrderDetails]);

  // Product CRUD handlers
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title || productForm.price <= 0 || productForm.mrp <= 0) {
      showToast("Please enter a valid title and prices", "error");
      return;
    }

    const imageArray = productForm.images.length > 0 
      ? productForm.images 
      : ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80"];

    const formattedProduct = {
      ...productForm,
      images: imageArray,
      brandSlug: editingProduct ? editingProduct.brandSlug : (brandsList[0]?.slug ?? "veha-silver"),
      collections: editingProduct ? editingProduct.collections : [],
      occasions: editingProduct ? editingProduct.occasions : [],
      rating: editingProduct ? editingProduct.rating : 5,
      reviewCount: editingProduct ? editingProduct.reviewCount : 0,
      variants: editingProduct ? editingProduct.variants : []
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, formattedProduct);
      showToast("Product updated successfully", "success");
    } else {
      addProduct(formattedProduct);
      showToast("Product added successfully", "success");
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
    resetProductForm();
  };

  const startEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      title: p.title,
      categorySlug: p.categorySlug,
      metal: p.metal,
      material: p.material,
      price: p.price,
      mrp: p.mrp,
      discountPct: p.discountPct,
      images: p.images,
      badges: p.badges ?? [],
      virtualTryOn: p.virtualTryOn,
      sameDayDelivery: p.sameDayDelivery,
      inStock: p.inStock,
      stock: p.stock !== undefined ? p.stock : (p.inStock ? 10 : 0),
      description: p.description ?? "",
      subcategory: p.subcategory,
      isActive: p.isActive !== false
    });
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
      showToast("Product deleted", "info");
    }
  };

  const resetProductForm = () => {
    setProductForm({
      title: "",
      categorySlug: categoriesList[0]?.slug || "rings",
      metal: "silver",
      material: "925 Sterling Silver",
      price: 0,
      mrp: 0,
      discountPct: 0,
      images: [] as string[],
      badges: [] as BadgeType[],
      virtualTryOn: false,
      sameDayDelivery: false,
      inStock: true,
      stock: 10,
      description: "",
      subcategory: "Silver Rings",
      isActive: true
    });
  };

  // Coupon CRUD handlers
  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponForm.code || couponForm.value <= 0) {
      showToast("Please enter a valid coupon code and value", "error");
      return;
    }

    addCoupon(couponForm);
    showToast(`Coupon ${couponForm.code} added`, "success");
    setIsCouponModalOpen(false);
    setCouponForm({
      code: "",
      type: "percent",
      value: 10,
      minOrder: 499,
      appliesTo: "all",
      description: "",
      expiresAt: "",
      maxUses: 100,
      isActive: true
    });
  };

  // Category & Brand additions
  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name || !categoryForm.slug) {
      showToast("Please enter a valid category name and slug", "error");
      return;
    }
    const updated = [...categoriesList, categoryForm];
    setCategoriesList(updated);
    safeLocalStorageSet("veha_categories", updated);
    showToast(`Category "${categoryForm.name}" added successfully!`, "success");
    setIsCategoryModalOpen(false);
    setCategoryForm({ name: "", slug: "", icon: "💍" });
  };

  const handleBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandForm.name || !brandForm.slug) {
      showToast("Please enter a valid brand name and slug", "error");
      return;
    }
    const updated = [...brandsList, brandForm];
    setBrandsList(updated);
    safeLocalStorageSet("veha_brands", updated);
    showToast(`Brand "${brandForm.name}" added successfully!`, "success");
    setIsBrandModalOpen(false);
    setBrandForm({
      name: "",
      slug: "",
      tagline: "",
      logo: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=120&auto=format&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=80"
    });
  };

  const handleUpdateTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderDetails) return;
    updateOrderStatus(
      selectedOrderDetails.id,
      selectedOrderDetails.status,
      trackingInput.trackingId,
      trackingInput.carrier
    );
    showToast("Tracking information updated successfully", "success");
    setSelectedOrderDetails({
      ...selectedOrderDetails,
      trackingId: trackingInput.trackingId,
      carrier: trackingInput.carrier
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col justify-between">
        <div>
          {/* Branding header */}
          <div className="p-5 border-b border-gray-50 flex items-center gap-2">
            <img src="/logo.jpg" alt="VEHA SILVER Logo" className="w-8 h-8 rounded-full object-cover" />
            <div>
              <h1 className="text-sm font-black text-gray-900 tracking-wider">VEHA SILVER</h1>
              <p className="text-[10px] font-bold text-[#D06780] uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>

          {/* Tab links */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "overview"
                  ? "bg-[#FDE9EC] text-[#D06780]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <BarChart3 size={18} />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "products"
                  ? "bg-[#FDE9EC] text-[#D06780]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Package size={18} />
              Products
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "orders"
                  ? "bg-[#FDE9EC] text-[#D06780]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <ShoppingBag size={18} />
              Orders
              {stats.pending > 0 && (
                <span className="ml-auto bg-[#D06780] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                  {stats.pending}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("coupons")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "coupons"
                  ? "bg-[#FDE9EC] text-[#D06780]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Percent size={18} />
              Coupons
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "customers"
                  ? "bg-[#FDE9EC] text-[#D06780]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Users size={18} />
              Customers
            </button>
            <button
              onClick={() => setActiveTab("metadata")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "metadata"
                  ? "bg-[#FDE9EC] text-[#D06780]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Layers size={18} />
              Brands & Categories
            </button>
          </nav>
        </div>

        {/* Bottom storefront trigger */}
        <div className="p-4 border-t border-gray-50 hidden md:block">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[#D06780] text-[#D06780] rounded-xl text-xs font-bold hover:bg-[#FDE9EC]/50 transition-all"
          >
            ← View Storefront
          </Link>
        </div>
      </aside>

      {/* MAIN MAIN CONTENT CONTAINER */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-h-screen">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">Real-time statistics & business analytics</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Date range filter */}
                <select
                  value={overviewPeriod}
                  onChange={(e) => setOverviewPeriod(e.target.value as any)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-[#D06780]/20 transition-all cursor-pointer shadow-xs"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
                <div className="text-xs text-gray-400 font-semibold bg-white border px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  Live Sync Active
                </div>
              </div>
            </div>

            {/* KPI GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                  <Coins size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Total Revenue</p>
                  <p className="text-lg font-black text-gray-800 mt-0.5">{formatINR(stats.revenue)}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShoppingBag size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Total Orders</p>
                  <p className="text-lg font-black text-gray-800 mt-0.5">{stats.ordersCount}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FDE9EC] text-[#D06780] flex items-center justify-center">
                  <Package size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Total Products</p>
                  <p className="text-lg font-black text-gray-800 mt-0.5">{stats.productsCount}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Percent size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Active Coupons</p>
                  <p className="text-lg font-black text-gray-800 mt-0.5">{stats.couponsCount}</p>
                </div>
              </div>
            </div>

            {/* CHARTS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Line Chart */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm lg:col-span-2">
                <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-1.5">
                  <TrendingUp size={18} className="text-[#D06780]" />
                  Sales & Revenue Analytics ({overviewPeriod === "all" ? "All Time" : overviewPeriod === "today" ? "Today" : `Last ${overviewPeriod}`})
                </h3>
                
                {/* SVG Line Chart Simulator */}
                <div className="relative h-60 w-full bg-gray-50/50 rounded-2xl border border-gray-100 p-4">
                  <div className="absolute inset-x-0 top-[20%] border-t border-dashed border-gray-100" />
                  <div className="absolute inset-x-0 top-[40%] border-t border-dashed border-gray-100" />
                  <div className="absolute inset-x-0 top-[60%] border-t border-dashed border-gray-100" />
                  <div className="absolute inset-x-0 top-[80%] border-t border-dashed border-gray-100" />

                  <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D06780" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#D06780" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M 0 200 L 0 160 Q 200 80, 400 120 T 800 50 L 1000 20 L 1000 200 Z" fill="url(#chart-grad)" />
                    <path d="M 0 160 Q 200 80, 400 120 T 800 50 L 1000 20" fill="none" stroke="#D06780" strokeWidth="4" strokeLinecap="round" />
                  </svg>

                  <div className="absolute inset-x-4 bottom-2 flex justify-between text-[10px] font-bold text-gray-400">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun (Current)</span>
                  </div>
                </div>
              </div>

              {/* Best Sellers */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-1.5">
                    <SparklesIcon />
                    Top Performing Products
                  </h3>
                  {topSellingProducts.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 text-xs font-semibold">
                      No sales recorded in this period.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {topSellingProducts.map(({ qty, revenue, product }, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-all">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden border flex-shrink-0 bg-gray-50">
                            <img src={product?.images[0] || "/placeholder-jewelry.jpg"} alt="" className="object-cover w-full h-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-800 truncate leading-tight">{product?.title ?? "Product"}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{qty} Units Sold</p>
                          </div>
                          <div className="text-right text-xs font-black text-[#D06780]">
                            {formatINR(revenue)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RECENT ORDERS FEED */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                <h3 className="font-bold text-gray-800">Recent Orders</h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs font-semibold text-[#D06780] hover:underline"
                >
                  Manage All Orders →
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="p-10 text-center flex flex-col items-center">
                  <Inbox className="text-gray-300 mb-2" size={32} />
                  <p className="text-sm text-gray-500 font-medium">No orders received yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 text-[10px] font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-50">
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Items</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-gray-600">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="hover:bg-gray-50/30">
                          <td className="p-4 font-mono font-bold text-gray-800">{o.id}</td>
                          <td className="p-4 font-semibold text-gray-700">{o.customer.name}</td>
                          <td className="p-4 text-xs text-gray-500">
                            {o.items.length} item{o.items.length !== 1 ? "s" : ""}
                          </td>
                          <td className="p-4 font-bold text-gray-800">{formatINR(o.total)}</td>
                          <td className="p-4">
                            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              o.status === "Delivered" ? "bg-green-50 text-green-600" :
                              o.status === "Shipped" ? "bg-blue-50 text-blue-600" :
                              o.status === "Cancelled" ? "bg-red-50 text-red-600" :
                              "bg-amber-50 text-amber-600"
                            }`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-gray-400">
                            {new Date(o.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Products Manager</h2>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">Add, edit, or replenish items in stock</p>
              </div>
              <button
                onClick={() => {
                  resetProductForm();
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#D06780] text-[#FDE9EC] rounded-xl font-bold text-sm hover:bg-[#9C3E55] active:scale-95 transition-all shadow-md flex items-center gap-1.5"
              >
                <Plus size={16} />
                Add Product
              </button>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by title or ID..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#D06780]/20 focus:border-[#D06780] transition-all"
                />
              </div>
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-[#D06780]/20 transition-all capitalize cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categoriesList.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
              <select
                value={productStatusFilter}
                onChange={(e) => setProductStatusFilter(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-[#D06780]/20 transition-all cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
              <select
                value={productBadgeFilter}
                onChange={(e) => setProductBadgeFilter(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-[#D06780]/20 transition-all cursor-pointer"
              >
                <option value="all">All Badges</option>
                <option value="New">New Badge</option>
                <option value="Trending">Trending Badge</option>
                <option value="Bestseller">Bestseller Badge</option>
                <option value="Sale">Sale Badge</option>
                <option value="Exclusive">Exclusive Badge</option>
              </select>
            </div>

            {/* Products table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 text-[10px] font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-50">
                      <th className="p-4">Image</th>
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Metal / Material</th>
                      <th className="p-4">Price / MRP</th>
                      <th className="p-4">Inventory Stock</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-600">
                    {filteredProducts.map((p) => {
                      const isOOS = (p.stock ?? 0) === 0 || !p.inStock;
                      return (
                        <tr key={p.id} className="hover:bg-gray-50/30">
                          <td className="p-4">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border bg-gray-50 flex-shrink-0">
                              <Image
                                src={p.images[0] ?? "/placeholder-jewelry.jpg"}
                                alt={p.title}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-gray-800 leading-snug">{p.title}</p>
                            <p className="text-[10px] text-gray-400 font-mono mt-0.5">ID: {p.id}</p>
                          </td>
                          <td className="p-4 capitalize text-xs">{(p.categorySlug || "").replace(/-/g, " ")}</td>
                          <td className="p-4">
                            <p className="text-xs font-semibold text-gray-700 capitalize">{p.metal}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{p.material}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-gray-800">{formatINR(p.price)}</p>
                            <p className="text-[10px] text-gray-400 line-through mt-0.5">{formatINR(p.mrp)}</p>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col gap-1 items-start">
                              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                !isOOS 
                                  ? "bg-green-50 text-green-600" 
                                  : "bg-red-50 text-red-600"
                              }`}>
                                {!isOOS ? "In Stock" : "Out of Stock"}
                              </span>
                              <span className="text-xs font-semibold text-gray-500">Qty: {p.stock ?? 0}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              p.isActive !== false
                                ? "bg-green-50 text-green-600 border border-green-200"
                                : "bg-gray-100 text-gray-500 border border-gray-200"
                            }`}>
                              {p.isActive !== false ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                              <button
                                onClick={() => {
                                  updateProduct(p.id, { isActive: p.isActive === false });
                                  showToast(
                                    `Product ${p.isActive === false ? "activated" : "deactivated"} successfully`,
                                    "success"
                                  );
                                }}
                                className={`p-2 rounded-xl transition-all ${
                                  p.isActive !== false
                                    ? "text-green-500 hover:bg-green-50"
                                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                }`}
                                title={p.isActive !== false ? "Deactivate Product" : "Activate Product"}
                              >
                                {p.isActive !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                              </button>
                              <button
                                onClick={() => startEditProduct(p)}
                                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                                title="Edit Product / Replenish Stock"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                title="Delete Product"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGER */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Orders Manager</h2>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">Process orders, update status, and manage tracking</p>
              </div>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Order ID or customer name..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#D06780]/20 focus:border-[#D06780] transition-all"
                />
              </div>
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-[#D06780]/20 transition-all cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Orders table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 text-[10px] font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-50">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-600">
                    {filteredOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50/30">
                        <td className="p-4 font-mono font-bold text-gray-800">{o.id}</td>
                        <td className="p-4">
                          <p className="font-semibold text-gray-700">{o.customer.name}</p>
                          <p className="text-[10px] text-gray-400">{o.customer.city}</p>
                        </td>
                        <td className="p-4 text-xs">
                          {new Date(o.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-xs font-semibold text-gray-500">
                          {o.items.reduce((sum, item) => sum + item.qty, 0)} Items
                        </td>
                        <td className="p-4 font-black text-gray-800">{formatINR(o.total)}</td>
                        <td className="p-4">
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                            className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full outline-none border cursor-pointer transition-all ${
                              o.status === "Delivered" ? "bg-green-50 text-green-600 border-green-200" :
                              o.status === "Shipped" ? "bg-blue-50 text-blue-600 border-blue-200" :
                              o.status === "Cancelled" ? "bg-red-50 text-red-600 border-red-200" :
                              "bg-amber-50 text-amber-600 border-amber-200"
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-1">
                            <button
                              onClick={() => setSelectedOrderDetails(o)}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"
                              title="View Order Details & Tracking"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("Cancel this order? Stock will be restored.")) {
                                  updateOrderStatus(o.id, "Cancelled");
                                  showToast("Order Cancelled. Stock restored.", "info");
                                }
                              }}
                              disabled={o.status === "Cancelled"}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                              title="Cancel Order"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COUPONS MANAGER */}
        {activeTab === "coupons" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Coupons Manager</h2>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">Manage store-wide discount coupons and view conversion usage</p>
              </div>
              <button
                onClick={() => setIsCouponModalOpen(true)}
                className="px-4 py-2.5 bg-[#D06780] text-[#FDE9EC] rounded-xl font-bold text-sm hover:bg-[#9C3E55] active:scale-95 transition-all shadow-md flex items-center gap-1.5"
              >
                <Plus size={16} />
                Add Coupon
              </button>
            </div>

            {/* Coupons table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 text-[10px] font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-50">
                      <th className="p-4">Code</th>
                      <th className="p-4">Coupon Type</th>
                      <th className="p-4">Value</th>
                      <th className="p-4">Min Order</th>
                      <th className="p-4">Applies To</th>
                      <th className="p-4">Usage Count</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-600">
                    {coupons.map((c) => {
                      const displayUsage = c.usageCount !== undefined ? c.usageCount : 0;
                      return (
                        <tr key={c.code} className="hover:bg-gray-50/30">
                          <td className="p-4 font-mono font-bold text-[#D06780] text-sm tracking-wider">{c.code}</td>
                          <td className="p-4 capitalize text-xs font-semibold">{c.type}</td>
                          <td className="p-4 font-semibold text-gray-700">
                            {c.type === "percent" ? `${c.value}% OFF` : formatINR(c.value)}
                          </td>
                          <td className="p-4 text-xs font-medium">{formatINR(c.minOrder)}</td>
                          <td className="p-4 text-xs capitalize">
                            {c.appliesTo === "all" ? "Entire Store" : Array.isArray(c.appliesTo) ? c.appliesTo.join(", ") : String(c.appliesTo)}
                          </td>
                          <td className="p-4 text-xs font-bold text-gray-700">
                            {displayUsage} Uses
                          </td>
                          <td className="p-4">
                            <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              c.isActive !== false ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
                            }`}>
                              {c.isActive !== false ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => {
                                if (confirm("Delete this coupon code?")) {
                                  deleteCoupon(c.code);
                                  showToast("Coupon deleted", "info");
                                }
                              }}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              title="Delete Coupon"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMERS DIRECTORY */}
        {activeTab === "customers" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900">Customers Directory</h2>
              <p className="text-xs text-gray-400 mt-0.5 font-medium">Detailed purchasing statistics grouped by buyer</p>
            </div>

            {/* Filter controls */}
            <div className="flex bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or city..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#D06780]/20 focus:border-[#D06780] transition-all"
                />
              </div>
            </div>

            {/* Customers table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 text-[10px] font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-50">
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">City</th>
                      <th className="p-4">Orders Placed</th>
                      <th className="p-4">Total Amount Spent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-600">
                    {customerList.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-10 text-center text-gray-400 text-xs font-semibold">
                          No customer details found. Place checkout orders first.
                        </td>
                      </tr>
                    ) : (
                      customerList.map((customer, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/30">
                          <td className="p-4 font-bold text-gray-800">{customer.name}</td>
                          <td className="p-4 font-mono text-xs">{customer.email}</td>
                          <td className="p-4 text-xs font-medium text-gray-500">{customer.phone}</td>
                          <td className="p-4 text-xs font-semibold capitalize text-gray-600">{customer.city}</td>
                          <td className="p-4 text-xs font-bold text-gray-500">{customer.orderCount} Orders</td>
                          <td className="p-4 font-black text-green-600">{formatINR(customer.totalSpent)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: BRANDS & CATEGORIES CRUD */}
        {activeTab === "metadata" && (
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900">Brands & Categories Manager</h2>
              <p className="text-xs text-gray-400 mt-0.5 font-medium">Add, view, and organize custom brands and category groupings</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* CATEGORIES SECTION */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-serif font-bold text-gray-800 flex items-center gap-1.5">
                    <Layers size={18} className="text-[#D06780]" />
                    Product Categories
                  </h3>
                  <button
                    onClick={() => setIsCategoryModalOpen(true)}
                    className="px-3 py-1.5 bg-[#D06780] text-white rounded-lg text-xs font-bold hover:bg-[#9C3E55] transition-all flex items-center gap-1 shadow-sm"
                  >
                    <Plus size={14} /> Add Category
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="divide-y divide-gray-50">
                    {categoriesList.map((cat) => (
                      <div key={cat.slug} className="p-3.5 flex items-center justify-between hover:bg-gray-50/30">
                        <div className="flex items-center gap-3">
                          <span className="text-xl bg-gray-50 p-2 rounded-lg">{cat.icon || "💍"}</span>
                          <div>
                            <p className="text-sm font-bold text-gray-800">{cat.name}</p>
                            <p className="text-[10px] text-gray-400 font-mono mt-0.5">Slug: {cat.slug}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider bg-gray-50 px-2 py-0.5 rounded">
                          {products.filter((p) => p.categorySlug === cat.slug).length} Items
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BRANDS SECTION */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-serif font-bold text-gray-800 flex items-center gap-1.5">
                    <Briefcase size={18} className="text-[#D06780]" />
                    Partner Brands
                  </h3>
                  <button
                    onClick={() => setIsBrandModalOpen(true)}
                    className="px-3 py-1.5 bg-[#D06780] text-white rounded-lg text-xs font-bold hover:bg-[#9C3E55] transition-all flex items-center gap-1 shadow-sm"
                  >
                    <Plus size={14} /> Add Brand
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="divide-y divide-gray-50">
                    {brandsList.map((brand) => (
                      <div key={brand.slug} className="p-3.5 flex items-center justify-between hover:bg-gray-50/30">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={brand.logo}
                            alt=""
                            className="w-10 h-6 object-contain border bg-gray-50 rounded"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-800 truncate">{brand.name}</p>
                            <p className="text-[10px] text-gray-400 truncate mt-0.5">{brand.tagline}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider bg-gray-50 px-2 py-0.5 rounded flex-shrink-0">
                          {products.filter((p) => p.brandSlug === brand.slug).length} Products
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* PRODUCT ADD/EDIT MODAL DIALOG */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsProductModalOpen(false)} />
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 z-10 space-y-6 relative">
            <button 
              onClick={() => setIsProductModalOpen(false)}
              className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-serif font-bold text-gray-900 border-b pb-3 border-gray-100">
              {editingProduct ? "Edit Product Details" : "Add New Product"}
            </h3>

            <form onSubmit={handleProductSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={productForm.title}
                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                    placeholder="e.g. Classic Sterling Silver Band"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category Slug</label>
                  <select
                    value={productForm.categorySlug}
                    onChange={(e) => setProductForm({ ...productForm, categorySlug: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all capitalize cursor-pointer"
                  >
                    {categoriesList.map(c => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subcategory</label>
                  <input
                    type="text"
                    required
                    value={productForm.subcategory}
                    onChange={(e) => setProductForm({ ...productForm, subcategory: e.target.value })}
                    placeholder="e.g. Hoop Earrings"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Metal</label>
                  <select
                    value={productForm.metal}
                    onChange={(e) => setProductForm({ ...productForm, metal: e.target.value as Metal })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all cursor-pointer"
                  >
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                    <option value="rose-gold">Rose Gold</option>
                    <option value="stainless-steel">Stainless Steel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Material Description</label>
                  <input
                    type="text"
                    required
                    value={productForm.material}
                    placeholder="e.g. 925 Sterling Silver"
                    onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Selling Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price || ""}
                    onChange={(e) => {
                      const price = parseInt(e.target.value) || 0;
                      const discountPct = productForm.mrp > 0 ? Math.round(((productForm.mrp - price) / productForm.mrp) * 100) : 0;
                      setProductForm({ ...productForm, price, discountPct });
                    }}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">MRP Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={productForm.mrp || ""}
                    onChange={(e) => {
                      const mrp = parseInt(e.target.value) || 0;
                      const discountPct = mrp > 0 ? Math.round(((mrp - productForm.price) / mrp) * 100) : 0;
                      setProductForm({ ...productForm, mrp, discountPct });
                    }}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                  />
                </div>

                {/* Stock Quantity */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={productForm.stock}
                    onChange={(e) => {
                      const stock = parseInt(e.target.value) || 0;
                      setProductForm({ ...productForm, stock, inStock: stock > 0 });
                    }}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image URL</label>
                  <input
                    type="text"
                    placeholder="Unsplash / external image link"
                    value={productForm.images[0] ?? ""}
                    onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Product Badges</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["New", "Trending", "Bestseller", "Sale", "Exclusive"].map((badge) => (
                      <label key={badge} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={productForm.badges.includes(badge as BadgeType)}
                          onChange={(e) => {
                            const nextBadges = e.target.checked
                              ? [...productForm.badges, badge as BadgeType]
                              : productForm.badges.filter(b => b !== badge);
                            setProductForm({ ...productForm, badges: nextBadges });
                          }}
                          className="accent-[#D06780] h-4 w-4"
                        />
                        <span className="font-semibold text-gray-700">{badge} Badge</span>
                      </label>
                    ))}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.virtualTryOn}
                        onChange={(e) => setProductForm({ ...productForm, virtualTryOn: e.target.checked })}
                        className="accent-[#D06780] h-4 w-4"
                      />
                      <span className="font-semibold text-gray-700">Virtual Try-On</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.sameDayDelivery}
                        onChange={(e) => setProductForm({ ...productForm, sameDayDelivery: e.target.checked })}
                        className="accent-[#D06780] h-4 w-4"
                      />
                      <span className="font-semibold text-gray-700">Same Day Delivery</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer border border-[#D06780]/20 bg-[#FDE9EC]/20 rounded-lg p-1 px-2">
                      <input
                        type="checkbox"
                        checked={productForm.isActive}
                        onChange={(e) => setProductForm({ ...productForm, isActive: e.target.checked })}
                        className="accent-[#D06780] h-4 w-4"
                      />
                      <span className="font-bold text-[#D06780]">Active on Storefront</span>
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Description</label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="Short summary about the craftsmanship and style..."
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-gray-500 hover:bg-gray-50 font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D06780] text-[#FDE9EC] rounded-xl font-bold hover:bg-[#9C3E55] transition-all shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* COUPON ADD MODAL DIALOG */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsCouponModalOpen(false)} />
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-sm w-full p-6 z-10 space-y-6 relative">
            <button 
              onClick={() => setIsCouponModalOpen(false)}
              className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-serif font-bold text-gray-900 border-b pb-3 border-gray-100">
              Create Coupon Code
            </h3>

            <form onSubmit={handleCouponSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVE20"
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all uppercase font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Discount Type</label>
                <select
                  value={couponForm.type}
                  onChange={(e) => setCouponForm({ ...couponForm, type: e.target.value as any })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all cursor-pointer"
                >
                  <option value="percent">Percentage Off (%)</option>
                  <option value="flat">Flat Price Off (₹)</option>
                  <option value="freeShipping">Free Shipping</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Discount Value</label>
                <input
                  type="number"
                  required
                  value={couponForm.value}
                  onChange={(e) => setCouponForm({ ...couponForm, value: parseInt(e.target.value) || 0 })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Minimum Order Amount (INR)</label>
                <input
                  type="number"
                  required
                  value={couponForm.minOrder}
                  onChange={(e) => setCouponForm({ ...couponForm, minOrder: parseInt(e.target.value) || 0 })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Short Description</label>
                <input
                  type="text"
                  placeholder="e.g. 20% off on purchase above ₹1,000"
                  value={couponForm.description}
                  onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-gray-500 hover:bg-gray-50 font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D06780] text-[#FDE9EC] rounded-xl font-bold hover:bg-[#9C3E55] transition-all shadow-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY ADD MODAL DIALOG */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsCategoryModalOpen(false)} />
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-sm w-full p-6 z-10 space-y-6 relative">
            <button 
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-serif font-bold text-gray-900 border-b pb-3 border-gray-100">
              Add Custom Category
            </h3>

            <form onSubmit={handleCategorySubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pendant Necklaces"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ 
                    ...categoryForm, 
                    name: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                  })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category Slug</label>
                <input
                  type="text"
                  required
                  placeholder="pendant-necklaces"
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Icon Emoji</label>
                <input
                  type="text"
                  required
                  value={categoryForm.icon}
                  onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all text-lg"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-gray-500 hover:bg-gray-50 font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D06780] text-[#FDE9EC] rounded-xl font-bold hover:bg-[#9C3E55] transition-all shadow-md"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BRAND ADD MODAL DIALOG */}
      {isBrandModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsBrandModalOpen(false)} />
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-sm w-full p-6 z-10 space-y-6 relative">
            <button 
              onClick={() => setIsBrandModalOpen(false)}
              className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-serif font-bold text-gray-900 border-b pb-3 border-gray-100">
              Add Partner Brand
            </h3>

            <form onSubmit={handleBrandSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Giva Silver"
                  value={brandForm.name}
                  onChange={(e) => setBrandForm({ 
                    ...brandForm, 
                    name: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                  })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Brand Slug</label>
                <input
                  type="text"
                  required
                  placeholder="giva-silver"
                  value={brandForm.slug}
                  onChange={(e) => setBrandForm({ ...brandForm, slug: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Brand Tagline</label>
                <input
                  type="text"
                  placeholder="Elegant everyday silver jewelry"
                  value={brandForm.tagline}
                  onChange={(e) => setBrandForm({ ...brandForm, tagline: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Brand Logo Image Link</label>
                <input
                  type="text"
                  value={brandForm.logo}
                  onChange={(e) => setBrandForm({ ...brandForm, logo: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all text-xs font-mono"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBrandModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-gray-500 hover:bg-gray-50 font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D06780] text-[#FDE9EC] rounded-xl font-bold hover:bg-[#9C3E55] transition-all shadow-md"
                >
                  Create Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ORDER DETAIL SUMMARY DIALOG MODAL */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSelectedOrderDetails(null)} />
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full p-6 z-10 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center justify-between border-b pb-3 border-gray-100 pr-8">
              <h3 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2.5">
                <span>Order Details</span>
                <span className="font-mono text-sm text-gray-400">({selectedOrderDetails.id})</span>
              </h3>
              <button
                onClick={() => setIsInvoicePrintOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border text-gray-700 font-bold rounded-lg text-xs transition-colors"
              >
                <Printer size={13} />
                Print Invoice
              </button>
            </div>

            <div className="space-y-4 text-xs leading-normal">
              {/* Customer */}
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl space-y-1">
                <h4 className="font-bold text-gray-800 uppercase text-[10px] tracking-wide mb-1.5">Shipping Details</h4>
                <p className="font-semibold text-gray-700 text-sm">{selectedOrderDetails.customer.name}</p>
                <p className="text-gray-500">Email: {selectedOrderDetails.customer.email}</p>
                <p className="text-gray-500">Phone: {selectedOrderDetails.customer.phone}</p>
                <p className="text-gray-500 mt-1">Address: {selectedOrderDetails.customer.address}, {selectedOrderDetails.customer.city} - {selectedOrderDetails.customer.zip}</p>
              </div>

              {/* Shipping & Tracking Status Form */}
              {selectedOrderDetails.status !== "Cancelled" && (
                <form onSubmit={handleUpdateTracking} className="bg-white border border-gray-200 p-4 rounded-xl space-y-3">
                  <h4 className="font-bold text-gray-800 uppercase text-[10px] tracking-wide flex items-center gap-1">
                    <Truck size={12} className="text-[#D06780]" />
                    Logistics / Tracking Status
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Carrier Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Delhivery"
                        value={trackingInput.carrier}
                        onChange={(e) => setTrackingInput({ ...trackingInput, carrier: e.target.value })}
                        className="w-full border rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#D06780]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Tracking Number / AWB</label>
                      <input
                        type="text"
                        placeholder="e.g. DV1928374"
                        value={trackingInput.trackingId}
                        onChange={(e) => setTrackingInput({ ...trackingInput, trackingId: e.target.value })}
                        className="w-full border rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#D06780]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-gray-900 text-white rounded-lg text-[10px] font-bold hover:bg-gray-800 transition-colors"
                  >
                    Save Tracking Details
                  </button>
                </form>
              )}

              {/* Items */}
              <div>
                <h4 className="font-bold text-gray-800 uppercase text-[10px] tracking-wide mb-2">Purchased Items</h4>
                <div className="divide-y divide-gray-100 max-h-40 overflow-y-auto border border-gray-100 rounded-xl bg-white p-3 space-y-2 pr-1 scrollbar-thin">
                  {selectedOrderDetails.items.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="flex justify-between items-center py-2 first:pt-0 last:pb-0">
                      <span className="font-semibold text-gray-700 truncate max-w-[80%]">
                        {item.title} <span className="font-mono text-gray-400">x{item.qty}</span>
                      </span>
                      <span className="font-bold text-gray-800">{formatINR(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-700">{formatINR(selectedOrderDetails.subtotal)}</span>
                </div>
                {selectedOrderDetails.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-{formatINR(selectedOrderDetails.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-700">{formatINR(selectedOrderDetails.shipping)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-gray-900 pt-2 border-t border-dashed border-gray-100">
                  <span>Grand Total</span>
                  <span className="text-[#D06780] font-black text-base">{formatINR(selectedOrderDetails.total)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRINT-OPTIMIZED INVOICE DIALOG MODAL */}
      {isInvoicePrintOpen && selectedOrderDetails && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setIsInvoicePrintOpen(false)} />
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-2xl w-full p-8 z-10 space-y-6 relative max-h-[95vh] overflow-y-auto invoice-print-container">
            <button 
              onClick={() => setIsInvoicePrintOpen(false)}
              className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors print:hidden"
            >
              <X size={20} />
            </button>

            {/* Print action header */}
            <div className="flex justify-between items-center border-b pb-4 border-gray-100 print:hidden">
              <h3 className="text-md font-bold text-gray-800">Print Preview Invoice</h3>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow"
              >
                <Printer size={14} />
                Print Document
              </button>
            </div>

            {/* Invoice Layout */}
            <div className="space-y-8 p-2 text-gray-800">
              {/* Invoice top branding */}
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-black tracking-wider text-gray-900 uppercase">VEHA SILVER</h1>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Premium Silver Jewelry</p>
                  <p className="text-[10px] text-gray-500 mt-2 font-mono">Invoice Number: INV-{selectedOrderDetails.id.replace("ORD-", "")}</p>
                </div>
                <div className="text-right">
                  <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">RETAIL INVOICE</h2>
                  <p className="text-[10px] text-gray-400 mt-0.5">Date: {new Date(selectedOrderDetails.createdAt).toLocaleDateString()}</p>
                  <p className="text-[10px] text-gray-400">Payment: {selectedOrderDetails.paymentMethod} (Paid)</p>
                </div>
              </div>

              {/* Billing Info */}
              <div className="grid grid-cols-2 gap-8 text-[11px] border-t border-b border-gray-100 py-4">
                <div>
                  <p className="font-bold text-gray-400 uppercase tracking-wider mb-1">Billed & Shipped To</p>
                  <p className="font-bold text-sm text-gray-800">{selectedOrderDetails.customer.name}</p>
                  <p className="text-gray-600 mt-1 leading-relaxed">
                    {selectedOrderDetails.customer.address}, <br />
                    {selectedOrderDetails.customer.city} - {selectedOrderDetails.customer.zip}
                  </p>
                  <p className="text-gray-500 mt-1">Phone: {selectedOrderDetails.customer.phone} | Email: {selectedOrderDetails.customer.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-400 uppercase tracking-wider mb-1">Company Details</p>
                  <p className="font-bold text-gray-800">VEHA SILVER LTD</p>
                  <p className="text-gray-600 leading-relaxed">
                    102, Silver Arcade, Bandra West, <br />
                    Mumbai, Maharashtra - 400050
                  </p>
                  <p className="text-gray-500 mt-1">support@vehasilver.com | GSTIN: 27AABCVEHA012</p>
                </div>
              </div>

              {/* Table of items */}
              <div>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-2">Item Description</th>
                      <th className="py-2 text-center">Qty</th>
                      <th className="py-2 text-right">Unit Price</th>
                      <th className="py-2 text-right">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {selectedOrderDetails.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-3 font-bold text-gray-800">{item.title}</td>
                        <td className="py-3 text-center">{item.qty}</td>
                        <td className="py-3 text-right">{formatINR(item.price)}</td>
                        <td className="py-3 text-right font-bold">{formatINR(item.price * item.qty)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary calculations */}
              <div className="flex justify-end pt-4 border-t border-gray-100">
                <div className="w-64 space-y-2.5 text-xs font-semibold">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>{formatINR(selectedOrderDetails.subtotal)}</span>
                  </div>
                  {selectedOrderDetails.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount Coupon</span>
                      <span>-{formatINR(selectedOrderDetails.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping Handling</span>
                    <span>{formatINR(selectedOrderDetails.shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-gray-800 pt-2 border-t">
                    <span>Grand Total</span>
                    <span className="text-[#D06780]">{formatINR(selectedOrderDetails.total)}</span>
                  </div>
                </div>
              </div>

              {/* Footer notes */}
              <div className="text-center text-[10px] text-gray-400 pt-8 border-t border-dashed">
                <p>This is a computer-generated simulated receipt invoice for VEHA SILVER.</p>
                <p className="mt-1">Thank you for shopping with us! If you have any inquiries, contact support@vehasilver.com.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline decorative components to keep things clean and compile-friendly
function SparklesIcon() {
  return (
    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 21c-.5 0-.9-.3-1-.8l-1.3-4.4-4.4-1.3c-.5-.1-.8-.5-.8-1s.3-.9.8-1l4.4-1.3 1.3-4.4c.1-.5.5-.8 1-.8s.9.3 1 .8l1.3 4.4 4.4 1.3c.5.1.8.5.8 1s-.3.9-.8 1l-4.4 1.3-1.3 4.4c-.1.5-.5.8-1 .8zM19 10c-.3 0-.5-.2-.6-.4l-.7-2.3-2.3-.7c-.2-.1-.4-.3-.4-.6s.2-.5.4-.6l2.3-.7.7-2.3c.1-.2.3-.4.6-.4s.5.2.6.4l.7 2.3 2.3.7c.2.1.4.3.4.6s-.2.5-.4.6l-2.3.7-.7 2.3c-.1.2-.3.4-.6.4zM20 21c-.3 0-.5-.2-.6-.4l-.7-2.3-2.3-.7c-.2-.1-.4-.3-.4-.6s.2-.5.4-.6l2.3-.7.7-2.3c.1-.2.3-.4.6-.4s.5.2.6.4l.7 2.3 2.3.7c.2.1.4.3.4.6s-.2.5-.4.6l-2.3.7-.7 2.3c-.1.2-.3.4-.6.4z" />
    </svg>
  );
}
