# TikTok Downloader - Tải Video TikTok Không Logo

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

## English

A web application that allows users to download TikTok videos without watermarks, supporting multiple formats and video qualities.

### 🌟 Features

- **No Watermark Downloads**: Download original TikTok videos without watermarks
- **Multiple Formats**: Support for HD, SD, audio, and image downloads
- **Modern UI**: Responsive design with Tailwind CSS and Radix UI
- **Auto Detection**: Automatic device type detection (mobile/desktop)
- **Direct Downloads**: Direct file download to device
- **Internationalization**: Multi-language support with next-international
- **SEO Optimized**: Schema markup and meta tags for SEO

### 🚀 Tech Stack

#### Frontend
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library
- **React Hook Form** - Form handling
- **Zod** - Schema validation

#### Backend & Database
- **Next.js API Routes** - Server-side API endpoints
- **Drizzle ORM** - Database ORM
- **Multiple Database Support**:
  - PostgreSQL (Vercel Postgres, Neon, PlanetScale)
  - SQLite (Better SQLite3, Bun SQLite)
  - MySQL (MySQL2)
  - MongoDB
  - TiDB Cloud

#### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

### 📦 Installation

#### System Requirements
- Node.js 18+
- npm, yarn, or pnpm

#### Step 1: Clone repository
```bash
git clone <repository-url>
cd savetik-main
```

#### Step 2: Install dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn install

# Or using pnpm (recommended)
pnpm install
```

#### Step 3: Environment configuration
Create `.env.local` file in the root directory:

```env
# Database Configuration (choose one of the options)
DATABASE_URL="your_database_url"

# Next.js Configuration
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# API Keys (if needed)
TIKTOK_API_KEY="your_tiktok_api_key"
```

#### Step 4: Run the application
```bash
# Development mode
npm run dev
# or
yarn dev
# or
pnpm dev

# Build production
npm run build
npm start

# Lint code
npm run lint
```

The application will run at `http://localhost:3000`

### 🏗️ Project Structure

```
savetik-main/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   │   ├── tiktok/        # TikTok download API
│   │   ├── force-download/ # File download API
│   │   └── ...
│   ├── [locale]/          # Internationalization routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── atoms/            # Atomic design - atoms
│   ├── molecules/        # Atomic design - molecules
│   ├── organisms/        # Atomic design - organisms
│   ├── templates/        # Page templates
│   ├── ui/               # Reusable UI components
│   └── ...
├── hooks/                # Custom React hooks
│   └── use-tiktok-downloader.ts
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
├── styles/               # Additional styles
├── public/               # Static assets
└── ...
```

### 🔧 API Endpoints

#### POST `/api/tiktok`
Download TikTok video information

**Request Body:**
```json
{
  "url": "https://www.tiktok.com/@username/video/1234567890"
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "id": "video_id",
    "title": "Video title",
    "author": "Author name",
    "hd": "https://video-url-hd.mp4",
    "sd": "https://video-url-sd.mp4",
    "music": "https://audio-url.mp3",
    "image": "https://thumbnail-url.jpg"
  }
}
```

#### POST `/api/force-download`
Download file to device

**Request Body:**
```json
{
  "url": "https://video-url.mp4",
  "filename": "tiktok_video.mp4"
}
```

### 🎨 Components

#### Atomic Design Structure

- **Atoms**: Basic building blocks (buttons, inputs, icons)
- **Molecules**: Simple combinations of atoms (search form, feature card)
- **Organisms**: Complex UI sections (header, hero section, results section)
- **Templates**: Page layouts (home layout)
- **Pages**: Complete pages with data

#### Key Components

- `AppHeader`: Header with logo and language switcher
- `HeroSection`: Hero section with title and description
- `SearchForm`: TikTok video search form
- `ResultsSection`: Display video results and download options
- `FeaturesSection`: Feature introduction
- `HowToSection`: Usage instructions

### 🎯 How to Use

1. **Enter TikTok URL**: Copy TikTok video link from app or website
2. **Paste into form**: Paste URL into search field
3. **Click download**: System will analyze and display download options
4. **Choose format**: Select desired video quality (HD/SD/Audio)
5. **Download**: Click download button to save file to device

### 🔒 Security

- Use HTTPS for all API calls
- Validate input URLs to prevent XSS attacks
- Rate limiting for API endpoints
- Sanitize file names before download

### 🌐 Deployment

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### 📝 License

This project is distributed under the MIT License. See `LICENSE` file for details.

### ⚠️ Disclaimer

This project is for educational and research purposes only. Users must comply with TikTok's terms of service and local laws. We are not responsible for misuse.

### 🙏 Acknowledgments

