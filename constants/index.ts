export const isProduction = process.env.NODE_ENV === 'production';
export const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : process.env.NEXTAUTH_URL;