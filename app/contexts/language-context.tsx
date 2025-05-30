"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    "header.title": "Vedette Shapewear",
    "header.subtitle": "Wholesale Price List 2025",
    "header.refresh": "Refresh",
    "header.debug": "Debug",
    "header.hideDebug": "Hide Debug",
    "header.imageDebug": "Image Debug",
    "header.dbCheck": "DB Check",
    "header.testImages": "Test Images",

    // Loading and errors
    "loading.products": "Loading products...",
    "loading.images": "Loading product images...",
    "error.title": "Error",
    "error.noProducts": "No products found. Please check your database connection.",
    "error.loadFailed": "Failed to load products. Please try again later.",

    // Hero Section
    "hero.title": "Premium Shapewear for Your Business",
    "hero.description":
      "Discover our comprehensive collection of high-quality shapewear with competitive wholesale pricing. Build your inventory with trusted products that deliver exceptional results for your customers.",
    "hero.premiumQuality": "Premium Quality",
    "hero.trustedBrand": "Trusted Brand",
    "hero.fastShipping": "Fast Shipping",

    // Wholesale Terms
    "terms.title": "Wholesale Terms & Benefits",
    "terms.discount65": "65% Discount",
    "terms.discount70": "70% Discount",
    "terms.discount73": "73% Discount",
    "terms.minOrder400": "Minimum Order: $400 USD",
    "terms.minOrder2000": "Minimum Order: $2,000 USD",
    "terms.premiumTier": "Premium Wholesale Tier",
    "terms.desc65": "Perfect for small retailers and boutiques starting their shapewear collection.",
    "terms.desc70": "Ideal for established retailers looking to expand their inventory with better margins.",
    "terms.desc73": "Maximum savings for high-volume retailers and distributors.",

    // Customer Info Form
    "customer.title": "Customer Information",
    "customer.description": "Please provide your business details to customize your price list",
    "customer.businessName": "Business Name",
    "customer.contactName": "Contact Name",
    "customer.email": "Email",
    "customer.phone": "Phone",
    "customer.address": "Business Address",
    "customer.notes": "Additional Notes",
    "customer.businessNamePlaceholder": "Your Business Name",
    "customer.contactNamePlaceholder": "Your Name",
    "customer.emailPlaceholder": "your@email.com",
    "customer.phonePlaceholder": "(555) 123-4567",
    "customer.addressPlaceholder": "123 Business St, City, State 12345",
    "customer.notesPlaceholder": "Any specific requirements or questions...",

    // Product List
    "products.title": "Product Catalog",
    "products.downloadFull": "Download Full Catalog",
    "products.downloadSelected": "Download Selected",
    "products.noProducts": "No Products Available",
    "products.noProductsDesc":
      "We're having trouble loading the product catalog. Please try again later or contact support if the issue persists.",
    "products.saveUpTo": "Save up to",
    "products.clickToZoom": "Click to zoom",

    // Contact Section
    "contact.title": "Contact Information",
    "contact.address": "Address",
    "contact.phone": "Phone",
    "contact.whatsapp": "WhatsApp",
    "contact.email": "Email",
    "contact.paymentShipping": "Payment & Shipping",
    "contact.acceptedPayments": "Accepted Payments",
    "contact.acceptedPaymentsDesc": "Visa, Mastercard, American Express, Discover, Money Orders",
    "contact.shipping": "Shipping",
    "contact.shippingDesc1": "Same day shipping if received before 12PM EST",
    "contact.shippingDesc2": "Delivery: 3-5 business days",
    "contact.copyright": "© 2025 Orion Manufacturing Inc. All rights reserved. Vedette™ is a registered trademark.",

    // Product Features
    "features.latexMaterial": "Latex Material",
    "features.zipperClosure": "Zipper Closure",
    "features.hookEye": "Hook & Eye",
    "features.postSurgery": "Post-Surgery",
    "features.sportDesign": "Sport Design",
    "features.extraFirm": "Extra-Firm",

    // Categories
    "category.waistTraining": "Waist Training",
    "category.fullBody": "Full Body",
    "category.bodysuit": "Bodysuit",
    "category.buttLifter": "Butt Lifter",
    "category.shorts": "Shorts",
    "category.supportBra": "Support Bra",
    "category.leggings": "Leggings",

    // Control levels
    "control.extraFirm": "Extra-Firm",
    "control.firm": "Firm",
    "control.medium": "Medium",
    "control.light": "Light",

    // PDF Generation
    "pdf.title": "Vedette Wholesale Price List 2025",
    "pdf.generatedOn": "Generated on",
    "pdf.customerInfo": "Customer Information",
    "pdf.business": "Business",
    "pdf.contact": "Contact",
    "pdf.discountTiers": "Wholesale Discount Tiers",
    "pdf.importantNotes": "Important Notes",
    "pdf.note1": "Garments that run in sizes from 4XL and up carry an additional charge of $1.00 USD per garment",
    "pdf.note2": "Same day shipping if received before 12PM EST",
    "pdf.note3": "Delivery time: 3-5 business days",
    "pdf.note4": "All sales are final. No returns accepted",
    "pdf.note5": "Georgia residents must pay 7% sales tax",
    "pdf.image": "Image",
    "pdf.style": "Style",
    "pdf.productName": "Product Name",
    "pdf.sizes": "Sizes",
    "pdf.control": "Control",
    "pdf.retailPrice": "Retail Price",
    "pdf.print": "Print PDF",
    "pdf.close": "Close",
    "pdf.internationalShipping":
      "International Shipping: Standard rates apply. Confirm before shipping via email or WhatsApp",

    // Navigation
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.openMenu": "Open main menu",
    "nav.closeMenu": "Close main menu",
  },
  es: {
    // Header
    "header.title": "Vedette Shapewear",
    "header.subtitle": "Lista de Precios Mayorista 2025",
    "header.refresh": "Actualizar",
    "header.debug": "Depurar",
    "header.hideDebug": "Ocultar Depuración",
    "header.imageDebug": "Depurar Imágenes",
    "header.dbCheck": "Verificar BD",
    "header.testImages": "Probar Imágenes",

    // Loading and errors
    "loading.products": "Cargando productos...",
    "loading.images": "Cargando imágenes de productos...",
    "error.title": "Error",
    "error.noProducts": "No se encontraron productos. Por favor verifique su conexión a la base de datos.",
    "error.loadFailed": "Error al cargar productos. Por favor intente más tarde.",

    // Hero Section
    "hero.title": "Ropa Moldeadora Premium para su Negocio",
    "hero.description":
      "Descubra nuestra colección completa de ropa moldeadora de alta calidad con precios mayoristas competitivos. Construya su inventario con productos confiables que brindan resultados excepcionales para sus clientes.",
    "hero.premiumQuality": "Calidad Premium",
    "hero.trustedBrand": "Marca Confiable",
    "hero.fastShipping": "Envío Rápido",

    // Wholesale Terms
    "terms.title": "Términos y Beneficios Mayoristas",
    "terms.discount65": "65% de Descuento",
    "terms.discount70": "70% de Descuento",
    "terms.discount73": "73% de Descuento",
    "terms.minOrder400": "Pedido Mínimo: $400 USD",
    "terms.minOrder2000": "Pedido Mínimo: $2,000 USD",
    "terms.premiumTier": "Nivel Mayorista Premium",
    "terms.desc65": "Perfecto para pequeños minoristas y boutiques que inician su colección de ropa moldeadora.",
    "terms.desc70": "Ideal para minoristas establecidos que buscan expandir su inventario con mejores márgenes.",
    "terms.desc73": "Máximo ahorro para minoristas de alto volumen y distribuidores.",

    // Customer Info Form
    "customer.title": "Información del Cliente",
    "customer.description": "Por favor proporcione los detalles de su negocio para personalizar su lista de precios",
    "customer.businessName": "Nombre del Negocio",
    "customer.contactName": "Nombre de Contacto",
    "customer.email": "Correo Electrónico",
    "customer.phone": "Teléfono",
    "customer.address": "Dirección del Negocio",
    "customer.notes": "Notas Adicionales",
    "customer.businessNamePlaceholder": "Nombre de su Negocio",
    "customer.contactNamePlaceholder": "Su Nombre",
    "customer.emailPlaceholder": "su@correo.com",
    "customer.phonePlaceholder": "(555) 123-4567",
    "customer.addressPlaceholder": "123 Calle Negocio, Ciudad, Estado 12345",
    "customer.notesPlaceholder": "Cualquier requisito específico o preguntas...",

    // Product List
    "products.title": "Catálogo de Productos",
    "products.downloadFull": "Descargar Catálogo Completo",
    "products.downloadSelected": "Descargar Seleccionados",
    "products.noProducts": "No Hay Productos Disponibles",
    "products.noProductsDesc":
      "Tenemos problemas cargando el catálogo de productos. Por favor intente más tarde o contacte soporte si el problema persiste.",
    "products.saveUpTo": "Ahorre hasta",
    "products.clickToZoom": "Clic para ampliar",

    // Contact Section
    "contact.title": "Información de Contacto",
    "contact.address": "Dirección",
    "contact.phone": "Teléfono",
    "contact.whatsapp": "WhatsApp",
    "contact.email": "Correo Electrónico",
    "contact.paymentShipping": "Pago y Envío",
    "contact.acceptedPayments": "Pagos Aceptados",
    "contact.acceptedPaymentsDesc": "Visa, Mastercard, American Express, Discover, Giros Postales",
    "contact.shipping": "Envío",
    "contact.shippingDesc1": "Envío el mismo día si se recibe antes de las 12PM EST",
    "contact.shippingDesc2": "Entrega: 3-5 días hábiles",
    "contact.copyright":
      "© 2025 Orion Manufacturing Inc. Todos los derechos reservados. Vedette™ es una marca registrada.",

    // Product Features
    "features.latexMaterial": "Material de Látex",
    "features.zipperClosure": "Cierre de Cremallera",
    "features.hookEye": "Ganchos y Ojales",
    "features.postSurgery": "Post-Cirugía",
    "features.sportDesign": "Diseño Deportivo",
    "features.extraFirm": "Extra-Firme",

    // Categories
    "category.waistTraining": "Entrenamiento de Cintura",
    "category.fullBody": "Cuerpo Completo",
    "category.bodysuit": "Body",
    "category.buttLifter": "Levanta Cola",
    "category.shorts": "Shorts",
    "category.supportBra": "Sostén de Soporte",
    "category.leggings": "Leggings",

    // Control levels
    "control.extraFirm": "Extra-Firme",
    "control.firm": "Firme",
    "control.medium": "Medio",
    "control.light": "Ligero",

    // PDF Generation
    "pdf.title": "Lista de Precios Mayorista Vedette 2025",
    "pdf.generatedOn": "Generado el",
    "pdf.customerInfo": "Información del Cliente",
    "pdf.business": "Negocio",
    "pdf.contact": "Contacto",
    "pdf.discountTiers": "Niveles de Descuento Mayorista",
    "pdf.importantNotes": "Notas Importantes",
    "pdf.note1":
      "Las prendas que van en tallas desde 4XL en adelante tienen un cargo adicional de $1.00 USD por prenda",
    "pdf.note2": "Envío el mismo día si se recibe antes de las 12PM EST",
    "pdf.note3": "Tiempo de entrega: 3-5 días hábiles",
    "pdf.note4": "Todas las ventas son finales. No se aceptan devoluciones",
    "pdf.note5": "Los residentes de Georgia deben pagar 7% de impuesto sobre las ventas",
    "pdf.image": "Imagen",
    "pdf.style": "Estilo",
    "pdf.productName": "Nombre del Producto",
    "pdf.sizes": "Tallas",
    "pdf.control": "Control",
    "pdf.retailPrice": "Precio al Detalle",
    "pdf.print": "Imprimir PDF",
    "pdf.close": "Cerrar",
    "pdf.internationalShipping":
      "Envío Internacional: Se aplican tarifas estándar. Confirmar antes del envío por correo electrónico o WhatsApp",

    // Navigation
    "nav.home": "Inicio",
    "nav.products": "Productos",
    "nav.about": "Acerca de",
    "nav.contact": "Contacto",
    "nav.openMenu": "Abrir menú principal",
    "nav.closeMenu": "Cerrar menú principal",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
