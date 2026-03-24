# Industrial Strip Website

A modern, luxurious website for Industrial Strip gentlemen's club built with Next.js 14, featuring a full admin panel for managing photos, events, and promotions.

## Features

- **Public Pages**: Home, Events, Gallery, The Bar, Jobs, Contact
- **Dark & Luxurious Design**: Black/gold theme with elegant typography
- **Admin Dashboard**: Password-protected admin area at `/admin`
- **Photo Management**: Upload and organize gallery photos by category
- **Event Management**: Create, edit, and feature events
- **Promotion Management**: Manage VIP packages and specials
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Free Hosting**: Designed for Vercel's free tier

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: Vercel KV (Redis)
- **Image Storage**: Vercel Blob
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- A Vercel account (free)

### Local Development

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

3. Generate a NextAuth secret:
   ```bash
   openssl rand -base64 32
   ```
   Add this to your `.env.local` as `NEXTAUTH_SECRET`

4. For local development without Vercel services, the site will work with default data. To use the full features, set up Vercel KV and Blob (see Deployment section).

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

### Default Admin Login

- **Username**: `admin`
- **Password**: `changeme123`

⚠️ **Important**: Change this password before deploying to production!

## Deployment to Vercel

### 1. Push to GitHub

Create a new repository and push your code.

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository

### 3. Set Up Storage (Required)

#### Vercel KV (Database)
1. In your Vercel dashboard, go to Storage
2. Create a new KV database
3. Connect it to your project
4. The environment variables will be added automatically

#### Vercel Blob (Image Storage)
1. In Storage, create a new Blob store
2. Connect it to your project
3. The `BLOB_READ_WRITE_TOKEN` will be added automatically

### 4. Configure Environment Variables

In your Vercel project settings, add:

```
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=https://your-domain.vercel.app
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-bcrypt-hash
```

To generate a password hash:
```bash
npx bcryptjs hash "your-secure-password"
```

### 5. Deploy

Vercel will automatically deploy on push. Your site will be live at `your-project.vercel.app`.

## Admin Panel Usage

### Accessing the Admin Panel

1. Go to `/admin` on your site
2. Log in with your credentials

### Managing Photos

1. Navigate to Photos in the sidebar
2. Select a category (Venue, Dancers, Events)
3. Drag and drop or click to upload images
4. Click on photos to select, then delete selected

### Managing Events

1. Navigate to Events in the sidebar
2. Click "Add Event" to create new events
3. Mark events as "Featured" to highlight them
4. Events appear on the public Events page

### Managing Promotions

1. Navigate to Promotions in the sidebar
2. Add VIP packages with pricing and features
3. Toggle "Active" to show/hide on the website
4. Mark as "Featured" to highlight on homepage

## Customization

### Changing Colors

Edit `tailwind.config.js` to modify the color scheme:

```js
colors: {
  gold: {
    500: '#d4af37', // Main gold color
    // ...
  },
  luxury: {
    black: '#0a0a0a',
    // ...
  }
}
```

### Updating Logo

Replace the logo URL in:
- `components/Navigation.tsx`
- `components/Footer.tsx`
- `components/AdminLayout.tsx`
- `app/admin/login/page.tsx`

### Updating Contact Info

Edit the contact information in:
- `components/Footer.tsx`
- `app/contact/page.tsx`

## File Structure

```
├── app/
│   ├── admin/           # Admin pages
│   ├── api/             # API routes
│   ├── bar/             # The Bar page
│   ├── contact/         # Contact page
│   ├── events/          # Events page
│   ├── gallery/         # Gallery page
│   ├── jobs/            # Jobs page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/          # React components
├── lib/                 # Utilities (auth, storage)
└── public/              # Static assets
```

## Support

For issues or questions, please open an issue on GitHub.

## License

Private - All rights reserved.
