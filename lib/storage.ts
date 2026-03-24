// Types
export interface Photo {
  id: string
  url: string
  category: string
  alt: string
  createdAt: string
}

export interface Event {
  id: string
  title: string
  date: string
  time: string
  description: string
  features: string[]
  featured: boolean
  image?: string
}

export interface Promotion {
  id: string
  title: string
  price: string
  unit: string
  description: string
  features: string[]
  featured: boolean
  active: boolean
}

// In-memory storage for local development
let localPhotos: Photo[] | null = null
let localEvents: Event[] | null = null
let localPromotions: Promotion[] | null = null

// Check if we're using Vercel KV or local storage
const useVercelKV = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)

// Dynamic import for Vercel KV (only when available)
async function getKV() {
  if (useVercelKV) {
    const { kv } = await import('@vercel/kv')
    return kv
  }
  return null
}

// Keys
const PHOTOS_KEY = 'photos'
const EVENTS_KEY = 'events'
const PROMOTIONS_KEY = 'promotions'

// Photos
export async function getPhotos(): Promise<Photo[]> {
  try {
    const kv = await getKV()
    if (kv) {
      const photos = await kv.get<Photo[]>(PHOTOS_KEY)
      return photos || getDefaultPhotos()
    }
    return localPhotos || getDefaultPhotos()
  } catch {
    return localPhotos || getDefaultPhotos()
  }
}

export async function addPhoto(photo: Photo): Promise<void> {
  const kv = await getKV()
  if (kv) {
    const photos = await getPhotos()
    photos.unshift(photo)
    await kv.set(PHOTOS_KEY, photos)
  } else {
    if (!localPhotos) {
      localPhotos = getDefaultPhotos()
    }
    localPhotos.unshift(photo)
  }
}

export async function deletePhoto(id: string): Promise<void> {
  const kv = await getKV()
  if (kv) {
    const photos = await getPhotos()
    const filtered = photos.filter(p => p.id !== id)
    await kv.set(PHOTOS_KEY, filtered)
  } else {
    if (!localPhotos) {
      localPhotos = getDefaultPhotos()
    }
    localPhotos = localPhotos.filter(p => p.id !== id)
  }
}

// Events
export async function getEvents(): Promise<Event[]> {
  try {
    const kv = await getKV()
    if (kv) {
      const events = await kv.get<Event[]>(EVENTS_KEY)
      return events || getDefaultEvents()
    }
    return localEvents || getDefaultEvents()
  } catch {
    return localEvents || getDefaultEvents()
  }
}

export async function saveEvents(events: Event[]): Promise<void> {
  const kv = await getKV()
  if (kv) {
    await kv.set(EVENTS_KEY, events)
  } else {
    localEvents = events
  }
}

export async function addEvent(event: Event): Promise<void> {
  const events = await getEvents()
  events.push(event)
  await saveEvents(events)
}

export async function updateEvent(event: Event): Promise<void> {
  const events = await getEvents()
  const index = events.findIndex(e => e.id === event.id)
  if (index !== -1) {
    events[index] = event
    await saveEvents(events)
  }
}

export async function deleteEvent(id: string): Promise<void> {
  const events = await getEvents()
  const filtered = events.filter(e => e.id !== id)
  await saveEvents(filtered)
}

// Promotions
export async function getPromotions(): Promise<Promotion[]> {
  try {
    const kv = await getKV()
    if (kv) {
      const promotions = await kv.get<Promotion[]>(PROMOTIONS_KEY)
      return promotions || getDefaultPromotions()
    }
    return localPromotions || getDefaultPromotions()
  } catch {
    return localPromotions || getDefaultPromotions()
  }
}

export async function savePromotions(promotions: Promotion[]): Promise<void> {
  const kv = await getKV()
  if (kv) {
    await kv.set(PROMOTIONS_KEY, promotions)
  } else {
    localPromotions = promotions
  }
}

export async function addPromotion(promotion: Promotion): Promise<void> {
  const promotions = await getPromotions()
  promotions.push(promotion)
  await savePromotions(promotions)
}

export async function updatePromotion(promotion: Promotion): Promise<void> {
  const promotions = await getPromotions()
  const index = promotions.findIndex(p => p.id === promotion.id)
  if (index !== -1) {
    promotions[index] = promotion
    await savePromotions(promotions)
  }
}

export async function deletePromotion(id: string): Promise<void> {
  const promotions = await getPromotions()
  const filtered = promotions.filter(p => p.id !== id)
  await savePromotions(filtered)
}

