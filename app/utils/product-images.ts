// Updated product images to use local files from the public directory
// This ensures reliable access and faster loading times

export const productImages: Record<string, string> = {
  // Waist Cinchers & Trainers
  "100": "/images/products/100.png", // Renee Underbust Waist Cincher
  "100A": "/images/products/100A.png", // Renee Underbust Full Back Waist Cincher
  "103": "/images/products/103.png", // Valerie Extra Firm Waist Trainer
  "5079": "/images/products/5079.png", // Valerie Waist Cincher (3 Rows)
  "5080": "/images/products/5080.png", // Extra Firm 3 Rows Latex Waist Cincher Vest
  "348": "/images/products/348.png", // Sport Waist Trainer
  "400": "/images/products/400.png", // Underbust Waist Cincher Vest w/ Zipper
  "403": "/images/products/403.png", // Gigi Zipper Girdle

  // Full Body Shapers
  "104": "/images/products/104.png", // Extra Firm Control Full Body Shaper
  "117": "/images/products/117.png", // Alyssa Full Body Suit
  "350": "/images/products/350.png", // High Back Full Body Shaper
  "938": "/images/products/938.png", // Full Body Suit w/ Front Closure & Back Support
  "944": "/images/products/944.png", // Full Body Suit Mid-Thigh w/zipper & Lace
  "945": "/images/products/945.png", // Open Bust Mid-Thigh Bodysuit w/ Zipper
  "3132": "/images/products/3132.png", // Full Body Shapewear w/side closure
  "5126": "/images/products/5126.png", // Open-Bust Full Body Shapewear
  "5145": "/images/products/5145.png", // Full Body Mid-Thigh Shaper w/ arm comp.
  "5147": "/images/products/5147.png", // Full Body Mid Thigh Shapewear

  // Bodysuits
  "105": "/images/products/105.png", // Lea Body Briefer
  "107": "/images/products/107.png", // Evonne Extra Firm Underbust Bodysuit
  "111": "/images/products/111.png", // Evonne Extra Firm Underbust Bodysuit Thong
  "123": "/images/products/123.png", // Lilian Hip-Hugging Bodysuit
  "136": "/images/products/136.png", // Megane Boyshort Bodysuit
  "138": "/images/products/138.png", // Salma High-back Underbust Body Shaper
  "170": "/images/products/170.png", // Daisy Body Shaper
  "196": "/images/products/196.png", // Elastic Band Under-Bust Bodysuit
  "5162": "/images/products/5162.png", // Classic Under Bust Bodysuit
  "5173": "/images/products/5173.png", // Mid Thigh Hook & Eye Bodysuit
  "936": "/images/products/936.png", // Open Bust Boyshort Bodysuit w/wide straps
  "5170": "/images/products/5170.png", // Boy-short Bodysuit w/buttlifter

  // Shorts & Panties
  "160": "/images/products/160.png", // Natasha Mid Thigh Panty
  "203": "/images/products/203.png", // Butt Lifter Panty Short
  "210": "/images/products/210.png", // Nadine Bodysuit Panty
  "211": "/images/products/211.png", // Nadine Bodysuit (Thong Back)
  "506": "/images/products/506.png", // Dana Panty Boyshort
  "5114": "/images/products/5114.png", // Open Bust Mid-Thigh Shaper w/ Flat Front
  "5115": "/images/products/5115.png", // Butt Lifter Shaper short
  "5148": "/images/products/5148.png", // High Waist Short Strong Compression Shaper
  "5164": "/images/products/5164.png", // High Waist Short Firm Compression Shaper
  "5172": "/images/products/5172.png", // Mid Thigh Hook & Eye High Waist Short

  // Other Products
  "5163": "/images/products/5163.png", // Post-Surgery Front Closure Bra
  "5165": "/images/products/5165.png", // High-Performance Shaper Legging
}

export const getProductImage = (style: string): string => {
  return productImages[style] || `/placeholder.svg?height=300&width=300&text=Style+${style}&bg=8B5CF6&textColor=white`
}
