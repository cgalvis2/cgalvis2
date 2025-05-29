"use client"

import { getProductImage } from "./product-images"

interface Product {
  style: string
  name: string
  sizes: string
  control: string
  retail: number
  disc65: number
  disc70: number
  disc73: number
}

interface CustomerInfo {
  businessName: string
  contactName: string
  email: string
  phone: string
  address: string
  notes: string
}

export function generatePDF(products: Product[], customerInfo: CustomerInfo) {
  // Create a new window for the PDF content
  const printWindow = window.open("", "_blank")

  if (!printWindow) {
    alert("Please allow popups to download the PDF")
    return
  }

  const currentDate = new Date().toLocaleDateString()

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Vedette Wholesale Price List 2025</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          font-size: 12px;
          line-height: 1.4;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #8B5CF6;
          padding-bottom: 20px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #8B5CF6;
          margin-bottom: 5px;
        }
        .subtitle {
          font-size: 18px;
          color: #666;
          margin-bottom: 10px;
        }
        .customer-info {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .customer-info h3 {
          margin: 0 0 10px 0;
          color: #8B5CF6;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .contact-info {
          margin-bottom: 20px;
          font-size: 11px;
        }
        .terms-section {
          background: #f0f9ff;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .terms-section h3 {
          margin: 0 0 10px 0;
          color: #0369a1;
        }
        .discount-tiers {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 15px;
          margin-bottom: 15px;
        }
        .tier {
          text-align: center;
          padding: 10px;
          background: white;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
        }
        .tier-title {
          font-weight: bold;
          color: #8B5CF6;
          margin-bottom: 5px;
        }
        .tier-min {
          font-size: 10px;
          color: #666;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 10px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #8B5CF6;
          color: white;
          font-weight: bold;
          text-align: center;
        }
        .style-col { width: 8%; text-align: center; font-weight: bold; }
        .name-col { width: 35%; }
        .size-col { width: 12%; text-align: center; }
        .control-col { width: 12%; text-align: center; }
        .price-col { width: 8%; text-align: center; }
        .retail-price { color: #dc2626; font-weight: bold; }
        .wholesale-price { color: #059669; font-weight: bold; }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 10px;
          color: #666;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .footer h4 {
          color: #8B5CF6;
          margin: 0 0 10px 0;
        }
        .important-notes {
          background: #fef3c7;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          border-left: 4px solid #f59e0b;
        }
        .important-notes h3 {
          margin: 0 0 10px 0;
          color: #92400e;
        }
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Vedette Shapewear</div>
        <div class="subtitle">Wholesale Price List 2025</div>
        <div style="font-size: 12px; color: #666;">Generated on ${currentDate}</div>
      </div>

      ${
        customerInfo.businessName || customerInfo.contactName
          ? `
      <div class="customer-info">
        <h3>Customer Information</h3>
        <div class="info-grid">
          <div><strong>Business:</strong> ${customerInfo.businessName || "N/A"}</div>
          <div><strong>Contact:</strong> ${customerInfo.contactName || "N/A"}</div>
          <div><strong>Email:</strong> ${customerInfo.email || "N/A"}</div>
          <div><strong>Phone:</strong> ${customerInfo.phone || "N/A"}</div>
        </div>
        ${customerInfo.address ? `<div style="margin-top: 10px;"><strong>Address:</strong> ${customerInfo.address}</div>` : ""}
        ${customerInfo.notes ? `<div style="margin-top: 10px;"><strong>Notes:</strong> ${customerInfo.notes}</div>` : ""}
      </div>
      `
          : ""
      }

      <div class="terms-section">
        <h3>Wholesale Discount Tiers</h3>
        <div class="discount-tiers">
          <div class="tier">
            <div class="tier-title">65% Discount</div>
            <div class="tier-min">Min. Order: $400 USD</div>
          </div>
          <div class="tier">
            <div class="tier-title">70% Discount</div>
            <div class="tier-min">Min. Order: $2,000 USD</div>
          </div>
          <div class="tier">
            <div class="tier-title">73% Discount</div>
            <div class="tier-min">Premium Wholesale Tier</div>
          </div>
        </div>
      </div>

      <div class="important-notes">
        <h3>Important Notes</h3>
        <ul style="margin: 0; padding-left: 20px;">
          <li>Garments that run in sizes from 4XL and up carry an additional charge of $1.00 USD per garment</li>
          <li>Same day shipping if received before 12PM EST</li>
          <li>Delivery time: 3-5 business days</li>
          <li>All sales are final. No returns accepted</li>
          <li>Georgia residents must pay 7% sales tax</li>
        </ul>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 10%;">Image</th>
            <th class="style-col">Style</th>
            <th class="name-col">Product Name</th>
            <th class="size-col">Sizes</th>
            <th class="control-col">Control</th>
            <th class="price-col">Retail Price</th>
            <th class="price-col">65% Disc</th>
            <th class="price-col">70% Disc</th>
            <th class="price-col">73% Disc</th>
          </tr>
        </thead>
        <tbody>
          ${products
            .map(
              (product) => `
            <tr>
              <td style="text-align: center; padding: 4px;">
                <div style="width: 40px; height: 40px; background: #f3f4f6; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #6b7280; margin: 0 auto; background-image: url('${getProductImage(product.style)}'); background-size: cover; background-position: center;">
                  ${!getProductImage(product.style).includes("placeholder") ? "" : product.style}
                </div>
              </td>
              <td class="style-col">${product.style}</td>
              <td class="name-col">${product.name}</td>
              <td class="size-col">${product.sizes}</td>
              <td class="control-col">${product.control}</td>
              <td class="price-col retail-price">$${product.retail.toFixed(2)}</td>
              <td class="price-col wholesale-price">$${product.disc65.toFixed(2)}</td>
              <td class="price-col wholesale-price">$${product.disc70.toFixed(2)}</td>
              <td class="price-col wholesale-price">$${product.disc73.toFixed(2)}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>

      <div class="footer">
        <div class="footer-grid">
          <div>
            <h4>Contact Information</h4>
            <p><strong>Address:</strong> 501 Lakeside Drive, Williamson, GA 30292</p>
            <p><strong>Phone:</strong> (770) 412-9385</p>
            <p><strong>WhatsApp:</strong> (470) 332-6026</p>
            <p><strong>Email:</strong> orders.usa@vedettecorp.com</p>
            <p><strong>Website:</strong> www.vedettestore.com</p>
          </div>
          <div>
            <h4>Payment & Shipping</h4>
            <p><strong>Accepted Payments:</strong> Visa, Mastercard, American Express, Discover, Money Orders</p>
            <p><strong>International Shipping:</strong> Standard rates apply. Confirm before shipping via email or WhatsApp</p>
            <p style="margin-top: 15px; font-style: italic;">© 2025 Orion Manufacturing Inc. All rights reserved.<br>Vedette™ is a registered trademark.</p>
          </div>
        </div>
      </div>

      <div class="no-print" style="text-align: center; margin-top: 30px;">
        <button onclick="window.print()" style="background: #8B5CF6; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 14px;">Print PDF</button>
        <button onclick="window.close()" style="background: #6b7280; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 14px; margin-left: 10px;">Close</button>
      </div>
    </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()

  // Auto-print after a short delay to ensure content is loaded
  setTimeout(() => {
    printWindow.print()
  }, 500)
}