// Default data
function getDefaultEvents(): Event[] {
  return [
    {
      id: '1',
      title: 'Memorial Day Weekend Bash',
      date: 'May 24-26, 2025',
      time: '8 PM - 4 AM',
      description: 'Three nights of non-stop entertainment with 30+ dancers, drink specials, and VIP packages.',
      features: ['30+ Dancers', '$10 Dances', '$5 Domestic Beers', 'VIP Bottle Specials'],
      featured: true,
      image: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/7cac448a-4516-435c-a86d-b70c0db73010/tami-donaldson-sexy-patriot-2014-007.jpg',
    },
    {
      id: '2',
      title: '$10 Dance Nights',
      date: 'Every Monday & Tuesday',
      time: '9 PM - 3 AM',
      description: 'Start your week right with $10 dances all night long. The best deal in Chicagoland!',
      features: ['$10 Dances All Night', 'Drink Specials', 'Full Lineup'],
      featured: false,
      image: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/57491a75-b6fb-44e4-8fcd-75646dade413/%2410.2.jpg',
    },
    {
      id: '3',
      title: 'Thick Thursday',
      date: 'Every Thursday',
      time: '9 PM - 3 AM',
      description: 'Celebrating curves with our most requested entertainers. Special drink prices all night.',
      features: ['Themed Entertainment', '$3 Wells', 'No Cover Before 10 PM'],
      featured: false,
      image: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/bbf87e59-b9e6-4cd5-9169-60a9407413cd/15948330_xl.jpg',
    },
    {
      id: '4',
      title: 'Fantasy Friday',
      date: 'Every Friday',
      time: '9 PM - 4 AM',
      description: 'Start your weekend right with our premium Friday night experience.',
      features: ['Premium Lineup', 'VIP Specials', 'Late Night Hours'],
      featured: false,
      image: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/f36a7a05-9eb5-45ab-9b27-efe7a42a29bf/DSC04281-Edit.jpg',
    },
    {
      id: '5',
      title: 'Saturday Night Live',
      date: 'Every Saturday',
      time: '9 PM - 4 AM',
      description: 'Our biggest night of the week with the most dancers and the hottest entertainment.',
      features: ['Maximum Dancers', 'Champagne Room Deals', 'DJ All Night'],
      featured: false,
      image: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/ad009cc3-247a-4335-b6c3-6e39445eaba9/_Cinnamon+1.jpg',
    },
  ]
}

function getDefaultPromotions(): Promotion[] {
  return [
    {
      id: '1',
      title: 'Private Dance',
      price: '$10-15',
      unit: 'per song',
      description: 'Full contact, full friction private entertainment.',
      features: ['Full contact', 'Full friction', 'Private booth'],
      featured: false,
      active: true,
    },
    {
      id: '2',
      title: 'Body Slide',
      price: '$100',
      unit: '10 minutes',
      description: 'Our most popular VIP experience.',
      features: ['Intimate experience', 'Premium service', 'Private room'],
      featured: true,
      active: true,
    },
    {
      id: '3',
      title: 'Champagne Room',
      price: '$250+',
      unit: '30 minutes',
      description: 'The ultimate VIP experience with privacy and bottle service.',
      features: ['Ultimate privacy', 'VIP treatment', 'Bottle service included'],
      featured: false,
      active: true,
    },
  ]
}

