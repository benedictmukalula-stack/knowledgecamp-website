declare module "next/link" {
  const Link: any;
  export default Link;
}

declare module "next/navigation" {
  export function useSearchParams(): any;
  export function useRouter(): any;
}

declare module "next/server" {
  export const NextResponse: any;
}

declare module "@supabase/supabase-js" {
  export function createClient(...args: any[]): any;
}
