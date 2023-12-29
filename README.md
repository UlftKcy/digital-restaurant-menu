[app_video.webm](https://github.com/UlftKcy/digital-restaurant-menu/assets/80036968/8c7040c7-5896-43c1-a50e-31be2231903d)

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Built With](#built-with)
- [How to use](#how-to-use)

### Built With

- NextJS 14
- Next Auth
- Typescript
- Prisma ORM
- React-Hook Form
- Zod
- Cloudinary
- Shadcn UI & TailwindCSS

## How To Use

# Clone this repository
```bash
$ git clone https://github.com/UlftKcy/digital-restaurant-menu.git
```

# Install dependencies
```bash
  $ npm install
```
  
# Add .env
```bash
 NEXT_API_BASE_URL = NEXT_API_BASE_URL ("http://127.0.0.1:3000")
 NEXTAUTH_URL = YOUR_NEXTAUTH_URL ('http://localhost:3000')
 NEXTAUTH_SECRET = YOUR_NEXTAUTH_SECRET
 NEXT_CLOUDINARY_CLOUDNAME = YOUR_NEXT_CLOUDINARY_CLOUDNAME
 NEXT_CLOUDINARY_API_KEY = YOUR_NEXT_CLOUDINARY_API_KEY
 NEXT_CLOUDINARY_API_SECRET = YOUR_NEXT_CLOUDINARY_API_SECRET
 MYSQL_HOST = YOUR_MYSQL_HOST
 MYSQL_PORT = YOUR_MYSQL_PORT
 MYSQL_USER = YOUR_MYSQL_USER
 MYSQL_PASSWORD = YOUR_MYSQL_PASSWORD
 MYSQL_DB = YOUR_MYSQL_DB
 DATABASE_URL = YOUR_DATABASE_URL
```
  
# Prisma Migrate
```bash
  $ npx prisma migrate dev --name init
```

# Run the app
```bash
  $ npm run dev or next dev
```
