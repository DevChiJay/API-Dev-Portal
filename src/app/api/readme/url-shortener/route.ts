import { NextResponse } from 'next/server';

// This is a simplified example. In a real-world scenario,
// you would fetch the content from a database or storage service.
export async function GET() {
  // The URL shortener README content
  const readmeContent = `# URL Shortener with QR Code

A robust URL shortening service with QR code generation capabilities built with Node.js, Express, and MongoDB.

## Features

- ✂️ Shorten long URLs into easily shareable links
- 🔄 Automatic redirection to original URLs
- 📱 QR code generation for shortened URLs
- ⏱️ Configurable expiration dates for URLs
- 📊 Click tracking for shortened URLs
- 🔒 Active/inactive link status management

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **QR Code**: qrcode.js
- **Unique ID Generation**: nanoid
- **Validation**: Zod

## Installation

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Setup

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd URL-Shortener-with-QR
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure environment variables:
   - Create a \`.env\` file based on the provided \`.env.example\`
   - Add your MongoDB connection string and other configuration

4. Start the server:
   \`\`\`bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   \`\`\`

## API Documentation

### Shorten a URL

**Endpoint**: \`POST /api/url/shorten\`

**Request Body**:
\`\`\`json
{
  "originalUrl": "https://example.com/very-long-url-that-needs-shortening",
  "expirationDays": 7 // Optional, defaults to 7 days
}
\`\`\`

**Response**:
\`\`\`json
{
  "originalUrl": "https://example.com/very-long-url-that-needs-shortening",
  "shortUrl": "http://yourdomain.com/abc123",
  "shortCode": "abc123",
  "qrCode": "data:image/png;base64,...", // Base64 encoded QR code image
  "expiresAt": "2023-06-01T12:00:00.000Z"
}
\`\`\`

### Redirect to Original URL

**Endpoint**: \`GET /:shortCode\`

Automatically redirects to the original URL associated with the provided short code.

### Get QR Code

**Endpoint**: \`GET /api/url/:shortCode/qr\`

Returns the QR code image for the shortened URL.

### Update URL Expiration

**Endpoint**: \`PATCH /api/url/:shortCode/expiration\`

**Request Body**:
\`\`\`json
{
  "expirationDays": 30
}
\`\`\`

**Response**:
\`\`\`json
{
  "message": "URL expiration updated successfully",
  "expiresAt": "2023-07-01T12:00:00.000Z"
}
\`\`\``;

  return new NextResponse(readmeContent);
}
