import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["ar", "en"];
const defaultLocale = "ar";

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  // Simple check for browser preference
  const enIndex = acceptLanguage.toLowerCase().indexOf("en");
  const arIndex = acceptLanguage.toLowerCase().indexOf("ar");

  if (enIndex !== -1 && (arIndex === -1 || enIndex < arIndex)) {
    return "en";
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Exclude API, static assets, images, Sanity Studio, etc.
    "/((?!api|studio|_next/static|_next/image|favicon.ico|logo-transparent.png|dr-mina.png|.*\\.png|.*\\.jpg).*)",
  ],
};
