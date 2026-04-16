export default function getProducts() {
  return [
    {
      id: "p1",
      image: "/images/products/p1.png",
      title: "Colombian Single Origin – Huila Region",
      category: "Filter",
      description: "Smooth and balanced with floral sweetness and crisp acidity.",
      moreInfo: {
        origin: "Huila, Colombia",
        roast: "Medium",
        tastingNotes: "Floral, caramel, citrus",
        process: "Washed"
      },
      price: 8.50, // 250g
      inStock: true,
      sales: 1200 
    },

    {
      id: "p2",
      image: "/images/products/p2.png",
      title: "Ethiopian Yirgacheffe – Light Floral Roast",
      category: "Filter",
      description: "Bright citrus notes with jasmine aroma, ideal for filter brews.",
      moreInfo: {
        origin: "Yirgacheffe, Ethiopia",
        roast: "Light",
        tastingNotes: "Jasmine, lemon zest, peach",
        process: "Washed"
      },
      price: 9.50,
      inStock: false,
      sales: 850
    },

    {
      id: "p3",
      image: "/images/products/p3.png",
      title: "Brazil Santos – Smooth Chocolate Roast",
      category: "Filter",
      description: "Nutty, chocolate‑forward profile with a smooth, comforting body.",
      moreInfo: {
        origin: "Minas Gerais, Brazil",
        roast: "Medium",
        tastingNotes: "Milk chocolate, hazelnut, brown sugar",
        process: "Natural"
      },
      price: 7.99,
      inStock: true,
      sales: 1500
    },

    {
      id: "p4",
      image: "/images/products/p4.png",
      title: "Kenya AA – Bold & Fruity",
      category: "Filter",
      description: "Vibrant cup with wine‑like acidity and juicy berry notes.",
      moreInfo: {
        origin: "Nyeri, Kenya",
        roast: "Medium‑Dark",
        tastingNotes: "Blackcurrant, plum, red wine",
        process: "Washed"
        
      },
      price: 10.50,
      inStock: true,
      sales: 900
    },

    {
      id: "p5",
      image: "/images/products/p5.png",
      title: "Guatemala Antigua – Cocoa & Spice",
      category: "Filter",
      description: "Rich cocoa notes with a warm, spicy finish and balanced body.",
      moreInfo: {
        origin: "Antigua, Guatemala",
        roast: "Medium",
        tastingNotes: "Cocoa, cinnamon, toffee",
        process: "Washed"
      },
      price: 9.25,
      inStock: true,
      sales: 1100
    },

    {
      id: "p6",
      image: "/images/products/turkish-coffee-768x768.png",
      title: "Sumatra Mandheling – Earthy Dark Roast",
      category: "Espresso",
      description: "Full‑bodied, earthy, and low‑acidity — ideal for strong brews.",
      moreInfo: {
        origin: "Sumatra, Indonesia",
        roast: "Dark",
        tastingNotes: "Earthy, dark chocolate, cedar",
        process: "Wet‑hulled"
      },
      price: 9.99,
      inStock: true,
      sales: 1300
    },

    {
      id: "p7",
      image: "/images/products/decafwinter.png",
      title: "Costa Rica Tarrazú – Clean & Bright",
      category: "Filter",
      description: "Crisp and refreshing with citrus brightness and a clean finish.",
      moreInfo: {
        origin: "Tarrazú, Costa Rica",
        roast: "Medium",
        tastingNotes: "Orange, honey, almond",
        process: "Washed",
        
      },
      price: 8.99,
      inStock: true,
      sales: 950
    },

    {
      id: "p8",
      image: "/images/products/6.png",
      title: "House Blend – Everyday Comfort",
      category: "blend",
      description: "A balanced blend with smooth chocolate and nutty undertones.",
      moreInfo: {
        origin: "Brazil & Colombia",
        roast: "Medium",
        tastingNotes: "Chocolate, walnut, caramel",
        process: "Blend",
        
      },
      price: 7.50,
      inStock: true,
      sales: 2000
    },

    {
      id: "p9",
      image: "/images/products/7.png",
      title: "Espresso Roast – Rich & Bold",
       category: "Espresso",
      description: "Crafted for a thick crema and intense espresso flavour.",
      moreInfo: {
        origin: "Brazil & Sumatra",
        roast: "Dark",
        tastingNotes: "Dark chocolate, molasses, smoky",
        process: "Blend",
       
      },
      price: 8.25,
      inStock: true,
      sales: 1800
    },

    {
      id: "p10",
      image: "/images/products/8.png",
      title: "Decaf Swiss Water – Chemical‑Free",
      category: "Decaf",
      description: "Smooth, rich decaf processed naturally without chemicals.",
      moreInfo: {
        origin: "Latin America",
        roast: "Medium",
        tastingNotes: "Chocolate, caramel, mild fruit",
        process: "Swiss Water"
      },
      price: 7.99,
      inStock: false,
      sales: 500
    },

    {
      id: "p11",
      image: "/images/products/9.png",
      title: "Mocha Java Blend – Classic Heritage",
      category: "blend",
      description: "Historic blend combining chocolate richness with fruity brightness.",
      moreInfo: {
        origin: "Yemen & Indonesia",
        roast: "Medium‑Dark",
        tastingNotes: "Cocoa, berry, spice",
        process: "Blend"
      },
      price: 9.50,
      inStock: false,
      sales: 750
    },

    {
      id: "p12",
      image: "/images/products/10.png",
      title: "Holiday Special Blend – Seasonal Spice",
      category: "blend",
      description: "Festive blend with warming spices, cocoa sweetness, and a cosy finish.",
      moreInfo: {
        origin: "Guatemala & Ethiopia",
        roast: "Medium",
        tastingNotes: "Cinnamon, cocoa, dried fruit",
        process: "Blend"
      },
      price: 10.00,
      inStock: true,
      sales: 600
    }
  ];
}
