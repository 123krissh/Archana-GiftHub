const products = [
        {
          name: "Customized Love Collage Frame",
          description: "A unique personalized collage frame with multiple photo slots to capture your special moments. High-quality wooden frame with a smooth finish.",
          price: 499.99,
          discountPrice: 299.99,
          countInStock: 250,
          sku: "COL-FRM-001",
          category: "Collage Photo Frame",
          sizes: ["12x12", "15x18", "18x24"],
          collections: "Gift",
          material: "Premium Wood Fibre",
          images: [
            {
              url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
              altText: "Collage photo frame with multiple slots",
            },
            {
              url: "https://picsum.photos/500/500?random=40",
              altText: "Custom collage frame with love theme",
            }
          ],
          rating: 4.8,
          numReviews: 20
        },
        {
          name: "Personalized Wooden Photo Frame",
          description: "Beautiful wooden photo frame with engraved name and special message. Perfect for birthdays and anniversaries.",
          price: 399.99,
          discountPrice: 249.99,
          countInStock: 180,
          sku: "PWF-002",
          category: "Photo Frame",
          sizes: ["10x12", "12x15", "15x18"],
          collections: "Gift",
          material: "Engraved Wood",
          images: [
            {
              url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
              altText: "Engraved wooden photo frame",
            },
            {
              url: "https://picsum.photos/500/500?random=40",
              altText: "Customized wooden frame with personal engraving",
            }
          ],
          rating: 4.7,
          numReviews: 15
        },
        {
          name: "Customized Mug with Photo",
          description: "Personalized ceramic mug with your favorite photo and custom message. Ideal for gifting on special occasions.",
          price: 199.99,
          discountPrice: 99.99,
          countInStock: 500,
          sku: "MUG-CUS-003",
          category: "Customized Cup",
          sizes: ["12+12", "15+18", "12+18", "15+19"],
          collections: "Gift",
          material: "Ceramic",
          images: [
            {
              url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
              altText: "Personalized ceramic mug with photo",
            },
            {
              url: "https://picsum.photos/500/500?random=40",
              altText: "Custom mug with print",
            }
          ],
          rating: 4.6,
          numReviews: 25
        },
        {
          name: "Customized Pillow with Name & Photo",
          description: "Soft and comfortable pillow with a customized print of your name and photo. A perfect home decor item and gift.",
          price: 299.99,
          discountPrice: 149.99,
          countInStock: 400,
          sku: "PIL-CUS-004",
          category: "Customized Pillow",
          sizes: ["16x16", "18x18"],
          collections: "Gift",
          material: "Soft Fabric",
          images: [
            {
              url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
              altText: "Customized pillow with photo",
            },
            {
              url: "https://picsum.photos/500/500?random=40",
              altText: "Personalized cushion gift",
            }
          ],
          rating: 4.9,
          numReviews: 30
        },
        {
            name: "Personalized Collage Frame",
            description: "A collage photo frame with space for 8 images, designed to capture precious memories. Crafted with premium wood fiber and a sleek finish.",
            price: 899.99,
            discountPrice: 549.99,
            countInStock: 100,
            sku: "COLLAGE-002",
            category: "Collage Photo Frame",
            sizes: ["12x12", "18x24"],
            collections: "Gift",
            material: "Premium Wood",
            images: [
                {
                    url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
                    altText: "Personalized Collage Frame"
                }
            ],
            rating: 4.7,
            numReviews: 1
        },
        {
            name: "Customized LED Photo Frame",
            description: "Beautiful LED-lit photo frame for nightstands or desks. Adds a warm glow to your personalized memories. USB-powered for easy use.",
            price: 1199.99,
            discountPrice: 799.99,
            countInStock: 80,
            sku: "LED-FRAME-003",
            category: "Customized Frame",
            sizes: ["10x10", "12x15"],
            collections: "Gift",
            material: "Acrylic & LED",
            images: [
                {
                    url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
                    altText: "Customized LED Photo Frame"
                }
            ],
            rating: 4.9,
            numReviews: 30
        },
        {
            name: "Personalized Magic Mug",
            description: "Heat-sensitive mug that reveals a hidden picture when hot liquid is poured inside. A fun and unique gift for any occasion.",
            price: 399.99,
            discountPrice: 249.99,
            countInStock: 200,
            sku: "MAGIC-CUP-004",
            category: "Customized Cup",
            sizes: ["Standard"],
            collections: "Gift",
            material: "Ceramic",
            images: [
                {
                    url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
                    altText: "Personalized Magic Mug"
                }
            ],
            rating: 4.6,
            numReviews: 15
        },
        {
            name: "Customized Heart Pillow",
            description: "Soft heart-shaped pillow with a custom photo print. A perfect gift for loved ones, made from premium fabric.",
            price: 599.99,
            discountPrice: 349.99,
            countInStock: 130,
            sku: "HEART-PILLOW-005",
            category: "Pillow with Customization",
            sizes: ["12x12", "16x16"],
            collections: "Gift",
            material: "Soft Plush Fabric",
            images: [
                {
                    url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
                    altText: "Customized Heart Pillow"
                }
            ],
            rating: 4.8,
            numReviews: 20
        },
        {
            name: "3D Crystal Engraved Photo",
            description: "3D laser-engraved crystal with your photo inside. A unique and elegant gift for any occasion.",
            price: 1499.99,
            discountPrice: 999.99,
            countInStock: 75,
            sku: "CRYSTAL-008",
            category: "Customized Gifts",
            sizes: ["Small", "Medium", "Large"],
            collections: "Gift",
            material: "High-Quality Crystal",
            images: [
                {
                    url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
                    altText: "3D Crystal Engraved Photo"
                }
            ],
            rating: 4.9,
            numReviews: 35
        }, 
        {
            name: "Personalized Wooden Photo Frame",
            description:
              "Handcrafted wooden photo frame with your custom image engraved. A perfect keepsake gift for anniversaries, birthdays, or special occasions.",
            price: 499.99,
            discountPrice: 299.99,
            countInStock: 150,
            sku: "CUS-WOOD-001",
            category: "Customized Frame",
            sizes: ["8x10", "10x12", "12x15"],
            collections: "Gift",
            material: "Premium Pine Wood",
            images: [
              {
                url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
                altText: "Personalized wooden photo frame",
              },
              {
                url: "https://picsum.photos/500/500?random=41",
                altText: "Engraved wooden frame with heart shape",
              },
            ],
            rating: 4.8,
            numReviews: 25,
          },
          {
            name: "Customized Magic Mug",
            description:
              "Heat-sensitive magic mug that reveals your custom image when filled with hot liquid. A fun and unique gift for coffee lovers.",
            price: 249.99,
            discountPrice: 149.99,
            countInStock: 200,
            sku: "CUS-MUG-002",
            category: "Customized Cup",
            sizes: ["Standard"],
            collections: "Gift",
            material: "Ceramic",
            images: [
              {
                url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
                altText: "Customized magic mug",
              },
              {
                url: "https://picsum.photos/500/500?random=42",
                altText: "Magic mug before and after heat exposure",
              },
            ],
            rating: 4.7,
            numReviews: 30,
          },
          {
            name: "Personalized LED Collage Frame",
            description:
              "A beautiful LED collage frame that lights up with your favorite pictures. Ideal for home decor and gifting.",
            price: 799.99,
            discountPrice: 549.99,
            countInStock: 80,
            sku: "LED-COLLAGE-003",
            category: "Collage Photo Frame",
            sizes: ["12x18", "15x20", "18x24"],
            collections: "Gift",
            material: "Acrylic & LED",
            images: [
              {
                url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
                altText: "LED collage photo frame",
              },
              {
                url: "https://picsum.photos/500/500?random=43",
                altText: "Lit-up LED collage with multiple photos",
              },
            ],
            rating: 4.9,
            numReviews: 18,
          },
          {
            name: "Customized Pillow with Photo Print",
            description:
              "Soft and comfortable pillow with a high-quality custom photo print. Perfect for gifting on birthdays, anniversaries, and Valentine's Day.",
            price: 399.99,
            discountPrice: 279.99,
            countInStock: 120,
            sku: "CUS-PILLOW-004",
            category: "Customized Pillow",
            sizes: ["16x16", "18x18", "20x20"],
            collections: "Gift",
            material: "Polyester & Cotton Blend",
            images: [
              {
                url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
                altText: "Customized pillow with printed photo",
              },
              {
                url: "https://picsum.photos/500/500?random=44",
                altText: "Soft pillow with heart design",
              },
            ],
            rating: 4.6,
            numReviews: 22,
          },
          {
            name: "Customized 3D Moon Lamp",
            description:
              "A unique 3D moon lamp customized with your photo or message. Creates a warm and romantic atmosphere in any room.",
            price: 1299.99,
            discountPrice: 999.99,
            countInStock: 50,
            sku: "CUS-MOON-006",
            category: "Customized Lamp",
            sizes: ["Small", "Medium", "Large"],
            collections: "Gift",
            material: "PLA Plastic",
            images: [
              {
                url: "https://giftsbyrashi.com/wp-content/uploads/2023/05/Heart-Photo-Frame.webp",
                altText: "Personalized 3D moon lamp",
              },
              {
                url: "https://picsum.photos/500/500?random=46",
                altText: "Glowing moon lamp with photo print",
              },
            ],
            rating: 4.9,
            numReviews: 15,
          }
];

module.exports = products;