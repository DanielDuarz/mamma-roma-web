"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Utensils,
  MapPin,
  ArrowLeft,
  Save,
  Check,
  Key,
  ShieldCheck,
  Eye,
  EyeOff,
  LogOut,
  AlertCircle,
  Search,
  CheckCircle2,
  Sparkles,
  Plus,
  Trash2,
  Share2,
  Calendar,
  Truck,
  Tag,
  Flame,
  Layers,
  Info,
} from "lucide-react";
import { useBrand } from "@/context/BrandContext";
import {
  BrandId,
  MenuItem,
  BranchLocation,
  SauceProduct,
  PromotionItem,
  BrandData,
  EventPackage,
} from "@/data/brandsData";
import { MammaRomaGroupLogo } from "@/components/BrandLogos";
import ImageUploader from "@/components/ImageUploader";

const DEFAULT_ADMIN_PASSWORD = "zaftyg-ryhko2-decqIv";
const STORAGE_PW_KEY = "mr_admin_master_password";
const STORAGE_AUTH_KEY = "mr_admin_session_auth";

type AdminTab =
  | "brandInfo"
  | "specialties"
  | "promotions"
  | "menu"
  | "sauces"
  | "locations"
  | "delivery"
  | "social"
  | "events"
  | "security";

export default function SecureAdminConfigPage() {
  const { brands, updateAllBrandsData } = useBrand();

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [loginPasswordInput, setLoginPasswordInput] = useState<string>("");
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  // Tabs & Brands
  const [activeTab, setActiveTab] = useState<AdminTab>("brandInfo");
  const [selectedBrand, setSelectedBrand] = useState<BrandId>("mamma-roma");
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Local draft of all brands data
  const [draftBrands, setDraftBrands] = useState<Record<BrandId, BrandData>>(brands);

  // Synchronize local draft when context brands load
  useEffect(() => {
    if (brands && brands["mamma-roma"] && brands["sette-colli"]) {
      setDraftBrands(brands);
    }
  }, [brands]);

  // Auth verification on mount
  useEffect(() => {
    try {
      const authSession = sessionStorage.getItem(STORAGE_AUTH_KEY);
      if (authSession === "true") {
        setIsAuthenticated(true);
      }
    } catch {
      // ignore
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    let currentPassword = DEFAULT_ADMIN_PASSWORD;
    try {
      const stored = localStorage.getItem(STORAGE_PW_KEY);
      if (stored) currentPassword = stored;
    } catch {
      // ignore
    }

    if (loginPasswordInput === currentPassword) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_AUTH_KEY, "true");
      } catch {
        // ignore
      }
      setLoginPasswordInput("");
    } else {
      setLoginError("Contraseña incorrecta. Por favor verifica las credenciales maestras.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_AUTH_KEY);
    } catch {
      // ignore
    }
  };

  // Current brand draft helper
  const currentBrand = draftBrands[selectedBrand] || brands[selectedBrand];

  const updateCurrentBrandField = <K extends keyof BrandData>(field: K, value: BrandData[K]) => {
    setDraftBrands((prev) => ({
      ...prev,
      [selectedBrand]: {
        ...prev[selectedBrand],
        [field]: value,
      },
    }));
  };

  // Save all changes
  const handleSaveAll = async () => {
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const ok = await updateAllBrandsData(draftBrands);
      if (ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      } else {
        alert("Ocurrió un error al persistir los datos en el servidor.");
      }
    } catch (err) {
      console.error(err);
      alert("Error al guardar: " + String(err));
    } finally {
      setIsSaving(false);
    }
  };

  // --- Password Change Modal State ---
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [currentPwInput, setCurrentPwInput] = useState<string>("");
  const [newPwInput, setNewPwInput] = useState<string>("");
  const [confirmPwInput, setConfirmPwInput] = useState<string>("");
  const [pwChangeError, setPwChangeError] = useState<string>("");
  const [pwChangeSuccess, setPwChangeSuccess] = useState<boolean>(false);

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwChangeError("");
    setPwChangeSuccess(false);

    let actualCurrentPw = DEFAULT_ADMIN_PASSWORD;
    try {
      const stored = localStorage.getItem(STORAGE_PW_KEY);
      if (stored) actualCurrentPw = stored;
    } catch {
      // ignore
    }

    if (currentPwInput !== actualCurrentPw) {
      setPwChangeError("La contraseña anterior no coincide.");
      return;
    }

    if (!newPwInput || newPwInput.length < 8) {
      setPwChangeError("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (newPwInput !== confirmPwInput) {
      setPwChangeError("La nueva contraseña y la confirmación no coinciden.");
      return;
    }

    try {
      localStorage.setItem(STORAGE_PW_KEY, newPwInput);
      setPwChangeSuccess(true);
      setCurrentPwInput("");
      setNewPwInput("");
      setConfirmPwInput("");
      setTimeout(() => {
        setShowPasswordModal(false);
        setPwChangeSuccess(false);
      }, 2000);
    } catch (err) {
      setPwChangeError("Error al guardar en almacenamiento local: " + String(err));
    }
  };

  // --- MODALS FOR CREATING ITEMS ---

  // Dish Modal
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [newDishName, setNewDishName] = useState("");
  const [newDishCategory, setNewDishCategory] = useState("");
  const [newDishCustomCategory, setNewDishCustomCategory] = useState("");
  const [newDishDescription, setNewDishDescription] = useState("");
  const [newDishPrice, setNewDishPrice] = useState<number>(85);
  const [newDishBadge, setNewDishBadge] = useState("");
  const [newDishImage, setNewDishImage] = useState(
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
  );
  const [newDishGlutenFree, setNewDishGlutenFree] = useState(false);
  const [newDishVegetarian, setNewDishVegetarian] = useState(false);
  const [newDishSpicy, setNewDishSpicy] = useState(false);

  // Promotion Modal
  const [showAddPromoModal, setShowAddPromoModal] = useState(false);
  const [newPromoTitle, setNewPromoTitle] = useState("");
  const [newPromoSubtitle, setNewPromoSubtitle] = useState("");
  const [newPromoDescription, setNewPromoDescription] = useState("");
  const [newPromoBadge, setNewPromoBadge] = useState("Oferta Especial");
  const [newPromoValidUntil, setNewPromoValidUntil] = useState("Válido todo el mes");
  const [newPromoImage, setNewPromoImage] = useState(
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
  );
  const [newPromoCtaText, setNewPromoCtaText] = useState("Aprovechar Promoción");
  const [newPromoCtaMessage, setNewPromoCtaMessage] = useState("");

  // Sauce Modal
  const [showAddSauceModal, setShowAddSauceModal] = useState(false);
  const [newSauceName, setNewSauceName] = useState("");
  const [newSauceItalianName, setNewSauceItalianName] = useState("");
  const [newSauceWeight, setNewSauceWeight] = useState("Frasco 350g");
  const [newSaucePrice, setNewSaucePrice] = useState<number>(65);
  const [newSauceBadge, setNewSauceBadge] = useState("Artesanal");
  const [newSauceDescription, setNewSauceDescription] = useState("");
  const [newSauceIngredients, setNewSauceIngredients] = useState("");
  const [newSaucePairing, setNewSaucePairing] = useState("");
  const [newSauceImage, setNewSauceImage] = useState(
    "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=800&q=80"
  );

  // Location Modal
  const [showAddLocationModal, setShowAddLocationModal] = useState(false);
  const [newLocName, setNewLocName] = useState("");
  const [newLocAddress, setNewLocAddress] = useState("");
  const [newLocZone, setNewLocZone] = useState("");
  const [newLocPhone, setNewLocPhone] = useState("5017-5905");
  const [newLocWhatsapp, setNewLocWhatsapp] = useState("50250175905");
  const [newLocHours, setNewLocHours] = useState("Lunes a Domingo: 12:00 PM a 11:00 PM");
  const [newLocWaze, setNewLocWaze] = useState("https://waze.com");
  const [newLocMaps, setNewLocMaps] = useState("https://maps.google.com");
  const [newLocImage, setNewLocImage] = useState("");

  // Menu Search
  const [dishSearch, setDishSearch] = useState("");

  // Handlers for adding items
  const handleAddDish = () => {
    if (!newDishName.trim()) {
      alert("Por favor ingresa un nombre para el platillo.");
      return;
    }
    const finalCategory = newDishCustomCategory.trim() || newDishCategory || currentBrand.menuCategories[0] || "General";

    // Add category if new
    const updatedCategories = [...currentBrand.menuCategories];
    if (!updatedCategories.includes(finalCategory)) {
      updatedCategories.push(finalCategory);
    }

    const newDish: MenuItem = {
      id: `dish-${Date.now()}`,
      name: newDishName.trim(),
      category: finalCategory,
      description: newDishDescription.trim(),
      price: Number(newDishPrice) || 0,
      badge: newDishBadge.trim() || undefined,
      image: newDishImage.trim(),
      isGlutenFree: newDishGlutenFree,
      isVegetarian: newDishVegetarian,
      isSpicy: newDishSpicy,
    };

    setDraftBrands((prev) => ({
      ...prev,
      [selectedBrand]: {
        ...prev[selectedBrand],
        menuCategories: updatedCategories,
        menuItems: [newDish, ...prev[selectedBrand].menuItems],
      },
    }));

    // Reset Form
    setNewDishName("");
    setNewDishCategory("");
    setNewDishCustomCategory("");
    setNewDishDescription("");
    setNewDishPrice(85);
    setNewDishBadge("");
    setShowAddDishModal(false);
  };

  const handleDeleteDish = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este platillo del menú?")) {
      setDraftBrands((prev) => ({
        ...prev,
        [selectedBrand]: {
          ...prev[selectedBrand],
          menuItems: prev[selectedBrand].menuItems.filter((d) => d.id !== id),
        },
      }));
    }
  };

  const handleAddPromotion = () => {
    if (!newPromoTitle.trim()) {
      alert("Por favor ingresa un título para la promoción.");
      return;
    }

    const newPromo: PromotionItem = {
      id: `promo-${Date.now()}`,
      title: newPromoTitle.trim(),
      subtitle: newPromoSubtitle.trim() || undefined,
      description: newPromoDescription.trim(),
      badge: newPromoBadge.trim() || undefined,
      validUntil: newPromoValidUntil.trim() || undefined,
      image: newPromoImage.trim(),
      ctaText: newPromoCtaText.trim() || "Aprovechar Promoción",
      ctaWhatsAppMessage:
        newPromoCtaMessage.trim() ||
        `¡Hola ${currentBrand.name}! Deseo aprovechar la promoción: *${newPromoTitle.trim()}*.`,
      active: true,
    };

    const currentPromos = currentBrand.promotions || [];

    setDraftBrands((prev) => ({
      ...prev,
      [selectedBrand]: {
        ...prev[selectedBrand],
        promotions: [newPromo, ...currentPromos],
      },
    }));

    setNewPromoTitle("");
    setNewPromoSubtitle("");
    setNewPromoDescription("");
    setShowAddPromoModal(false);
  };

  const handleDeletePromotion = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta promoción?")) {
      const currentPromos = currentBrand.promotions || [];
      setDraftBrands((prev) => ({
        ...prev,
        [selectedBrand]: {
          ...prev[selectedBrand],
          promotions: currentPromos.filter((p) => p.id !== id),
        },
      }));
    }
  };

  const handleAddSauce = () => {
    if (!newSauceName.trim()) {
      alert("Por favor ingresa un nombre para la salsa.");
      return;
    }

    const newSauce: SauceProduct = {
      id: `sauce-${Date.now()}`,
      name: newSauceName.trim(),
      italianName: newSauceItalianName.trim() || newSauceName.trim(),
      netWeight: newSauceWeight.trim(),
      price: Number(newSaucePrice) || 65,
      badge: newSauceBadge.trim() || "Artesanal",
      description: newSauceDescription.trim(),
      ingredients: newSauceIngredients.trim(),
      pairing: newSaucePairing.trim(),
      image: newSauceImage.trim(),
    };

    const currentSauces = currentBrand.sauces || [];

    setDraftBrands((prev) => ({
      ...prev,
      [selectedBrand]: {
        ...prev[selectedBrand],
        sauces: [...currentSauces, newSauce],
      },
    }));

    setNewSauceName("");
    setNewSauceItalianName("");
    setNewSauceDescription("");
    setNewSauceIngredients("");
    setNewSaucePairing("");
    setShowAddSauceModal(false);
  };

  const handleDeleteSauce = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta salsa?")) {
      const currentSauces = currentBrand.sauces || [];
      setDraftBrands((prev) => ({
        ...prev,
        [selectedBrand]: {
          ...prev[selectedBrand],
          sauces: currentSauces.filter((s) => s.id !== id),
        },
      }));
    }
  };

  const handleAddLocation = () => {
    if (!newLocName.trim()) {
      alert("Por favor ingresa el nombre de la sucursal.");
      return;
    }

    const newLoc: BranchLocation = {
      id: `loc-${Date.now()}`,
      name: newLocName.trim(),
      address: newLocAddress.trim(),
      zone: newLocZone.trim(),
      phone: newLocPhone.trim(),
      whatsapp: newLocWhatsapp.trim(),
      hours: newLocHours.trim(),
      googleMapsUrl: newLocMaps.trim(),
      wazeUrl: newLocWaze.trim(),
      mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(newLocName + " " + newLocAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`,
      rating: 4.9,
      reviewsCount: 150,
      image: newLocImage.trim() || undefined,
    };

    setDraftBrands((prev) => ({
      ...prev,
      [selectedBrand]: {
        ...prev[selectedBrand],
        locations: [...prev[selectedBrand].locations, newLoc],
      },
    }));

    setNewLocName("");
    setNewLocAddress("");
    setNewLocZone("");
    setNewLocImage("");
    setShowAddLocationModal(false);
  };

  const handleDeleteLocation = (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta sucursal?")) {
      setDraftBrands((prev) => ({
        ...prev,
        [selectedBrand]: {
          ...prev[selectedBrand],
          locations: prev[selectedBrand].locations.filter((l) => l.id !== id),
        },
      }));
    }
  };

  // --- Specialty Handlers ---
  const handleAddSpecialty = () => {
    const isMammaRoma = selectedBrand === "mamma-roma";
    const newSpecialty = {
      id: `spec-${Date.now()}`,
      title: "Nueva Especialidad Culinaria",
      description: "Descripción detallada del platillo artesanal preparado con ingredientes frescos y recetas tradicionales.",
      image: isMammaRoma ? "/images/dishes/mr-pasta.jpg" : "/images/dishes/sc-pizza-carpaccio.jpg",
      badge: "Especialidad",
      reverse: currentBrand.specialties.items.length % 2 === 1,
    };

    updateCurrentBrandField("specialties", {
      ...currentBrand.specialties,
      items: [...currentBrand.specialties.items, newSpecialty],
    });
  };

  const handleDeleteSpecialty = (index: number) => {
    if (confirm("¿Estás seguro de eliminar esta especialidad?")) {
      const updated = currentBrand.specialties.items.filter((_, i) => i !== index);
      updateCurrentBrandField("specialties", {
        ...currentBrand.specialties,
        items: updated,
      });
    }
  };

  // --- Event Package Handlers ---
  const handleAddEventPackage = () => {
    const newPkg: EventPackage = {
      id: `pkg-${Date.now()}`,
      title: "Nuevo Paquete de Evento",
      subtitle: "Celebraciones personalizadas",
      description: "Menú exclusivo y atención dedicada para tu reunión o festejo especial.",
      capacity: "Desde 10 hasta 50 personas",
      features: [
        "Menú italiano artesanal de 3 tiempos",
        "Salón o área exclusiva reservada",
        "Servicio y atención personalizada",
      ],
    };

    updateCurrentBrandField("eventPackages", [...(currentBrand.eventPackages || []), newPkg]);
  };

  const handleDeleteEventPackage = (index: number) => {
    if (confirm("¿Estás seguro de eliminar este paquete de eventos?")) {
      const updated = (currentBrand.eventPackages || []).filter((_, i) => i !== index);
      updateCurrentBrandField("eventPackages", updated);
    }
  };

  // Loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#111313] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#d7a53b]" />
      </div>
    );
  }

  // --- LOGIN GATEWAY ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111313] text-white flex flex-col justify-center items-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Italian stripe top border */}
          <div className="absolute top-0 left-0 right-0 h-1.5 flex">
            <div className="w-1/3 bg-[#006a34]" />
            <div className="w-1/3 bg-white" />
            <div className="w-1/3 bg-[#e3252d]" />
          </div>

          <div className="text-center mb-8 pt-2">
            <div className="flex justify-center mb-4">
              <MammaRomaGroupLogo className="h-16" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Panel de Configuración
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Acceso exclusivo para administradores del grupo gastronómico
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Contraseña Maestra
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  value={loginPasswordInput}
                  onChange={(e) => setLoginPasswordInput(e.target.value)}
                  placeholder="Introduce la clave de administración"
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#d7a53b] transition"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-[#e3252d] to-[#bf241e] hover:from-[#c91e25] hover:to-[#a81c17] text-white shadow-lg transition active:scale-98 flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" />
              <span>Ingresar al Panel Seguro</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la página principal</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- AUTHENTICATED ADMIN PANEL ---
  return (
    <div className="min-h-screen bg-[#111313] text-neutral-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition" title="Ir al sitio público">
              <ArrowLeft className="w-4 h-4 text-neutral-300" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#d7a53b]">
                  Admin CMS
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  En Línea
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-white">
                Mamma Roma Group • Panel Maestro
              </h1>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Brand Switcher */}
            <div className="inline-flex rounded-xl bg-neutral-950 p-1 border border-neutral-800">
              <button
                onClick={() => setSelectedBrand("mamma-roma")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedBrand === "mamma-roma"
                    ? "bg-[#e3252d] text-white shadow"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Mamma Roma
              </button>
              <button
                onClick={() => setSelectedBrand("sette-colli")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedBrand === "sette-colli"
                    ? "bg-[#bf241e] text-white shadow"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Sette Colli
              </button>
            </div>

            {/* Change Password Button */}
            <button
              onClick={() => setShowPasswordModal(true)}
              className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-neutral-700"
              title="Cambiar contraseña de administrador"
            >
              <Key className="w-3.5 h-3.5 text-[#d7a53b]" />
              <span className="hidden sm:inline">Cambiar Clave</span>
            </button>

            {/* Save All Button */}
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-black uppercase tracking-wider transition shadow-lg flex items-center gap-2"
            >
              {isSaving ? (
                <span>Guardando...</span>
              ) : savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Guardado!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Guardar Cambios</span>
                </>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-300 rounded-xl transition border border-neutral-700"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Save Notification */}
      <AnimatePresence>
        {savedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold border border-emerald-400"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>¡Cambios guardados con éxito en el servidor y sitio web!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Tabs Bar */}
      <div className="bg-neutral-900 border-b border-neutral-800 px-4 sm:px-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 py-2">
          {[
            { id: "brandInfo", label: "Marca & Hero", icon: Sparkles },
            { id: "specialties", label: "Especialidades", icon: Flame },
            { id: "promotions", label: "Promociones del Mes", icon: Tag },
            { id: "menu", label: "Menú Digital", icon: Utensils },
            { id: "sauces", label: "Salsas Artesanales", icon: Layers },
            { id: "locations", label: "Sucursales", icon: MapPin },
            { id: "delivery", label: "Delivery & Cobertura", icon: Truck },
            { id: "social", label: "Redes Sociales", icon: Share2 },
            { id: "events", label: "Eventos & Contacto", icon: Calendar },
            { id: "security", label: "Seguridad", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? "bg-neutral-800 text-white shadow-sm border border-neutral-700"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#d7a53b]" : "text-neutral-500"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        {/* TAB 1: BRAND INFO & HERO */}
        {activeTab === "brandInfo" && (
          <div className="space-y-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#d7a53b]" />
                  <span>Información Principal de {currentBrand.name}</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Configura nombres, eslóganes y teléfonos de atención.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Nombre Oficial
                  </label>
                  <input
                    type="text"
                    value={currentBrand.name}
                    onChange={(e) => updateCurrentBrandField("name", e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Eslogan
                  </label>
                  <input
                    type="text"
                    value={currentBrand.slogan}
                    onChange={(e) => updateCurrentBrandField("slogan", e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Teléfono Central de Pedidos
                  </label>
                  <input
                    type="text"
                    value={currentBrand.phone}
                    onChange={(e) => updateCurrentBrandField("phone", e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Horarios Generales
                  </label>
                  <input
                    type="text"
                    value={currentBrand.generalHours}
                    onChange={(e) => updateCurrentBrandField("generalHours", e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Hero Section Config */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#e3252d]" />
                  <span>Sección Hero (Portada de Inicio)</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Textos destacados y la imagen de fondo de la portada.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={currentBrand.hero.title}
                    onChange={(e) =>
                      updateCurrentBrandField("hero", {
                        ...currentBrand.hero,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Texto Resaltado
                  </label>
                  <input
                    type="text"
                    value={currentBrand.hero.highlight}
                    onChange={(e) =>
                      updateCurrentBrandField("hero", {
                        ...currentBrand.hero,
                        highlight: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Descripción de Portada
                  </label>
                  <textarea
                    rows={3}
                    value={currentBrand.hero.description}
                    onChange={(e) =>
                      updateCurrentBrandField("hero", {
                        ...currentBrand.hero,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Texto Botón Principal (CTA 1)
                  </label>
                  <input
                    type="text"
                    value={currentBrand.hero.ctaPrimary}
                    onChange={(e) =>
                      updateCurrentBrandField("hero", {
                        ...currentBrand.hero,
                        ctaPrimary: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Texto Botón Secundario (CTA 2)
                  </label>
                  <input
                    type="text"
                    value={currentBrand.hero.ctaSecondary}
                    onChange={(e) =>
                      updateCurrentBrandField("hero", {
                        ...currentBrand.hero,
                        ctaSecondary: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                {/* Hero Image with Uploader */}
                <div className="md:col-span-2 pt-2">
                  <ImageUploader
                    label="Imagen de Fondo de Portada (Hero)"
                    value={currentBrand.hero.heroImage}
                    onChange={(url) =>
                      updateCurrentBrandField("hero", {
                        ...currentBrand.hero,
                        heroImage: url,
                      })
                    }
                    helperText="Recomendado: Imagen de alta calidad (1920x1080 o superior). Puedes subirla directamente desde tu computadora."
                    previewHeight="h-44"
                  />
                </div>
              </div>
            </div>

            {/* Story Section Config */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#d7a53b]" />
                  <span>Historia & Filosofía</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Texto que narra la tradición y esencia familiar.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Título de Historia
                  </label>
                  <input
                    type="text"
                    value={currentBrand.storyTitle}
                    onChange={(e) => updateCurrentBrandField("storyTitle", e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Descripción / Relato
                  </label>
                  <textarea
                    rows={4}
                    value={currentBrand.storyDescription}
                    onChange={(e) => updateCurrentBrandField("storyDescription", e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <ImageUploader
                    label="Fotografía de Historia / Ambiente"
                    value={currentBrand.storyImage}
                    onChange={(url) => updateCurrentBrandField("storyImage", url)}
                    helperText="Foto representativa del restaurante, fundadores o ambiente."
                    previewHeight="h-40"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ESPECIALIDADES / MAESTRÍA (Requirement 10) */}
        {activeTab === "specialties" && (
          <div className="space-y-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#e3252d]" />
                  <span>Cabecera de Especialidades</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Personaliza los títulos del bloque de {currentBrand.name} (ej. &quot;Nuestras Especialidades&quot; o &quot;Maestría Pizzaiola&quot;).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Badge Superior / Sello
                  </label>
                  <input
                    type="text"
                    value={currentBrand.specialties.badge || ""}
                    placeholder="Ej. Tradición Artesanal"
                    onChange={(e) =>
                      updateCurrentBrandField("specialties", {
                        ...currentBrand.specialties,
                        badge: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Título de la Sección
                  </label>
                  <input
                    type="text"
                    value={currentBrand.specialties.title}
                    onChange={(e) =>
                      updateCurrentBrandField("specialties", {
                        ...currentBrand.specialties,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Subtítulo / Bajada
                  </label>
                  <input
                    type="text"
                    value={currentBrand.specialties.subtitle}
                    onChange={(e) =>
                      updateCurrentBrandField("specialties", {
                        ...currentBrand.specialties,
                        subtitle: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* List of Specialty Cards */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 p-6 rounded-3xl">
                <div>
                  <h3 className="text-base font-black text-white">
                    Platos Estrella en Especialidades ({currentBrand.specialties.items.length})
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Puedes agregar, editar o eliminar platos de la sección principal.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddSpecialty}
                  className="py-2.5 px-4 bg-[#e3252d] hover:bg-[#c91e25] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow flex items-center gap-2 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Especialidad</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {currentBrand.specialties.items.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black uppercase tracking-wider text-[#d7a53b]">
                          Especialidad #{idx + 1}
                        </span>
                        {item.badge && (
                          <span className="text-[11px] bg-red-950 text-red-300 border border-red-800 px-2.5 py-0.5 rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteSpecialty(idx)}
                        className="p-1.5 bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 rounded-lg transition"
                        title="Eliminar especialidad"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                          Título
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const newItems = [...currentBrand.specialties.items];
                            newItems[idx] = { ...newItems[idx], title: e.target.value };
                            updateCurrentBrandField("specialties", {
                              ...currentBrand.specialties,
                              items: newItems,
                            });
                          }}
                          className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                          Etiqueta / Badge
                        </label>
                        <input
                          type="text"
                          value={item.badge || ""}
                          onChange={(e) => {
                            const newItems = [...currentBrand.specialties.items];
                            newItems[idx] = { ...newItems[idx], badge: e.target.value };
                            updateCurrentBrandField("specialties", {
                              ...currentBrand.specialties,
                              items: newItems,
                            });
                          }}
                          placeholder="Ej. Elaboración Diaria, Chef Choice"
                          className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                          Descripción
                        </label>
                        <textarea
                          rows={3}
                          value={item.description}
                          onChange={(e) => {
                            const newItems = [...currentBrand.specialties.items];
                            newItems[idx] = { ...newItems[idx], description: e.target.value };
                            updateCurrentBrandField("specialties", {
                              ...currentBrand.specialties,
                              items: newItems,
                            });
                          }}
                          className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <ImageUploader
                          label={`Fotografía de ${item.title || "Especialidad"}`}
                          value={item.image}
                          onChange={(url) => {
                            const newItems = [...currentBrand.specialties.items];
                            newItems[idx] = { ...newItems[idx], image: url };
                            updateCurrentBrandField("specialties", {
                              ...currentBrand.specialties,
                              items: newItems,
                            });
                          }}
                          helperText="Sube una foto apetitosa del platillo con un clic."
                          previewHeight="h-40"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROMOCIONES DEL MES (Requirement 9) */}
        {activeTab === "promotions" && (
          <div className="space-y-6">
            {/* Banner de Promociones Editor */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#d7a53b]" />
                  <span>Banner Superior de Promociones ({currentBrand.name})</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Personaliza los textos, distintivos y la imagen de fondo del encabezado de la sección de promociones.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Etiqueta / Badge Superior
                  </label>
                  <input
                    type="text"
                    value={currentBrand.promotionsBanner?.badge || ""}
                    placeholder="Ej. Ofertas & Novedades Exclusivas"
                    onChange={(e) =>
                      updateCurrentBrandField("promotionsBanner", {
                        ...(currentBrand.promotionsBanner || {}),
                        badge: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={currentBrand.promotionsBanner?.title || ""}
                    placeholder={`Promociones del Mes en ${currentBrand.name}`}
                    onChange={(e) =>
                      updateCurrentBrandField("promotionsBanner", {
                        ...(currentBrand.promotionsBanner || {}),
                        title: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Descripción / Subtítulo del Banner
                  </label>
                  <textarea
                    rows={3}
                    value={currentBrand.promotionsBanner?.description || ""}
                    placeholder="Texto explicativo de las ofertas y promociones del mes..."
                    onChange={(e) =>
                      updateCurrentBrandField("promotionsBanner", {
                        ...(currentBrand.promotionsBanner || {}),
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Pastilla Informativa 1
                  </label>
                  <input
                    type="text"
                    value={currentBrand.promotionsBanner?.pill1 || ""}
                    placeholder="Disponibles para comedor & a domicilio"
                    onChange={(e) =>
                      updateCurrentBrandField("promotionsBanner", {
                        ...(currentBrand.promotionsBanner || {}),
                        pill1: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Pastilla Informativa 2
                  </label>
                  <input
                    type="text"
                    value={currentBrand.promotionsBanner?.pill2 || ""}
                    placeholder="Ingredientes italianos 100% auténticos"
                    onChange={(e) =>
                      updateCurrentBrandField("promotionsBanner", {
                        ...(currentBrand.promotionsBanner || {}),
                        pill2: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <ImageUploader
                    label="Imagen de Fondo del Banner de Promociones"
                    value={currentBrand.promotionsBanner?.heroImage || currentBrand.hero.heroImage}
                    onChange={(url) =>
                      updateCurrentBrandField("promotionsBanner", {
                        ...(currentBrand.promotionsBanner || {}),
                        heroImage: url,
                      })
                    }
                    helperText="Se mostrará de fondo con degradado oscuro para que el texto resalte perfectamente."
                    previewHeight="h-36"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 p-6 rounded-3xl">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#d7a53b]" />
                  <span>Promociones del Mes & Lanzamientos ({currentBrand.name})</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Gestiona afiches, ofertas especiales, 2x1 y lanzamientos de temporada.
                </p>
              </div>

              <button
                onClick={() => setShowAddPromoModal(true)}
                className="py-2.5 px-4 bg-[#e3252d] hover:bg-[#c91e25] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Promoción</span>
              </button>
            </div>

            {/* List of Promotions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(currentBrand.promotions || []).map((promo, idx) => (
                <div
                  key={promo.id || idx}
                  className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-neutral-400">Estado:</span>
                        <button
                          type="button"
                          onClick={() => {
                            const currentPromos = [...(currentBrand.promotions || [])];
                            currentPromos[idx] = {
                              ...currentPromos[idx],
                              active: !currentPromos[idx].active,
                            };
                            updateCurrentBrandField("promotions", currentPromos);
                          }}
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition ${
                            promo.active
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                              : "bg-neutral-800 text-neutral-400"
                          }`}
                        >
                          {promo.active ? "Activa (Visible)" : "Pausada"}
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeletePromotion(promo.id)}
                        className="p-1.5 bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 rounded-lg transition"
                        title="Eliminar promoción"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        Título
                      </label>
                      <input
                        type="text"
                        value={promo.title}
                        onChange={(e) => {
                          const currentPromos = [...(currentBrand.promotions || [])];
                          currentPromos[idx] = { ...currentPromos[idx], title: e.target.value };
                          updateCurrentBrandField("promotions", currentPromos);
                        }}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                          Etiqueta
                        </label>
                        <input
                          type="text"
                          value={promo.badge || ""}
                          onChange={(e) => {
                            const currentPromos = [...(currentBrand.promotions || [])];
                            currentPromos[idx] = { ...currentPromos[idx], badge: e.target.value };
                            updateCurrentBrandField("promotions", currentPromos);
                          }}
                          placeholder="Ej. 2x1 Martes"
                          className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                          Vigencia
                        </label>
                        <input
                          type="text"
                          value={promo.validUntil || ""}
                          onChange={(e) => {
                            const currentPromos = [...(currentBrand.promotions || [])];
                            currentPromos[idx] = { ...currentPromos[idx], validUntil: e.target.value };
                            updateCurrentBrandField("promotions", currentPromos);
                          }}
                          placeholder="Ej. Todo el mes"
                          className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        Descripción
                      </label>
                      <textarea
                        rows={3}
                        value={promo.description}
                        onChange={(e) => {
                          const currentPromos = [...(currentBrand.promotions || [])];
                          currentPromos[idx] = { ...currentPromos[idx], description: e.target.value };
                          updateCurrentBrandField("promotions", currentPromos);
                        }}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <ImageUploader
                        label="Afiche / Foto de la Promoción"
                        value={promo.image}
                        onChange={(url) => {
                          const currentPromos = [...(currentBrand.promotions || [])];
                          currentPromos[idx] = { ...currentPromos[idx], image: url };
                          updateCurrentBrandField("promotions", currentPromos);
                        }}
                        previewHeight="h-32"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MENÚ DIGITAL & PLATILLOS */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 p-6 rounded-3xl">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#d7a53b]" />
                  <span>Catálogo de Menú ({currentBrand.menuItems.length} platillos)</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Agrega platillos con fotos optimizadas, precios, categorías y descripciones.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddDishModal(true)}
                  className="py-2.5 px-4 bg-[#e3252d] hover:bg-[#c91e25] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Platillo</span>
                </button>
              </div>
            </div>

            {/* Search and Category Filter */}
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl flex items-center gap-4">
              <Search className="w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={dishSearch}
                onChange={(e) => setDishSearch(e.target.value)}
                placeholder="Buscar platillo por nombre o ingrediente..."
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
              />
            </div>

            {/* Dishes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentBrand.menuItems
                .filter(
                  (d) =>
                    d.name.toLowerCase().includes(dishSearch.toLowerCase()) ||
                    d.category.toLowerCase().includes(dishSearch.toLowerCase())
                )
                .map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] bg-neutral-800 text-neutral-300 px-2.5 py-0.5 rounded-full font-bold">
                          {dish.category}
                        </span>
                        <button
                          onClick={() => handleDeleteDish(dish.id)}
                          className="p-1.5 bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 rounded-lg transition"
                          title="Eliminar platillo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="relative h-36 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow">
                          Q{dish.price}
                        </div>
                        {dish.badge && (
                          <div className="absolute top-2 left-2 bg-[#e3252d] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                            {dish.badge}
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="text-base font-black text-white">{dish.name}</h4>
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                          {dish.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                      <span>ID: {dish.id.slice(0, 10)}</span>
                      <div className="flex items-center gap-1.5">
                        {dish.isVegetarian && <span title="Vegetariano">🌱</span>}
                        {dish.isGlutenFree && <span title="Sin Gluten">🌾</span>}
                        {dish.isSpicy && <span title="Picante">🌶️</span>}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 5: SALSAS ARTESANALES (Requirement 7) */}
        {activeTab === "sauces" && (
          <div className="space-y-6">
            {/* Banner de Salsas & Encabezado */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#006a34]" />
                  <span>Banner Superior & Cabecera de Salsas ({currentBrand.name})</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Personaliza los textos, distintivos, pastillas y foto de fondo del hero de salsas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Etiqueta / Badge Superior
                  </label>
                  <input
                    type="text"
                    value={currentBrand.saucesBanner?.badge || ""}
                    placeholder="Línea Exclusiva Mamma Roma"
                    onChange={(e) =>
                      updateCurrentBrandField("saucesBanner", {
                        ...(currentBrand.saucesBanner || {}),
                        badge: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Título Principal del Banner
                  </label>
                  <input
                    type="text"
                    value={currentBrand.saucesBanner?.title || ""}
                    placeholder="Nuestra Salsa Es Un Viaje Directo Al Corazón De La Italia 🇮🇹"
                    onChange={(e) =>
                      updateCurrentBrandField("saucesBanner", {
                        ...(currentBrand.saucesBanner || {}),
                        title: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Descripción del Banner
                  </label>
                  <textarea
                    rows={3}
                    value={currentBrand.saucesBanner?.description || ""}
                    placeholder="Tres salsas artesanales envasadas..."
                    onChange={(e) =>
                      updateCurrentBrandField("saucesBanner", {
                        ...(currentBrand.saucesBanner || {}),
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Pastilla 1
                  </label>
                  <input
                    type="text"
                    value={currentBrand.saucesBanner?.pill1 || ""}
                    placeholder="100% Natural"
                    onChange={(e) =>
                      updateCurrentBrandField("saucesBanner", {
                        ...(currentBrand.saucesBanner || {}),
                        pill1: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Pastilla 2
                  </label>
                  <input
                    type="text"
                    value={currentBrand.saucesBanner?.pill2 || ""}
                    placeholder="Sin conservantes artificiales"
                    onChange={(e) =>
                      updateCurrentBrandField("saucesBanner", {
                        ...(currentBrand.saucesBanner || {}),
                        pill2: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Pastilla 3
                  </label>
                  <input
                    type="text"
                    value={currentBrand.saucesBanner?.pill3 || ""}
                    placeholder="Tomates e ingredientes seleccionados"
                    onChange={(e) =>
                      updateCurrentBrandField("saucesBanner", {
                        ...(currentBrand.saucesBanner || {}),
                        pill3: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <ImageUploader
                    label="Imagen de Fondo del Hero de Salsas"
                    value={currentBrand.saucesBanner?.heroImage || "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=1600&q=80"}
                    onChange={(url) =>
                      updateCurrentBrandField("saucesBanner", {
                        ...(currentBrand.saucesBanner || {}),
                        heroImage: url,
                      })
                    }
                    previewHeight="h-28"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Badge de la Sección de Frascos
                  </label>
                  <input
                    type="text"
                    value={currentBrand.saucesBanner?.sectionBadge || ""}
                    placeholder="Llevá la experiencia Mamma Roma a tu hogar"
                    onChange={(e) =>
                      updateCurrentBrandField("saucesBanner", {
                        ...(currentBrand.saucesBanner || {}),
                        sectionBadge: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Título de la Sección de Frascos
                  </label>
                  <input
                    type="text"
                    value={currentBrand.saucesBanner?.sectionTitle || ""}
                    placeholder="Los Tres Clásicos Inolvidables"
                    onChange={(e) =>
                      updateCurrentBrandField("saucesBanner", {
                        ...(currentBrand.saucesBanner || {}),
                        sectionTitle: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Descripción de la Sección de Frascos
                  </label>
                  <input
                    type="text"
                    value={currentBrand.saucesBanner?.sectionDescription || ""}
                    placeholder="Listas para calentar y servir..."
                    onChange={(e) =>
                      updateCurrentBrandField("saucesBanner", {
                        ...(currentBrand.saucesBanner || {}),
                        sectionDescription: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 p-6 rounded-3xl">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#006a34]" />
                  <span>Salsas Artesanales Envasadas Mamma Roma</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  100% personalizables: nombre, descripción, maridaje, ingredientes, precio y foto.
                </p>
              </div>

              <button
                onClick={() => setShowAddSauceModal(true)}
                className="py-2.5 px-4 bg-[#006a34] hover:bg-[#00552a] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Salsa</span>
              </button>
            </div>

            {/* Sauces Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(currentBrand.sauces || []).map((sauce, idx) => (
                <div
                  key={sauce.id || idx}
                  className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-[#d7a53b]">
                        {sauce.badge}
                      </span>
                      <button
                        onClick={() => handleDeleteSauce(sauce.id)}
                        className="p-1.5 bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 rounded-lg transition"
                        title="Eliminar salsa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        Nombre
                      </label>
                      <input
                        type="text"
                        value={sauce.name}
                        onChange={(e) => {
                          const currentSauces = [...(currentBrand.sauces || [])];
                          currentSauces[idx] = { ...currentSauces[idx], name: e.target.value };
                          updateCurrentBrandField("sauces", currentSauces);
                        }}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                          Precio (Q)
                        </label>
                        <input
                          type="number"
                          value={sauce.price}
                          onChange={(e) => {
                            const currentSauces = [...(currentBrand.sauces || [])];
                            currentSauces[idx] = { ...currentSauces[idx], price: Number(e.target.value) };
                            updateCurrentBrandField("sauces", currentSauces);
                          }}
                          className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                          Presentación
                        </label>
                        <input
                          type="text"
                          value={sauce.netWeight}
                          onChange={(e) => {
                            const currentSauces = [...(currentBrand.sauces || [])];
                            currentSauces[idx] = { ...currentSauces[idx], netWeight: e.target.value };
                            updateCurrentBrandField("sauces", currentSauces);
                          }}
                          className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        Descripción
                      </label>
                      <textarea
                        rows={2}
                        value={sauce.description}
                        onChange={(e) => {
                          const currentSauces = [...(currentBrand.sauces || [])];
                          currentSauces[idx] = { ...currentSauces[idx], description: e.target.value };
                          updateCurrentBrandField("sauces", currentSauces);
                        }}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        Sugerencia de Maridaje
                      </label>
                      <input
                        type="text"
                        value={sauce.pairing}
                        onChange={(e) => {
                          const currentSauces = [...(currentBrand.sauces || [])];
                          currentSauces[idx] = { ...currentSauces[idx], pairing: e.target.value };
                          updateCurrentBrandField("sauces", currentSauces);
                        }}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <ImageUploader
                        label="Fotografía del Frasco"
                        value={sauce.image}
                        onChange={(url) => {
                          const currentSauces = [...(currentBrand.sauces || [])];
                          currentSauces[idx] = { ...currentSauces[idx], image: url };
                          updateCurrentBrandField("sauces", currentSauces);
                        }}
                        previewHeight="h-32"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cajas de Beneficios / Propuesta de Valor */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#d7a53b]" />
                  <span>Cajas de Beneficios & Envíos (Parte Inferior)</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Personaliza los 3 bloques de valor que aparecen debajo del catálogo de salsas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Beneficio 1 */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 space-y-3">
                  <span className="text-xs font-bold text-[#d7a53b] uppercase">Beneficio 1</span>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Título</label>
                    <input
                      type="text"
                      value={currentBrand.saucesBanner?.benefit1Title || ""}
                      placeholder="Envíos a Domicilio"
                      onChange={(e) =>
                        updateCurrentBrandField("saucesBanner", {
                          ...(currentBrand.saucesBanner || {}),
                          benefit1Title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Descripción</label>
                    <textarea
                      rows={2}
                      value={currentBrand.saucesBanner?.benefit1Desc || ""}
                      placeholder="Llevamos tus frascos empacados..."
                      onChange={(e) =>
                        updateCurrentBrandField("saucesBanner", {
                          ...(currentBrand.saucesBanner || {}),
                          benefit1Desc: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Beneficio 2 */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 space-y-3">
                  <span className="text-xs font-bold text-[#d7a53b] uppercase">Beneficio 2</span>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Título</label>
                    <input
                      type="text"
                      value={currentBrand.saucesBanner?.benefit2Title || ""}
                      placeholder="Presentación 400g"
                      onChange={(e) =>
                        updateCurrentBrandField("saucesBanner", {
                          ...(currentBrand.saucesBanner || {}),
                          benefit2Title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Descripción</label>
                    <textarea
                      rows={2}
                      value={currentBrand.saucesBanner?.benefit2Desc || ""}
                      placeholder="Rinde de 3 a 4 porciones..."
                      onChange={(e) =>
                        updateCurrentBrandField("saucesBanner", {
                          ...(currentBrand.saucesBanner || {}),
                          benefit2Desc: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Beneficio 3 */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 space-y-3">
                  <span className="text-xs font-bold text-[#d7a53b] uppercase">Beneficio 3</span>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Título</label>
                    <input
                      type="text"
                      value={currentBrand.saucesBanner?.benefit3Title || ""}
                      placeholder="Paquete Trilogía"
                      onChange={(e) =>
                        updateCurrentBrandField("saucesBanner", {
                          ...(currentBrand.saucesBanner || {}),
                          benefit3Title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Descripción</label>
                    <textarea
                      rows={2}
                      value={currentBrand.saucesBanner?.benefit3Desc || ""}
                      placeholder="Pedí el combo con las tres salsas..."
                      onChange={(e) =>
                        updateCurrentBrandField("saucesBanner", {
                          ...(currentBrand.saucesBanner || {}),
                          benefit3Desc: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SUCURSALES (Requirement 4) */}
        {activeTab === "locations" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 p-6 rounded-3xl">
              <div>
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#e3252d]" />
                  <span>Sucursales de {currentBrand.name} ({currentBrand.locations.length})</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Agrega, edita o elimina restaurantes. Sette Colli cuenta con 1 ubicación (Convenia Plaza Z.10).
                </p>
              </div>

              <button
                onClick={() => setShowAddLocationModal(true)}
                className="py-2.5 px-4 bg-[#e3252d] hover:bg-[#c91e25] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Sucursal</span>
              </button>
            </div>

            {/* Locations Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentBrand.locations.map((loc, idx) => (
                <div
                  key={loc.id || idx}
                  className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-[#d7a53b]">
                      {loc.name}
                    </span>
                    <button
                      onClick={() => handleDeleteLocation(loc.id)}
                      className="p-1.5 bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 rounded-lg transition"
                      title="Eliminar sucursal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        Nombre de Sucursal
                      </label>
                      <input
                        type="text"
                        value={loc.name}
                        onChange={(e) => {
                          const currentLocs = [...currentBrand.locations];
                          currentLocs[idx] = { ...currentLocs[idx], name: e.target.value };
                          updateCurrentBrandField("locations", currentLocs);
                        }}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        Zona
                      </label>
                      <input
                        type="text"
                        value={loc.zone}
                        onChange={(e) => {
                          const currentLocs = [...currentBrand.locations];
                          currentLocs[idx] = { ...currentLocs[idx], zone: e.target.value };
                          updateCurrentBrandField("locations", currentLocs);
                        }}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        Teléfono
                      </label>
                      <input
                        type="text"
                        value={loc.phone}
                        onChange={(e) => {
                          const currentLocs = [...currentBrand.locations];
                          currentLocs[idx] = { ...currentLocs[idx], phone: e.target.value };
                          updateCurrentBrandField("locations", currentLocs);
                        }}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        Dirección Completa
                      </label>
                      <input
                        type="text"
                        value={loc.address}
                        onChange={(e) => {
                          const currentLocs = [...currentBrand.locations];
                          currentLocs[idx] = { ...currentLocs[idx], address: e.target.value };
                          updateCurrentBrandField("locations", currentLocs);
                        }}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        Horarios de Atención
                      </label>
                      <input
                        type="text"
                        value={loc.hours}
                        onChange={(e) => {
                          const currentLocs = [...currentBrand.locations];
                          currentLocs[idx] = { ...currentLocs[idx], hours: e.target.value };
                          updateCurrentBrandField("locations", currentLocs);
                        }}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <ImageUploader
                        label="Foto de Fachada o Terraza"
                        value={loc.image || ""}
                        onChange={(url) => {
                          const currentLocs = [...currentBrand.locations];
                          currentLocs[idx] = { ...currentLocs[idx], image: url };
                          updateCurrentBrandField("locations", currentLocs);
                        }}
                        previewHeight="h-32"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: DELIVERY & COBERTURA (Requirement 5) */}
        {activeTab === "delivery" && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#d7a53b]" />
                <span>Configuración de Delivery ({currentBrand.name})</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Ajusta tiempos estimados, sellos de seguridad y zonas de cobertura.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Tiempo Estimado de Entrega
                </label>
                <input
                  type="text"
                  value={currentBrand.deliveryInfo?.estimatedTime || "35 - 45 mins"}
                  onChange={(e) =>
                    updateCurrentBrandField("deliveryInfo", {
                      estimatedTime: e.target.value,
                      securitySeal: currentBrand.deliveryInfo?.securitySeal || "Sellos térmicos de seguridad",
                      coverageZones: currentBrand.deliveryInfo?.coverageZones || "Zonas de cobertura",
                      bannerTitle: currentBrand.deliveryInfo?.bannerTitle || "Pedí a Domicilio",
                      bannerDescription: currentBrand.deliveryInfo?.bannerDescription || "",
                    })
                  }
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Sello o Garantía de Empaque
                </label>
                <input
                  type="text"
                  value={currentBrand.deliveryInfo?.securitySeal || "Sellos térmicos de seguridad"}
                  onChange={(e) =>
                    updateCurrentBrandField("deliveryInfo", {
                      estimatedTime: currentBrand.deliveryInfo?.estimatedTime || "35 - 45 mins",
                      securitySeal: e.target.value,
                      coverageZones: currentBrand.deliveryInfo?.coverageZones || "Zonas de cobertura",
                      bannerTitle: currentBrand.deliveryInfo?.bannerTitle || "Pedí a Domicilio",
                      bannerDescription: currentBrand.deliveryInfo?.bannerDescription || "",
                    })
                  }
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Zonas de Cobertura Oficial
                </label>
                <input
                  type="text"
                  value={currentBrand.deliveryInfo?.coverageZones || "Zonas 1, 4, 10, 14, 15, 16"}
                  onChange={(e) =>
                    updateCurrentBrandField("deliveryInfo", {
                      estimatedTime: currentBrand.deliveryInfo?.estimatedTime || "35 - 45 mins",
                      securitySeal: currentBrand.deliveryInfo?.securitySeal || "Sellos térmicos de seguridad",
                      coverageZones: e.target.value,
                      bannerTitle: currentBrand.deliveryInfo?.bannerTitle || "Pedí a Domicilio",
                      bannerDescription: currentBrand.deliveryInfo?.bannerDescription || "",
                    })
                  }
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Título del Banner de Delivery
                </label>
                <input
                  type="text"
                  value={currentBrand.deliveryInfo?.bannerTitle || "Pedí a Domicilio"}
                  onChange={(e) =>
                    updateCurrentBrandField("deliveryInfo", {
                      estimatedTime: currentBrand.deliveryInfo?.estimatedTime || "35 - 45 mins",
                      securitySeal: currentBrand.deliveryInfo?.securitySeal || "Sellos térmicos de seguridad",
                      coverageZones: currentBrand.deliveryInfo?.coverageZones || "Zonas de cobertura",
                      bannerTitle: e.target.value,
                      bannerDescription: currentBrand.deliveryInfo?.bannerDescription || "",
                    })
                  }
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Descripción del Banner de Delivery
                </label>
                <textarea
                  rows={3}
                  value={
                    currentBrand.deliveryInfo?.bannerDescription ||
                    "Llevamos el sabor y aroma de Italia directo a la puerta de tu casa o trabajo. Caliente, recién salido de cocina y con empaque térmico especial."
                  }
                  onChange={(e) =>
                    updateCurrentBrandField("deliveryInfo", {
                      estimatedTime: currentBrand.deliveryInfo?.estimatedTime || "35 - 45 mins",
                      securitySeal: currentBrand.deliveryInfo?.securitySeal || "Sellos térmicos de seguridad",
                      coverageZones: currentBrand.deliveryInfo?.coverageZones || "Zonas de cobertura",
                      bannerTitle: currentBrand.deliveryInfo?.bannerTitle || "Pedí a Domicilio",
                      bannerDescription: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: REDES SOCIALES (Requirement 6) */}
        {activeTab === "social" && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#d7a53b]" />
                <span>Redes Sociales Oficiales ({currentBrand.name})</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Puedes activar o desactivar cada botón individualmente sin romper la página, además de cambiar su enlace oficial.
              </p>
            </div>

            <div className="space-y-6">
              {/* Instagram */}
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-[#e3252d]/20 text-[#e3252d]">
                    <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">Instagram</span>
                    <span className="text-xs text-neutral-400">Perfil oficial en Instagram</span>
                  </div>
                </div>

                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    value={currentBrand.socialLinks.instagram}
                    onChange={(e) =>
                      updateCurrentBrandField("socialLinks", {
                        ...currentBrand.socialLinks,
                        instagram: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateCurrentBrandField("socialLinks", {
                      ...currentBrand.socialLinks,
                      instagramEnabled: !(currentBrand.socialLinks.instagramEnabled !== false),
                    })
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    currentBrand.socialLinks.instagramEnabled !== false
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {currentBrand.socialLinks.instagramEnabled !== false ? "Activado" : "Desactivado"}
                </button>
              </div>

              {/* Facebook */}
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-blue-900/30 text-blue-400">
                    <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">Facebook</span>
                    <span className="text-xs text-neutral-400">Página oficial en Facebook</span>
                  </div>
                </div>

                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    value={currentBrand.socialLinks.facebook}
                    onChange={(e) =>
                      updateCurrentBrandField("socialLinks", {
                        ...currentBrand.socialLinks,
                        facebook: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateCurrentBrandField("socialLinks", {
                      ...currentBrand.socialLinks,
                      facebookEnabled: !(currentBrand.socialLinks.facebookEnabled !== false),
                    })
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    currentBrand.socialLinks.facebookEnabled !== false
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {currentBrand.socialLinks.facebookEnabled !== false ? "Activado" : "Desactivado"}
                </button>
              </div>

              {/* WhatsApp */}
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-emerald-900/30 text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">WhatsApp</span>
                    <span className="text-xs text-neutral-400">Enlace directo de WhatsApp</span>
                  </div>
                </div>

                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    value={currentBrand.socialLinks.whatsapp}
                    onChange={(e) =>
                      updateCurrentBrandField("socialLinks", {
                        ...currentBrand.socialLinks,
                        whatsapp: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateCurrentBrandField("socialLinks", {
                      ...currentBrand.socialLinks,
                      whatsappEnabled: !(currentBrand.socialLinks.whatsappEnabled !== false),
                    })
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    currentBrand.socialLinks.whatsappEnabled !== false
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {currentBrand.socialLinks.whatsappEnabled !== false ? "Activado" : "Desactivado"}
                </button>
              </div>

              {/* TikTok */}
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-pink-900/30 text-pink-400">
                    <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V14.5c0 1.95-.53 3.91-1.69 5.46-1.22 1.61-3.08 2.67-5.07 2.95-1.98.27-4.05-.18-5.74-1.28-1.68-1.11-2.81-2.9-3.13-4.88-.32-2 .24-4.09 1.48-5.69 1.24-1.59 3.19-2.54 5.2-2.58.55-.02 1.1.04 1.64.18v4.13c-.39-.14-.81-.2-1.23-.18-1.04.05-2.02.6-2.57 1.48-.56.88-.63 2.02-.18 2.96.45.94 1.43 1.56 2.47 1.58 1.14.02 2.22-.64 2.69-1.68.22-.49.33-1.03.33-1.57V.02h.01z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">TikTok</span>
                    <span className="text-xs text-neutral-400">Perfil oficial en TikTok</span>
                  </div>
                </div>

                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    value={currentBrand.socialLinks.tiktok}
                    onChange={(e) =>
                      updateCurrentBrandField("socialLinks", {
                        ...currentBrand.socialLinks,
                        tiktok: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateCurrentBrandField("socialLinks", {
                      ...currentBrand.socialLinks,
                      tiktokEnabled: !(currentBrand.socialLinks.tiktokEnabled !== false),
                    })
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    currentBrand.socialLinks.tiktokEnabled !== false
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {currentBrand.socialLinks.tiktokEnabled !== false ? "Activado" : "Desactivado"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: EVENTOS & CONTACTO */}
        {activeTab === "events" && (
          <div className="space-y-8">
            {/* 1. Cabecera de Contacto & Fotos de Fondo (Reel) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#d7a53b]" />
                  <span>Cabecera de Contacto & Fotos de Fondo ({currentBrand.name})</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Personaliza el banner de bienvenida de la página de contacto y las fotos en rotación continua del fondo.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Badge Superior
                  </label>
                  <input
                    type="text"
                    value={currentBrand.contactConfig?.heroBadge || ""}
                    placeholder={`Atención Personalizada • ${currentBrand.name}`}
                    onChange={(e) =>
                      updateCurrentBrandField("contactConfig", {
                        ...(currentBrand.contactConfig || {}),
                        heroBadge: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={currentBrand.contactConfig?.heroTitle || ""}
                    placeholder="Pongámonos en Contacto"
                    onChange={(e) =>
                      updateCurrentBrandField("contactConfig", {
                        ...(currentBrand.contactConfig || {}),
                        heroTitle: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Descripción / Bajada
                  </label>
                  <textarea
                    rows={2}
                    value={currentBrand.contactConfig?.heroDescription || ""}
                    placeholder="Para consultas o reservaciones, escribinos o llamanos..."
                    onChange={(e) =>
                      updateCurrentBrandField("contactConfig", {
                        ...(currentBrand.contactConfig || {}),
                        heroDescription: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Carrusel de Fotos de Fondo */}
              <div className="pt-4 border-t border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-white">
                      Fotos de Fondo en Rotación (Reel / Carrusel)
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Imágenes de alta resolución que rotan automáticamente en el fondo oscuro de contacto.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const currentImages = currentBrand.contactConfig?.carouselImages || [];
                      updateCurrentBrandField("contactConfig", {
                        ...(currentBrand.contactConfig || {}),
                        carouselImages: [
                          ...currentImages,
                          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
                        ],
                      });
                    }}
                    className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Foto al Carrusel</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(currentBrand.contactConfig?.carouselImages || []).map((imgUrl, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#d7a53b]">
                          Foto #{imgIdx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const currentImages = currentBrand.contactConfig?.carouselImages || [];
                            const updated = currentImages.filter((_, i) => i !== imgIdx);
                            updateCurrentBrandField("contactConfig", {
                              ...(currentBrand.contactConfig || {}),
                              carouselImages: updated,
                            });
                          }}
                          className="p-1 text-neutral-500 hover:text-red-400 transition"
                          title="Eliminar foto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <ImageUploader
                        label={`Imagen #${imgIdx + 1}`}
                        value={imgUrl}
                        onChange={(url) => {
                          const currentImages = [...(currentBrand.contactConfig?.carouselImages || [])];
                          currentImages[imgIdx] = url;
                          updateCurrentBrandField("contactConfig", {
                            ...(currentBrand.contactConfig || {}),
                            carouselImages: currentImages,
                          });
                        }}
                        previewHeight="h-28"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Sección de Eventos & Paquetes */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#d7a53b]" />
                  <span>Sección de Eventos, Banquetes & Paquetes ({currentBrand.name})</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Personaliza los textos del bloque de celebraciones y cada uno de los paquetes disponibles.
                </p>
              </div>

              {/* Encabezado del bloque de eventos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Badge de Eventos
                  </label>
                  <input
                    type="text"
                    value={currentBrand.contactConfig?.eventsBadge || ""}
                    placeholder="Celebraciones & Banquetes"
                    onChange={(e) =>
                      updateCurrentBrandField("contactConfig", {
                        ...(currentBrand.contactConfig || {}),
                        eventsBadge: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Título de la Sección de Eventos
                  </label>
                  <input
                    type="text"
                    value={currentBrand.contactConfig?.eventsTitle || ""}
                    placeholder="Eventos Familiares, Corporativos o Personales de Amigos"
                    onChange={(e) =>
                      updateCurrentBrandField("contactConfig", {
                        ...(currentBrand.contactConfig || {}),
                        eventsTitle: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Descripción de la Sección de Eventos
                  </label>
                  <textarea
                    rows={2}
                    value={currentBrand.contactConfig?.eventsDescription || ""}
                    placeholder="Hacé de tu fecha especial un recuerdo inolvidable..."
                    onChange={(e) =>
                      updateCurrentBrandField("contactConfig", {
                        ...(currentBrand.contactConfig || {}),
                        eventsDescription: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Paquetes CRUD */}
              <div className="pt-6 border-t border-neutral-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-black text-white">
                      Paquetes de Eventos ({currentBrand.eventPackages.length})
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Agrega o elimina paquetes personalizados según los servicios ofrecidos.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddEventPackage}
                    className="py-2.5 px-4 bg-[#e3252d] hover:bg-[#c91e25] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow flex items-center gap-2 self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Paquete</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentBrand.eventPackages.map((pkg, idx) => (
                    <div key={pkg.id || idx} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                        <span className="text-xs font-black uppercase tracking-wider text-[#d7a53b]">
                          Paquete #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteEventPackage(idx)}
                          className="p-1.5 bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 rounded-lg transition"
                          title="Eliminar paquete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                            Título
                          </label>
                          <input
                            type="text"
                            value={pkg.title}
                            onChange={(e) => {
                              const currentPkgs = [...currentBrand.eventPackages];
                              currentPkgs[idx] = { ...currentPkgs[idx], title: e.target.value };
                              updateCurrentBrandField("eventPackages", currentPkgs);
                            }}
                            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                            Subtítulo
                          </label>
                          <input
                            type="text"
                            value={pkg.subtitle || ""}
                            placeholder="Ej. Cumpleaños y aniversarios"
                            onChange={(e) => {
                              const currentPkgs = [...currentBrand.eventPackages];
                              currentPkgs[idx] = { ...currentPkgs[idx], subtitle: e.target.value };
                              updateCurrentBrandField("eventPackages", currentPkgs);
                            }}
                            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                          Capacidad
                        </label>
                        <input
                          type="text"
                          value={pkg.capacity}
                          onChange={(e) => {
                            const currentPkgs = [...currentBrand.eventPackages];
                            currentPkgs[idx] = { ...currentPkgs[idx], capacity: e.target.value };
                            updateCurrentBrandField("eventPackages", currentPkgs);
                          }}
                          className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                          Descripción
                        </label>
                        <textarea
                          rows={2}
                          value={pkg.description}
                          onChange={(e) => {
                            const currentPkgs = [...currentBrand.eventPackages];
                            currentPkgs[idx] = { ...currentPkgs[idx], description: e.target.value };
                            updateCurrentBrandField("eventPackages", currentPkgs);
                          }}
                          className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                          Puntos Incluidos (1 por línea)
                        </label>
                        <textarea
                          rows={3}
                          value={(pkg.features || []).join("\n")}
                          placeholder="Menú de 3 tiempos&#10;Salón reservado&#10;Atención personalizada"
                          onChange={(e) => {
                            const features = e.target.value
                              .split("\n")
                              .filter((line) => line.trim().length > 0);
                            const currentPkgs = [...currentBrand.eventPackages];
                            currentPkgs[idx] = { ...currentPkgs[idx], features };
                            updateCurrentBrandField("eventPackages", currentPkgs);
                          }}
                          className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Directorio de Sucursales (Textos de Cabecera) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#006a34]" />
                  <span>Cabecera del Directorio de Sucursales ({currentBrand.name})</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Personaliza los textos del directorio telefónico y WhatsApp que aparece al pie de la página de contacto.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Badge del Directorio
                  </label>
                  <input
                    type="text"
                    value={currentBrand.contactConfig?.directoryBadge || ""}
                    placeholder="Directorio Telefónico y WhatsApp"
                    onChange={(e) =>
                      updateCurrentBrandField("contactConfig", {
                        ...(currentBrand.contactConfig || {}),
                        directoryBadge: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Título del Directorio
                  </label>
                  <input
                    type="text"
                    value={currentBrand.contactConfig?.directoryTitle || ""}
                    placeholder="Contacta a tu Sucursal Más Cercana"
                    onChange={(e) =>
                      updateCurrentBrandField("contactConfig", {
                        ...(currentBrand.contactConfig || {}),
                        directoryTitle: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Descripción del Directorio
                  </label>
                  <textarea
                    rows={2}
                    value={currentBrand.contactConfig?.directoryDescription || ""}
                    placeholder="Escribile directamente a los encargados de turno..."
                    onChange={(e) =>
                      updateCurrentBrandField("contactConfig", {
                        ...(currentBrand.contactConfig || {}),
                        directoryDescription: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: SEGURIDAD & CONTRASEÑA */}
        {activeTab === "security" && (
          <div className="max-w-xl mx-auto bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Seguridad del Administrador</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Cambia la clave maestra del panel seguro. Recuerda guardarla en un lugar seguro.
              </p>
            </div>

            <form onSubmit={handleSaveNewPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Contraseña Actual
                </label>
                <input
                  type="password"
                  value={currentPwInput}
                  onChange={(e) => setCurrentPwInput(e.target.value)}
                  placeholder="Introduce la clave actual"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={newPwInput}
                  onChange={(e) => setNewPwInput(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={confirmPwInput}
                  onChange={(e) => setConfirmPwInput(e.target.value)}
                  placeholder="Repite la nueva clave"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  required
                />
              </div>

              {pwChangeError && (
                <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{pwChangeError}</span>
                </div>
              )}

              {pwChangeSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>¡Contraseña actualizada exitosamente!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow flex items-center justify-center gap-2"
              >
                <Key className="w-4 h-4" />
                <span>Actualizar Contraseña Maestra</span>
              </button>
            </form>
          </div>
        )}
      </main>

      {/* --- MODAL: AGREGAR PLATILLO --- */}
      {showAddDishModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#d7a53b]" />
                <span>Agregar Platillo a {currentBrand.name}</span>
              </h3>
              <button
                onClick={() => setShowAddDishModal(false)}
                className="text-neutral-400 hover:text-white text-xs font-bold"
              >
                Cerrar
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Nombre del Platillo
                </label>
                <input
                  type="text"
                  value={newDishName}
                  onChange={(e) => setNewDishName(e.target.value)}
                  placeholder="Ej. Tagliatelle al Tartufo"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Categoría
                  </label>
                  <select
                    value={newDishCategory}
                    onChange={(e) => setNewDishCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  >
                    <option value="">Selecciona o escribe nueva</option>
                    {currentBrand.menuCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    O Nueva Categoría
                  </label>
                  <input
                    type="text"
                    value={newDishCustomCategory}
                    onChange={(e) => setNewDishCustomCategory(e.target.value)}
                    placeholder="Ej. Postres Caseros"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Precio (Q)
                  </label>
                  <input
                    type="number"
                    value={newDishPrice}
                    onChange={(e) => setNewDishPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Etiqueta (Badge)
                  </label>
                  <input
                    type="text"
                    value={newDishBadge}
                    onChange={(e) => setNewDishBadge(e.target.value)}
                    placeholder="Ej. Recomendado, Nuevo"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Descripción
                </label>
                <textarea
                  rows={2}
                  value={newDishDescription}
                  onChange={(e) => setNewDishDescription(e.target.value)}
                  placeholder="Detalla los ingredientes y preparación..."
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <ImageUploader
                  label="Foto del Platillo"
                  value={newDishImage}
                  onChange={(url) => setNewDishImage(url)}
                  previewHeight="h-32"
                />
              </div>

              <div className="flex items-center gap-4 pt-2 text-xs text-neutral-300">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newDishVegetarian}
                    onChange={(e) => setNewDishVegetarian(e.target.checked)}
                    className="rounded"
                  />
                  <span>Vegetariano 🌱</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newDishGlutenFree}
                    onChange={(e) => setNewDishGlutenFree(e.target.checked)}
                    className="rounded"
                  />
                  <span>Sin Gluten 🌾</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newDishSpicy}
                    onChange={(e) => setNewDishSpicy(e.target.checked)}
                    className="rounded"
                  />
                  <span>Picante 🌶️</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowAddDishModal(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleAddDish}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow"
                >
                  Guardar Platillo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: AGREGAR PROMOCIÓN --- */}
      {showAddPromoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#d7a53b]" />
                <span>Nueva Promoción en {currentBrand.name}</span>
              </h3>
              <button
                onClick={() => setShowAddPromoModal(false)}
                className="text-neutral-400 hover:text-white text-xs font-bold"
              >
                Cerrar
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Título de la Promoción
                </label>
                <input
                  type="text"
                  value={newPromoTitle}
                  onChange={(e) => setNewPromoTitle(e.target.value)}
                  placeholder="Ej. Jueves 2x1 en Pizzas de Horno"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Etiqueta / Badge
                  </label>
                  <input
                    type="text"
                    value={newPromoBadge}
                    onChange={(e) => setNewPromoBadge(e.target.value)}
                    placeholder="Ej. Oferta Especial"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Vigencia
                  </label>
                  <input
                    type="text"
                    value={newPromoValidUntil}
                    onChange={(e) => setNewPromoValidUntil(e.target.value)}
                    placeholder="Ej. Válido todo el mes"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Descripción de la Oferta
                </label>
                <textarea
                  rows={3}
                  value={newPromoDescription}
                  onChange={(e) => setNewPromoDescription(e.target.value)}
                  placeholder="Explica qué incluye la promoción y términos..."
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Texto Botón CTA
                  </label>
                  <input
                    type="text"
                    value={newPromoCtaText}
                    onChange={(e) => setNewPromoCtaText(e.target.value)}
                    placeholder="Ej. Aprovechar Promoción"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Mensaje WhatsApp Personalizado
                  </label>
                  <input
                    type="text"
                    value={newPromoCtaMessage}
                    onChange={(e) => setNewPromoCtaMessage(e.target.value)}
                    placeholder="Opcional: mensaje predefinido"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <ImageUploader
                  label="Afiche o Fotografía de la Promoción"
                  value={newPromoImage}
                  onChange={(url) => setNewPromoImage(url)}
                  previewHeight="h-32"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowAddPromoModal(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleAddPromotion}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow"
                >
                  Publicar Promoción
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: AGREGAR SALSA --- */}
      {showAddSauceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#006a34]" />
                <span>Nueva Salsa Artesanal Envasada</span>
              </h3>
              <button
                onClick={() => setShowAddSauceModal(false)}
                className="text-neutral-400 hover:text-white text-xs font-bold"
              >
                Cerrar
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Nombre de la Salsa
                </label>
                <input
                  type="text"
                  value={newSauceName}
                  onChange={(e) => setNewSauceName(e.target.value)}
                  placeholder="Ej. Salsa Pesto Genovese"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Precio (Q)
                  </label>
                  <input
                    type="number"
                    value={newSaucePrice}
                    onChange={(e) => setNewSaucePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Presentación / Peso
                  </label>
                  <input
                    type="text"
                    value={newSauceWeight}
                    onChange={(e) => setNewSauceWeight(e.target.value)}
                    placeholder="Ej. Frasco 350g"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Descripción
                </label>
                <textarea
                  rows={2}
                  value={newSauceDescription}
                  onChange={(e) => setNewSauceDescription(e.target.value)}
                  placeholder="Ingredientes naturales y sabor..."
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Etiqueta / Badge
                </label>
                <input
                  type="text"
                  value={newSauceBadge}
                  onChange={(e) => setNewSauceBadge(e.target.value)}
                  placeholder="Ej. Artesanal, Receta de la Nonna"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Ingredientes Principales
                </label>
                <input
                  type="text"
                  value={newSauceIngredients}
                  onChange={(e) => setNewSauceIngredients(e.target.value)}
                  placeholder="Ej. Tomates San Marzano, Albahaca, Aceite de Oliva"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Sugerencia de Maridaje
                </label>
                <input
                  type="text"
                  value={newSaucePairing}
                  onChange={(e) => setNewSaucePairing(e.target.value)}
                  placeholder="Ej. Ideal con Fettuccine o Focaccia caliente"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div>
                <ImageUploader
                  label="Foto del Frasco de Salsa"
                  value={newSauceImage}
                  onChange={(url) => setNewSauceImage(url)}
                  previewHeight="h-32"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowAddSauceModal(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleAddSauce}
                  className="px-5 py-2 bg-[#006a34] hover:bg-[#00552a] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow"
                >
                  Guardar Salsa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: AGREGAR SUCURSAL --- */}
      {showAddLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#e3252d]" />
                <span>Agregar Sucursal a {currentBrand.name}</span>
              </h3>
              <button
                onClick={() => setShowAddLocationModal(false)}
                className="text-neutral-400 hover:text-white text-xs font-bold"
              >
                Cerrar
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Nombre de la Sucursal
                </label>
                <input
                  type="text"
                  value={newLocName}
                  onChange={(e) => setNewLocName(e.target.value)}
                  placeholder="Ej. Mamma Roma - Fontabella"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Zona
                  </label>
                  <input
                    type="text"
                    value={newLocZone}
                    onChange={(e) => setNewLocZone(e.target.value)}
                    placeholder="Ej. Zona 10"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    value={newLocPhone}
                    onChange={(e) => setNewLocPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  value={newLocAddress}
                  onChange={(e) => setNewLocAddress(e.target.value)}
                  placeholder="Ej. 4a Avenida 12-59, Zona 10"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    WhatsApp Sucursal
                  </label>
                  <input
                    type="text"
                    value={newLocWhatsapp}
                    onChange={(e) => setNewLocWhatsapp(e.target.value)}
                    placeholder="50250175905"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Horarios
                  </label>
                  <input
                    type="text"
                    value={newLocHours}
                    onChange={(e) => setNewLocHours(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Enlace Google Maps
                  </label>
                  <input
                    type="text"
                    value={newLocMaps}
                    onChange={(e) => setNewLocMaps(e.target.value)}
                    placeholder="https://maps.google.com/..."
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Enlace Waze
                  </label>
                  <input
                    type="text"
                    value={newLocWaze}
                    onChange={(e) => setNewLocWaze(e.target.value)}
                    placeholder="https://waze.com/..."
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs focus:border-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <ImageUploader
                  label="Foto de la Sucursal (Opcional)"
                  value={newLocImage}
                  onChange={(url) => setNewLocImage(url)}
                  previewHeight="h-32"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowAddLocationModal(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleAddLocation}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow"
                >
                  Guardar Sucursal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: CAMBIO DE CONTRASEÑA --- */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-[#d7a53b]" />
                <span>Cambiar Contraseña de Acceso</span>
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-neutral-400 hover:text-white text-xs font-bold"
              >
                Cerrar
              </button>
            </div>

            <form onSubmit={handleSaveNewPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Contraseña Anterior
                </label>
                <input
                  type="password"
                  value={currentPwInput}
                  onChange={(e) => setCurrentPwInput(e.target.value)}
                  placeholder="Introduce la contraseña anterior"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={newPwInput}
                  onChange={(e) => setNewPwInput(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={confirmPwInput}
                  onChange={(e) => setConfirmPwInput(e.target.value)}
                  placeholder="Repite la nueva contraseña"
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:border-neutral-500 focus:outline-none"
                  required
                />
              </div>

              {pwChangeError && (
                <div className="p-2.5 bg-red-950/60 border border-red-800 rounded-xl text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{pwChangeError}</span>
                </div>
              )}

              {pwChangeSuccess && (
                <div className="p-2.5 bg-emerald-950/60 border border-emerald-800 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>¡Contraseña actualizada exitosamente!</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow"
                >
                  Guardar Nueva Clave
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