function getDefaultPhotos(): Photo[] {
  return [
    // Venue Photos
    {
      id: 'v1',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/657287ff-ccb0-4e5b-9d5b-22cb2fcdb9bb/Club+Outside+night.png',
      category: 'venue',
      alt: 'Club Exterior Night',
      createdAt: '2024-01-01',
    },
    {
      id: 'v2',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/90dec6a5-f4e5-4254-891d-719585da7e93/Club.Interior+%281%29.jpg',
      category: 'venue',
      alt: 'Club Interior',
      createdAt: '2024-01-02',
    },
    {
      id: 'v3',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/ba1b4e2e-68ba-4e03-8ab6-ffc4f5fd7eac/Club.Bottle+Service.jpg',
      category: 'venue',
      alt: 'Bottle Service Area',
      createdAt: '2024-01-03',
    },
    // Dancer Photos
    {
      id: 'd1',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/bbf87e59-b9e6-4cd5-9169-60a9407413cd/15948330_xl.jpg',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-04',
    },
    {
      id: 'd2',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/73be230f-6ae2-4f3d-8a10-6a2c4d03e7ce/Photoroom_20251209_134627.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-05',
    },
    {
      id: 'd3',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/af3602fa-f47f-430b-b56e-69ff477740ce/5A264A2E-5037-4E52-99CD-422EE992B9E3.JPEG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-06',
    },
    {
      id: 'd4',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/9aea475b-7e64-4a8a-bba2-64b0ecd46c9a/6A4DA4F2-B514-4729-BCE8-C828583A893B.JPEG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-07',
    },
    {
      id: 'd5',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/e5381210-cea4-434e-8a54-94404ab852b2/4BCF5C00-0C0B-4315-9EBE-B0C2B1D9B6FF+%281%29.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-08',
    },
    {
      id: 'd6',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/8845f740-90c3-4509-b165-47d5c0413d73/IMG_6066.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-09',
    },
    {
      id: 'd7',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/c120973f-6d2b-4453-8da3-aad6847911b5/IMG_5196.jpg',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-10',
    },
    {
      id: 'd8',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/9036d79a-b2b8-4c10-b005-4846099df9cb/IMG_0942.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-11',
    },
    {
      id: 'd9',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/937c5db7-0033-487e-85e6-90ce7544f972/20251208_233730.jpg',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-12',
    },
    {
      id: 'd10',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/a6b785da-d6f0-4709-8f6f-dfe586cf6584/20251208_233750.jpg',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-13',
    },
    {
      id: 'd11',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/501ab682-0600-4566-a40f-f4aac09519a9/20251208_233936.jpg',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-14',
    },
    {
      id: 'd12',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/837e45e8-9e33-44a2-9137-fe37791bfabf/IMG_7040.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-15',
    },
    {
      id: 'd13',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/94f12b95-b3e7-4b6c-9f09-0dff66b9b5e8/IMG_6948.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-16',
    },
    {
      id: 'd14',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/f34a1aaf-6de7-4ecd-8238-4789972e1f3d/Photoroom_20240423_013422.jpg',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-17',
    },
    {
      id: 'd15',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/1dbcb25c-2aa2-4776-8218-ec65dfabe2a0/2445D175-37A9-42BD-BF0E-1AC0390DF37F.jpeg',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-18',
    },
    {
      id: 'd16',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/faba9f9e-1650-4432-8bbd-dae3a810be94/IMG_6913+%281%29.jpg',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-19',
    },
    {
      id: 'd17',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/67163835-00cc-46e9-81ff-2c3798cb7813/IMG_6916+%281%29.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-20',
    },
    {
      id: 'd18',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/201d8b01-9aa9-40b0-b2c7-91da66197af7/E146D930-F331-451D-8050-187141C0A661.JPEG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-21',
    },
    {
      id: 'd19',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/7fd757a4-fe02-4db2-b5f1-a661dac91c7e/IMG_3013.jpg',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-22',
    },
    {
      id: 'd20',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/6b85ad8c-ce96-4e36-9215-92b8ee5452dc/IMG_4426.jpg',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-23',
    },
    {
      id: 'd21',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/ef61e990-68df-4aaf-9292-6fdb8a309a06/BG-10.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-24',
    },
    {
      id: 'd22',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/f36a7a05-9eb5-45ab-9b27-efe7a42a29bf/DSC04281-Edit.jpg',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-25',
    },
    {
      id: 'd23',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/4fa0b548-120f-4b68-a550-763908a8417b/PhotoRoom_20230317_174012.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-26',
    },
    {
      id: 'd24',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/900a2d31-c2e0-49d0-acad-8218c56906a7/IMG_5349.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-27',
    },
    {
      id: 'd25',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/ad009cc3-247a-4335-b6c3-6e39445eaba9/_Cinnamon+1.jpg',
      category: 'dancers',
      alt: 'Cinnamon',
      createdAt: '2024-01-28',
    },
    {
      id: 'd26',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/2fc0551c-fc45-49bd-a491-58bc2f762aad/IMG_5123.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-29',
    },
    {
      id: 'd27',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/2c021f45-f3bd-4110-b920-3c710869a64e/IMG_4159.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-30',
    },
    {
      id: 'd28',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/d6c77942-b1c4-4d6c-be55-387ea7174af7/IMG_6192.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-01-31',
    },
    {
      id: 'd29',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/7f2e06aa-b811-475e-9d40-18be9aba34ec/IMGL0557.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-02-01',
    },
    {
      id: 'd30',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/249dda9d-f583-4954-bd14-9cb56f29407d/IMG_0964.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-02-02',
    },
    {
      id: 'd31',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/f441bf1a-d933-46e4-b0e0-9ef69da7ab77/C0AC90C4-9295-46F7-AF79-313A753D6A3F.JPEG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-02-03',
    },
    {
      id: 'd32',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/22050af6-72fc-4e2d-8e0b-924db4b9ecf6/IMG_4262.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-02-04',
    },
    {
      id: 'd33',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/d189a09a-70b0-4d00-853b-21bd5baf1878/IMG_3278.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-02-05',
    },
    {
      id: 'd34',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/9b7265a6-68f4-4b5a-8674-9d1d422a43da/IMG_2476+%281%29.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-02-06',
    },
    {
      id: 'd35',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/511f1628-3993-4e70-ba74-200c8043a1ba/IMG_3067.jpg',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-02-07',
    },
    {
      id: 'd36',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/c0d16c5d-d51a-4cd0-812b-d553e63fd163/IMGL0507+%281%29.JPG',
      category: 'dancers',
      alt: 'Entertainment',
      createdAt: '2024-02-08',
    },
    // Events / Promotional
    {
      id: 'e1',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/60c9e5df-acf9-4a35-8117-0d0883bcf0f2/Haloween2-300.jpg',
      category: 'events',
      alt: 'Halloween Event',
      createdAt: '2024-02-09',
    },
    {
      id: 'e2',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/7cac448a-4516-435c-a86d-b70c0db73010/tami-donaldson-sexy-patriot-2014-007.jpg',
      category: 'events',
      alt: 'Patriotic Event',
      createdAt: '2024-02-10',
    },
    {
      id: 'e3',
      url: 'https://images.squarespace-cdn.com/content/v1/68d2e14604d18c6447a49cc5/96bde73c-fdeb-42df-8790-66705130ba74/sexy-football-twins-jt-photodesign-canvas-print.jpg',
      category: 'events',
      alt: 'Football Night',
      createdAt: '2024-02-11',
    },
  ]
}
