"use client";

import React, { useState, useMemo } from "react";
import { useStore, useToast } from "@/context";
import { formatINR } from "@/lib/utils";
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
  AlertCircle,
  TrendingUp,
  Coins,
  Inbox
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "coupons">("overview");

  // Filter States
  const [productSearch, setProductSearch] = useState("");
  const [productCategory, setProductCategory] = useState("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");

  // Form States (Modals)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    title: "",
    categorySlug: "rings",
    metal: "silver" as Metal,
    material: "",
    price: 0,
    mrp: 0,
    discountPct: 0,
    images: [] as string[],
    badges: [] as BadgeType[],
    virtualTryOn: false,
    sameDayDelivery: false,
    inStock: true,
    description: "",
    subcategory: "Silver Rings"
  });

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: "",
    type: "percent" as "percent" | "flat" | "freeShipping",
    value: 10,
    minOrder: 499,
    appliesTo: "all" as "all" | string[],
    description: "",
    expiresAt: ""
  });

  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Statistics Calculations
  const stats = useMemo(() => {
    const totalRevenue = orders
      .filter((o) => o.status !== "Cancelled")
      .reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = orders.filter((o) => o.status === "Pending").length;
    const completedOrders = orders.filter((o) => o.status === "Delivered").length;
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
    
    return {
      revenue: totalRevenue,
      ordersCount: orders.length,
      pending: pendingOrders,
      completed: completedOrders,
      avgValue: avgOrderValue,
      productsCount: products.length,
      couponsCount: coupons.length
    };
  }, [orders, products, coupons]);

  // Categories list helper
  const categoriesList = useMemo(() => {
    const set = new Set(products.map((p) => p.categorySlug));
    return Array.from(set);
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.id.toLowerCase().includes(productSearch.toLowerCase());
      const matchCategory = productCategory === "all" || p.categorySlug === productCategory;
      return matchSearch && matchCategory;
    });
  }, [products, productSearch, productCategory]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch = o.id.toLowerCase().includes(orderSearch.toLowerCase()) || 
                          o.customer.name.toLowerCase().includes(orderSearch.toLowerCase());
      const matchStatus = orderStatusFilter === "all" || o.status === orderStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

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
      brandSlug: "veha-jewels", // Default brand
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
      badges: p.badges,
      virtualTryOn: p.virtualTryOn,
      sameDayDelivery: p.sameDayDelivery,
      inStock: p.inStock,
      description: p.description ?? "",
      subcategory: p.subcategory
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
      categorySlug: "rings",
      metal: "silver",
      material: "925 Sterling Silver",
      price: 0,
      mrp: 0,
      discountPct: 0,
      images: [],
      badges: [],
      virtualTryOn: false,
      sameDayDelivery: false,
      inStock: true,
      description: "",
      subcategory: "Silver Rings"
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
      expiresAt: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-100 flex-shrink-0">
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
        </nav>

        {/* Bottom storefront trigger */}
        <div className="p-4 border-t border-gray-50 mt-auto hidden md:block">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-200 hover:border-gray-300 text-xs font-bold text-gray-700 rounded-xl transition-all"
          >
            Go to Storefront
            <ChevronRight size={14} />
          </Link>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-grow p-6 md:p-8 overflow-x-hidden">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-xs text-gray-400 mt-0.5">Real-time statistics & business analytics</p>
              </div>
              <div className="text-xs text-gray-400 font-semibold bg-white border px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                Live Sync Active
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

            {/* MOCK SVG ANALYTICS CHART */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-1.5">
                <TrendingUp size={18} className="text-[#D06780]" />
                Sales & Revenue Analytics
              </h3>
              
              {/* SVG Line Chart Simulator */}
              <div className="relative h-60 w-full bg-gray-50/50 rounded-2xl border border-gray-100 p-4">
                {/* Simulated Grid lines */}
                <div className="absolute inset-x-0 top-[20%] border-t border-dashed border-gray-100" />
                <div className="absolute inset-x-0 top-[40%] border-t border-dashed border-gray-100" />
                <div className="absolute inset-x-0 top-[60%] border-t border-dashed border-gray-100" />
                <div className="absolute inset-x-0 top-[80%] border-t border-dashed border-gray-100" />

                {/* Simulated Chart Line */}
                <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D06780" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#D06780" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Gradient area */}
                  <path d="M 0 200 L 0 160 Q 200 80, 400 120 T 800 50 L 1000 20 L 1000 200 Z" fill="url(#chart-grad)" />
                  {/* Thick Stroke Line */}
                  <path d="M 0 160 Q 200 80, 400 120 T 800 50 L 1000 20" fill="none" stroke="#D06780" strokeWidth="4" strokeLinecap="round" />
                </svg>

                {/* X Axis Labels */}
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
                              "bg-amber-50 text-amber-600 animate-pulse"
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
                <p className="text-xs text-gray-400 mt-0.5">Add, edit, or delete items in stock</p>
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
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-[#D06780]/20 transition-all capitalize"
              >
                <option value="all">All Categories</option>
                {categoriesList.map((c) => (
                  <option key={c} value={c}>{c.replace(/-/g, " ")}</option>
                ))}
              </select>
            </div>

            {/* Products grid */}
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
                      <th className="p-4">Stock</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-600">
                    {filteredProducts.map((p) => (
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
                        <td className="p-4 capitalize text-xs">{p.categorySlug.replace(/-/g, " ")}</td>
                        <td className="p-4">
                          <p className="text-xs font-semibold text-gray-700 capitalize">{p.metal}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{p.material}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-gray-800">{formatINR(p.price)}</p>
                          <p className="text-[10px] text-gray-400 line-through mt-0.5">{formatINR(p.mrp)}</p>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                            className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase cursor-pointer hover:scale-105 transition-all ${
                              p.inStock 
                                ? "bg-green-50 text-green-600" 
                                : "bg-red-50 text-red-600"
                            }`}
                          >
                            {p.inStock ? "In Stock" : "Out of Stock"}
                          </button>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={() => startEditProduct(p)}
                              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                              title="Edit Product"
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGER */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900">Orders Manager</h2>
              <p className="text-xs text-gray-400 mt-0.5">Manage customer checkout orders & deliveries</p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders by ID or customer name..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#D06780]/20 focus:border-[#D06780] transition-all"
                />
              </div>
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-[#D06780]/20 transition-all"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Orders list */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 text-[10px] font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-50">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Total Paid</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Delivery Status</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-600">
                    {filteredOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50/30">
                        <td className="p-4 font-mono font-bold text-gray-800">{o.id}</td>
                        <td className="p-4">
                          <p className="font-bold text-gray-800">{o.customer.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{o.customer.phone} · {o.customer.city}</p>
                        </td>
                        <td className="p-4 font-bold text-gray-800">
                          {formatINR(o.total)}
                          <p className="text-[10px] text-gray-400 font-medium mt-0.5">{o.items.length} item{o.items.length !== 1 ? "s" : ""}</p>
                        </td>
                        <td className="p-4 text-xs font-semibold">{o.paymentMethod}</td>
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
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-1.5">
                            <button
                              onClick={() => setSelectedOrderDetails(o)}
                              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            <select
                              value={o.status}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                              className="border border-gray-200 rounded-lg px-2 py-1 text-xs outline-none bg-white hover:border-gray-300 focus:ring-1 focus:ring-[#D06780]"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
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
                <p className="text-xs text-gray-400 mt-0.5">Manage store-wide discount coupons</p>
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
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-gray-600">
                    {coupons.map((c) => (
                      <tr key={c.code} className="hover:bg-gray-50/30">
                        <td className="p-4 font-mono font-bold text-[#D06780] text-sm tracking-wider">{c.code}</td>
                        <td className="p-4 capitalize text-xs font-semibold">{c.type}</td>
                        <td className="p-4 font-semibold text-gray-700">
                          {c.type === "percent" ? `${c.value}% OFF` : formatINR(c.value)}
                        </td>
                        <td className="p-4 text-xs font-medium">{formatINR(c.minOrder)}</td>
                        <td className="p-4 text-xs capitalize">
                          {c.appliesTo === "all" ? "Entire Store" : c.appliesTo.join(", ")}
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
                    ))}
                  </tbody>
                </table>
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
                    className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category Slug</label>
                  <select
                    value={productForm.categorySlug}
                    onChange={(e) => setProductForm({ ...productForm, categorySlug: e.target.value })}
                    className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all capitalize"
                  >
                    <option value="rings">Rings</option>
                    <option value="earrings">Earrings</option>
                    <option value="necklaces">Necklaces</option>
                    <option value="bracelets">Bracelets</option>
                    <option value="mangalsutra">Mangalsutra</option>
                    <option value="watches">Watches</option>
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
                    className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Metal</label>
                  <select
                    value={productForm.metal}
                    onChange={(e) => setProductForm({ ...productForm, metal: e.target.value as Metal })}
                    className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
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
                    className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
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
                    className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
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
                    className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image URL</label>
                  <input
                    type="text"
                    placeholder="Unsplash / external image link"
                    value={productForm.images[0] ?? ""}
                    onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                    className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.virtualTryOn}
                      onChange={(e) => setProductForm({ ...productForm, virtualTryOn: e.target.checked })}
                      className="accent-[#D06780] h-4 w-4"
                    />
                    <span className="font-semibold text-gray-700">Enable Virtual Try-On Badge</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.sameDayDelivery}
                      onChange={(e) => setProductForm({ ...productForm, sameDayDelivery: e.target.checked })}
                      className="accent-[#D06780] h-4 w-4"
                    />
                    <span className="font-semibold text-gray-700">Enable Same Day Delivery</span>
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Description</label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="Short summary about the craftsmanship and style..."
                    className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
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
                  className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Discount Type</label>
                <select
                  value={couponForm.type}
                  onChange={(e) => setCouponForm({ ...couponForm, type: e.target.value as any })}
                  className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
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
                  className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Minimum Order Amount (INR)</label>
                <input
                  type="number"
                  required
                  value={couponForm.minOrder}
                  onChange={(e) => setCouponForm({ ...couponForm, minOrder: parseInt(e.target.value) || 0 })}
                  className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Short Description</label>
                <input
                  type="text"
                  placeholder="e.g. 20% off on purchase above ₹1,000"
                  value={couponForm.description}
                  onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                  className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#D06780]/30 focus:border-[#D06780] transition-all"
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

      {/* ORDER DETAIL SUMMARY DIALOG MODAL */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSelectedOrderDetails(null)} />
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full p-6 z-10 space-y-6 relative">
            <button 
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-serif font-bold text-gray-900 border-b pb-3 border-gray-100 flex items-center gap-2.5">
              <span>Order Details</span>
              <span className="font-mono text-sm text-gray-400">({selectedOrderDetails.id})</span>
            </h3>

            <div className="space-y-4 text-xs leading-normal">
              {/* Customer */}
              <div className="bg-gray-50 border p-4 rounded-xl space-y-1">
                <h4 className="font-bold text-gray-800 uppercase text-[10px] tracking-wide mb-1.5">Shipping Details</h4>
                <p className="font-semibold text-gray-700 text-sm">{selectedOrderDetails.customer.name}</p>
                <p className="text-gray-500">Email: {selectedOrderDetails.customer.email}</p>
                <p className="text-gray-500">Phone: {selectedOrderDetails.customer.phone}</p>
                <p className="text-gray-500 mt-1">Address: {selectedOrderDetails.customer.address}, {selectedOrderDetails.customer.city} - {selectedOrderDetails.customer.zip}</p>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-bold text-gray-800 uppercase text-[10px] tracking-wide mb-2">Purchased Items</h4>
                <div className="divide-y divide-gray-100 max-h-40 overflow-y-auto border rounded-xl bg-white p-3 space-y-2 pr-1 scrollbar-thin">
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
                <div className="flex justify-between items-center text-sm font-bold text-gray-900 pt-2 border-t border-dashed">
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
    </div>
  );
}