- [TikTok](https://www.tiktok.com/) - Original platform
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Lucide](https://lucide.dev/) - Icon library

---

## Tiếng Việt

Ứng dụng web cho phép tải video TikTok không có logo watermark, hỗ trợ nhiều định dạng và chất lượng video khác nhau.

### 🌟 Tính năng

- **Tải video không logo**: Tải video TikTok gốc không có watermark
- **Nhiều định dạng**: Hỗ trợ tải video HD, SD, audio và hình ảnh
- **Giao diện hiện đại**: Thiết kế responsive với Tailwind CSS và Radix UI
- **Tự động phát hiện**: Tự động nhận diện loại thiết bị (mobile/desktop)
- **Tải xuống trực tiếp**: Hỗ trợ tải file trực tiếp về thiết bị
- **Đa ngôn ngữ**: Hỗ trợ internationalization với next-international
- **SEO tối ưu**: Schema markup và meta tags cho SEO

### 🚀 Công nghệ sử dụng

#### Frontend
- **Next.js 15.2.4** - React framework với App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library
- **React Hook Form** - Form handling
- **Zod** - Schema validation

#### Backend & Database
- **Next.js API Routes** - Server-side API endpoints
- **Drizzle ORM** - Database ORM
- **Multiple Database Support**:
  - PostgreSQL (Vercel Postgres, Neon, PlanetScale)
  - SQLite (Better SQLite3, Bun SQLite)
  - MySQL (MySQL2)
  - MongoDB
  - TiDB Cloud

#### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

### 📦 Cài đặt

#### Yêu cầu hệ thống
- Node.js 18+
- npm, yarn, hoặc pnpm

#### Bước 1: Clone repository
```bash
git clone <repository-url>
cd savetik-main
```

#### Bước 2: Cài đặt dependencies
```bash
# Sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install

# Hoặc sử dụng pnpm (khuyến nghị)
pnpm install
```

#### Bước 3: Cấu hình môi trường
Tạo file `.env.local` trong thư mục gốc:

```env
# Database Configuration (chọn một trong các options)
DATABASE_URL="your_database_url"

# Next.js Configuration
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# API Keys (nếu cần)
TIKTOK_API_KEY="your_tiktok_api_key"
```

#### Bước 4: Chạy ứng dụng
```bash
# Development mode
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev

# Build production
npm run build
npm start

# Lint code
npm run lint
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

### 🏗️ Cấu trúc dự án
.
```
savetik-main/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   │   ├── tiktok/        # TikTok download API
│   │   ├── force-download/ # File download API
│   │   └── ...
│   ├── [locale]/          # Internationalization routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── atoms/            # Atomic design - atoms
│   ├── molecules/        # Atomic design - molecules
│   ├── organisms/        # Atomic design - organisms
│   ├── templates/        # Page templates
│   ├── ui/               # Reusable UI components
│   └── ...
├── hooks/                # Custom React hooks
│   └── use-tiktok-downloader.ts
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
├── styles/               # Additional styles
├── public/               # Static assets
└── ...
```

### 🔧 API Endpoints

#### POST `/api/tiktok`
Tải thông tin video TikTok

**Request Body:**
```json
{
  "url": "https://www.tiktok.com/@username/video/1234567890"
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "id": "video_id",
    "title": "Video title",
    "author": "Author name",
    "hd": "https://video-url-hd.mp4",
    "sd": "https://video-url-sd.mp4",
    "music": "https://audio-url.mp3",
    "image": "https://thumbnail-url.jpg"
  }
}
```

#### POST `/api/force-download`
Tải file về thiết bị

**Request Body:**
```json
{
  "url": "https://video-url.mp4",
  "filename": "tiktok_video.mp4"
}
```

### 🎨 Components

#### Atomic Design Structure

- **Atoms**: Basic building blocks (buttons, inputs, icons)
- **Molecules**: Simple combinations of atoms (search form, feature card)
- **Organisms**: Complex UI sections (header, hero section, results section)
- **Templates**: Page layouts (home layout)
- **Pages**: Complete pages with data

#### Key Components

- `AppHeader`: Header với logo và language switcher
- `HeroSection`: Hero section với title và description
- `SearchForm`: Form tìm kiếm video TikTok
- `ResultsSection`: Hiển thị kết quả video và download options
- `FeaturesSection`: Giới thiệu tính năng
- `HowToSection`: Hướng dẫn sử dụng

### 🎯 Cách sử dụng

1. **Nhập URL TikTok**: Copy link video TikTok từ ứng dụng hoặc website
2. **Paste vào form**: Dán URL vào ô tìm kiếm
3. **Nhấn tải**: Hệ thống sẽ phân tích và hiển thị các tùy chọn tải
4. **Chọn định dạng**: Chọn chất lượng video mong muốn (HD/SD/Audio)
5. **Tải xuống**: Nhấn nút download để tải file về thiết bị

### 🔒 Bảo mật

- Sử dụng HTTPS cho tất cả API calls
- Validate input URLs để tránh XSS attacks
- Rate limiting cho API endpoints
- Sanitize file names trước khi download

### 🌐 Deployment

#### Vercel (Khuyến nghị)
```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### 📝 License

Dự án này được phân phối dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

### ⚠️ Disclaimer

Dự án này chỉ được sử dụng cho mục đích giáo dục và nghiên cứu. Người dùng cần tuân thủ các điều khoản sử dụng của TikTok và luật pháp địa phương. Chúng tôi không chịu trách nhiệm về việc sử dụng sai mục đích.

### 🙏 Acknowledgments

- [TikTok](https://www.tiktok.com/) - Platform gốc
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Lucide](https://lucide.dev/) - Icon library

---

⭐ Nếu dự án này hữu ích, hãy cho chúng tôi một star trên GitHub!
