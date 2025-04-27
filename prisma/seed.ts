import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting database seeding...")

  // Create categories
  console.log("Creating categories...")
  const paintings = await prisma.category.upsert({
    where: { name: "Paintings" },
    update: {},
    create: {
      name: "Paintings",
      description: "Traditional and contemporary paintings from across Africa",
      imageUrl: "/images/categories/paintings.jpg",
    },
  })

  const sculptures = await prisma.category.upsert({
    where: { name: "Sculptures" },
    update: {},
    create: {
      name: "Sculptures",
      description: "Handcrafted sculptures in wood, metal, and stone",
      imageUrl: "/images/categories/sculptures.jpg",
    },
  })

  const textiles = await prisma.category.upsert({
    where: { name: "Textiles" },
    update: {},
    create: {
      name: "Textiles",
      description: "Traditional fabrics and contemporary textile art",
      imageUrl: "/images/categories/textiles.jpg",
    },
  })

  const photography = await prisma.category.upsert({
    where: { name: "Photography" },
    update: {},
    create: {
      name: "Photography",
      description: "Captivating images from African photographers",
      imageUrl: "/images/categories/photography.jpg",
    },
  })

  // Create users and artists
  console.log("Creating users and artists...")

  // User 1 - Amara Okafor
  const user1 = await prisma.user.upsert({
    where: { email: "amara@example.com" },
    update: {},
    create: {
      clerkId: "user_example_1",
      name: "Amara Okafor",
      email: "amara@example.com",
      role: "ARTIST",
    },
  })

  const artist1 = await prisma.artist.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      name: "Amara Okafor",
      profileImageUrl: "/images/artists/amara.jpg",
      location: "Lagos, Nigeria",
      shortBio:
        "Contemporary artist exploring the intersection of traditional African symbolism and modern urban life.",
      fullBio: `Amara Okafor is a contemporary artist whose work explores the intersection of traditional African symbolism and modern urban life. Born and raised in Lagos, Nigeria, Amara's artistic journey began at an early age when she would sketch scenes from the bustling markets and streets of her hometown.

After studying Fine Arts at the University of Lagos, Amara honed her skills through residencies in Senegal, South Africa, and briefly in Paris. Her work has been exhibited in galleries across Africa and Europe.

Amara's paintings are characterized by vibrant colors, bold patterns, and a seamless blend of traditional motifs with contemporary themes. Through her art, she addresses issues of identity, heritage, and social change, inviting viewers to reconsider their perceptions of African culture in the modern world.`,
      featured: true,
      socialLinks: {
        website: "https://amaraokafor.example.com",
        instagram: "https://instagram.com/amaraokafor",
        twitter: "https://twitter.com/amaraokafor",
      },
    },
  })

  // User 2 - Emmanuel Kwesi
  const user2 = await prisma.user.upsert({
    where: { email: "emmanuel@example.com" },
    update: {},
    create: {
      clerkId: "user_example_2",
      name: "Emmanuel Kwesi",
      email: "emmanuel@example.com",
      role: "ARTIST",
    },
  })

  const artist2 = await prisma.artist.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      userId: user2.id,
      name: "Emmanuel Kwesi",
      profileImageUrl: "/images/artists/emmanuel.jpg",
      location: "Accra, Ghana",
      shortBio:
        "Sculptor working primarily with reclaimed wood and metal to create pieces that reflect Ghana's rich cultural heritage.",
      fullBio: `Emmanuel Kwesi is a renowned sculptor from Accra, Ghana, whose work primarily focuses on reclaimed wood and metal. His artistic journey began in his grandfather's workshop, where he learned traditional woodcarving techniques passed down through generations.

Emmanuel's sculptures are deeply rooted in Ghanaian cultural heritage, often incorporating symbols from Adinkra and other traditional iconography. However, his approach is distinctly contemporary, addressing modern social and environmental issues through his choice of materials and themes.

After completing his formal education at the Kwame Nkrumah University of Science and Technology, Emmanuel established his studio in Accra, where he creates both large-scale public installations and smaller gallery pieces. His work has been featured in exhibitions across West Africa, Europe, and North America.

Through his art, Emmanuel seeks to preserve traditional craftsmanship while engaging with contemporary discourse on sustainability, cultural identity, and the rapid urbanization of African cities.`,
      featured: true,
      socialLinks: {
        website: "https://emmanuelkwesi.example.com",
        instagram: "https://instagram.com/emmanuelkwesi",
      },
    },
  })

  // User 3 - Zainab Musa
  const user3 = await prisma.user.upsert({
    where: { email: "zainab@example.com" },
    update: {},
    create: {
      clerkId: "user_example_3",
      name: "Zainab Musa",
      email: "zainab@example.com",
      role: "ARTIST",
    },
  })

  const artist3 = await prisma.artist.upsert({
    where: { userId: user3.id },
    update: {},
    create: {
      userId: user3.id,
      name: "Zainab Musa",
      profileImageUrl: "/images/artists/zainab.jpg",
      location: "Nairobi, Kenya",
      shortBio: "Textile artist combining traditional East African techniques with contemporary design.",
      fullBio: `Zainab Musa is a textile artist based in Nairobi, Kenya, whose work beautifully combines traditional East African techniques with contemporary design sensibilities. Born into a family with deep roots in textile trading, Zainab developed an early appreciation for the rich textile traditions of the region.

After studying Textile Design at the University of Nairobi and later completing a master's degree in Fine Arts at Central Saint Martins in London, Zainab returned to Kenya to establish her studio. Her work is characterized by intricate patterns, bold color combinations, and innovative applications of traditional techniques such as kanga and kitenge.

Zainab's textiles have been featured in fashion collections, interior design projects, and art exhibitions globally. She is particularly known for her large-scale textile installations that transform spaces and challenge viewers to reconsider the boundaries between craft, design, and fine art.

Through her practice, Zainab explores themes of female empowerment, cultural preservation, and the evolving nature of African identity in a globalized world. She also runs workshops to pass on traditional techniques to younger generations, ensuring these cultural practices continue to thrive and evolve.`,
      featured: false,
      socialLinks: {
        website: "https://zainabmusa.example.com",
        instagram: "https://instagram.com/zainabmusa",
        twitter: "https://twitter.com/zainabmusa",
      },
    },
  })

  // Create artworks
  console.log("Creating artworks...")

  // Artworks by Amara
  const artwork1 = await prisma.artwork.upsert({
    where: { id: "artwork1" },
    update: {},
    create: {
      id: "artwork1",
      title: "Serengeti Sunset",
      description: `"Serengeti Sunset" captures the breathtaking beauty of the African savanna at dusk. The painting depicts the silhouettes of acacia trees and wildlife against a vibrant sky of oranges, reds, and purples. The piece is a celebration of Africa's natural beauty and the magical moment when day transitions to night on the plains.

The layered application of paint creates depth and texture, inviting viewers to feel the warmth of the setting sun and the peaceful energy of the landscape. Traditional patterns subtly integrated into the sky and land connect the natural scene to cultural heritage.

This artwork is part of my "African Horizons" series, which explores the diverse landscapes of the continent and their spiritual significance in various cultures.`,
      artistId: artist1.id,
      imageUrl: "/images/artworks/serengeti-sunset.jpg",
      additionalImages: [
        "/images/artworks/serengeti-sunset-detail1.jpg",
        "/images/artworks/serengeti-sunset-detail2.jpg",
      ],
      price: 1200,
      dimensions: {
        height: 90,
        width: 120,
        unit: "cm",
      },
      medium: "Oil on canvas",
      categoryId: paintings.id,
      year: 2022,
      available: true,
      featured: true,
    },
  })

  const artwork2 = await prisma.artwork.upsert({
    where: { id: "artwork2" },
    update: {},
    create: {
      id: "artwork2",
      title: "Urban Rhythms",
      description: `"Urban Rhythms" is a vibrant exploration of contemporary African city life. This mixed media painting combines acrylic, collage elements from newspapers, and traditional fabric patterns to create a dynamic representation of the energy and complexity of urban environments across Africa.

The composition features abstracted cityscapes with recognizable elements such as market scenes, transportation networks, and architectural details that blend traditional and modern influences. The rhythmic arrangement of shapes and patterns echoes the musical heritage that permeates daily life in these bustling urban centers.

Through this piece, I aim to capture the pulse of Africa's rapidly evolving cities - spaces where tradition and innovation coexist and create new cultural expressions. The artwork celebrates the resilience and creativity of urban communities navigating the challenges and opportunities of contemporary life.`,
      artistId: artist1.id,
      imageUrl: "/images/artworks/urban-rhythms.jpg",
      additionalImages: [],
      price: 950,
      dimensions: {
        height: 80,
        width: 100,
        unit: "cm",
      },
      medium: "Mixed media on canvas",
      categoryId: paintings.id,
      year: 2023,
      available: true,
      featured: false,
    },
  })

  // Artworks by Emmanuel
  const artwork3 = await prisma.artwork.upsert({
    where: { id: "artwork3" },
    update: {},
    create: {
      id: "artwork3",
      title: "Ancestral Wisdom",
      description: `"Ancestral Wisdom" is a sculptural piece carved from a single piece of reclaimed iroko wood, a material deeply significant in West African woodworking traditions. Standing at 150 cm tall, this sculpture depicts an abstracted elder figure whose form incorporates traditional Adinkra symbols representing wisdom, knowledge, and the passing of heritage through generations.

The wood's natural grain and coloration have been preserved and enhanced through traditional techniques, creating variations in tone that highlight the carved symbols and textures. The figure's posture - slightly bent forward with outstretched hands - represents the act of sharing knowledge and experience with younger generations.

This piece is part of my ongoing exploration of how traditional knowledge systems remain relevant in contemporary African societies. The use of reclaimed wood speaks to themes of sustainability and renewal, suggesting that wisdom, like materials, can be repurposed and given new life in changing contexts.`,
      artistId: artist2.id,
      imageUrl: "/images/artworks/ancestral-wisdom.jpg",
      additionalImages: ["/images/artworks/ancestral-wisdom-detail1.jpg"],
      price: 1500,
      dimensions: {
        height: 150,
        width: 40,
        depth: 30,
        unit: "cm",
      },
      medium: "Carved iroko wood",
      categoryId: sculptures.id,
      year: 2021,
      available: true,
      featured: true,
    },
  })

  const artwork4 = await prisma.artwork.upsert({
    where: { id: "artwork4" },
    update: {},
    create: {
      id: "artwork4",
      title: "Market Day",
      description: `"Market Day" is a dynamic metal sculpture that captures the vibrant energy of West African markets. Created from welded reclaimed metal pieces - including bicycle parts, cooking utensils, and mechanical components - this piece transforms discarded materials into a celebration of community commerce and interaction.

The sculpture depicts five abstracted figures arranged in a circular formation, each engaged in different market activities: selling, buying, negotiating, carrying goods, and socializing. The negative space between the figures is as important as the metal itself, representing the relationships and exchanges that make markets central to community life.

The varied patinas and textures of the different metal components have been preserved, creating a rich visual tapestry that echoes the diversity found in traditional marketplaces. When light passes through the sculpture, it casts intricate shadows that change throughout the day, adding another dimension to the piece.

Through this work, I explore themes of sustainability, community resilience, and the continued importance of traditional trading spaces in an increasingly digital world.`,
      artistId: artist2.id,
      imageUrl: "/images/artworks/market-day.jpg",
      additionalImages: [],
      price: 1800,
      dimensions: {
        height: 60,
        width: 80,
        depth: 40,
        unit: "cm",
      },
      medium: "Welded reclaimed metal",
      categoryId: sculptures.id,
      year: 2022,
      available: false,
      featured: false,
    },
  })

  // Artworks by Zainab
  const artwork5 = await prisma.artwork.upsert({
    where: { id: "artwork5" },
    update: {},
    create: {
      id: "artwork5",
      title: "Heritage Threads",
      description: `"Heritage Threads" is a large-scale textile artwork that combines traditional East African weaving techniques with contemporary design elements. The piece features hand-dyed cotton and silk threads in a palette of indigo blues, earth tones, and vibrant accents of orange and yellow.

The composition is based on traditional Maasai patterns but reimagined through a contemporary lens, with areas of dense pattern work contrasted with more minimal, open sections. The weaving incorporates subtle variations in texture through the use of different thread weights and weaving tensions.

This piece is designed to be displayed as a wall hanging, though its semi-transparent nature also makes it effective as a room divider where light can filter through the varied densities of the weave. The artwork explores the concept of cultural heritage as something both structured and fluid, defined yet adaptable.

"Heritage Threads" is part of my ongoing exploration of how traditional textile techniques can be preserved and evolved for contemporary contexts, creating a dialogue between past and present artistic practices.`,
      artistId: artist3.id,
      imageUrl: "/images/artworks/heritage-threads.jpg",
      additionalImages: [
        "/images/artworks/heritage-threads-detail1.jpg",
        "/images/artworks/heritage-threads-detail2.jpg",
      ],
      price: 2200,
      dimensions: {
        height: 180,
        width: 120,
        unit: "cm",
      },
      medium: "Hand-woven cotton and silk",
      categoryId: textiles.id,
      year: 2023,
      available: true,
      featured: true,
    },
  })

  const artwork6 = await prisma.artwork.upsert({
    where: { id: "artwork6" },
    update: {},
    create: {
      id: "artwork6",
      title: "Modern Kanga",
      description: `"Modern Kanga" reimagines the traditional East African kanga cloth for contemporary contexts. This textile piece maintains the traditional rectangular format and border design of kanga cloth but introduces modern elements through both technique and imagery.

The fabric is hand-printed using a combination of traditional woodblock printing and modern screen printing techniques. The design incorporates traditional motifs alongside symbols of contemporary African life, creating a visual narrative about the evolution of cultural identity. The central motif features an abstracted baobab tree whose branches transform into urban skylines.

As with traditional kanga, this piece includes a proverb in Swahili, screen-printed along the border: "Mizizi yetu, matawi yetu" (Our roots, our branches), reflecting the theme of cultural continuity and growth.

The color palette honors traditional kanga colors with deep indigo blue as the base, accented with vibrant red and yellow, but introduces gradient effects that would not be possible with traditional dyeing methods.

This artwork can function as a wall hanging, a table covering, or worn as a traditional kanga, embodying the versatility that has made these textiles central to East African material culture.`,
      artistId: artist3.id,
      imageUrl: "/images/artworks/modern-kanga.jpg",
      additionalImages: [],
      price: 850,
      dimensions: {
        height: 150,
        width: 100,
        unit: "cm",
      },
      medium: "Hand-printed cotton",
      categoryId: textiles.id,
      year: 2022,
      available: true,
      featured: false,
    },
  })

  // Create inquiries
  console.log("Creating inquiries...")

  const inquiry1 = await prisma.inquiry.create({
    data: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      message: `Hello,

I recently visited your gallery online and was immediately drawn to "Serengeti Sunset" by Amara Okafor. The colors and composition are absolutely stunning.

I'm interested in purchasing this piece for my home office, which has warm earth tones that I think would complement the artwork beautifully. Before making a decision, I'd like to know if you offer international shipping to Canada, and if there are any additional costs involved.

Also, could you provide some information about the artist? I'd love to learn more about Amara's background and artistic journey.

Thank you for your assistance.

Best regards,
Sarah`,
      artworkId: artwork1.id,
      status: "PENDING",
    },
  })

  const inquiry2 = await prisma.inquiry.create({
    data: {
      name: "Michael Chen",
      email: "michael.chen@example.com",
      message: `Hi there,

I'm writing to inquire about "Ancestral Wisdom" by Emmanuel Kwesi. I'm an interior designer working on a project for a client who is looking for authentic African art pieces for their new home.

This sculpture would be perfect for the entryway we're designing. Could you provide more details about the piece, particularly its exact dimensions and weight? Also, is it possible to arrange a video call to see the piece from different angles?

My client is particularly interested in the story behind the artwork and the symbolism incorporated into the design. Any additional information you could share would be greatly appreciated.

Thank you,
Michael Chen
Principal Designer, Chen Interiors`,
      artworkId: artwork3.id,
      status: "RESPONDED",
    },
  })

  const inquiry3 = await prisma.inquiry.create({
    data: {
      name: "Priya Patel",
      email: "priya.patel@example.com",
      message: `Hello ArtAfrik Team,

I'm reaching out to inquire about commissioning a piece similar to "Heritage Threads" by Zainab Musa. I absolutely love her work and the way she combines traditional techniques with contemporary design.

I'm looking for a textile piece for my living room wall (approximately 200cm x 150cm) and would like to discuss the possibility of a custom commission with similar techniques but perhaps with a color palette that includes more greens and blues to match my space.

Is this something that would be possible? If so, what would be the process, timeline, and approximate cost range?

I look forward to hearing from you.

Best,
Priya`,
      artworkId: artwork5.id,
      status: "CLOSED",
    },
  })

  const inquiry4 = await prisma.inquiry.create({
    data: {
      name: "David Oyelowo",
      email: "david.oyelowo@example.com",
      message: `Good day,

I'm writing to express my interest in potentially featuring some of your artists in an upcoming exhibition I'm curating at the Contemporary African Art Fair in London next spring.

I'm particularly impressed by the work of Emmanuel Kwesi and Amara Okafor, and would like to discuss the possibility of including their pieces in our showcase of "Innovation in Traditional Forms."

Could you put me in touch with these artists or their representatives to discuss this opportunity further? I would also appreciate any information about other artists in your gallery who work at the intersection of traditional techniques and contemporary themes.

Thank you for your consideration.

Regards,
David Oyelowo
Curator, Contemporary African Art Fair`,
      status: "PENDING",
    },
  })

  console.log("Database seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("Error during database seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
