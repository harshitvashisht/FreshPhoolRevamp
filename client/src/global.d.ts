declare global {
  interface Window {
    fpCart: any;
    fpNav: any;
    fpNative: any;
    fpPincode: any;
    fpMarquee: any;
    fpLooks: any;
  }
}

declare module "react" {
  interface InputHTMLAttributes<T> {
    autocomplete?: string;
  }
}

export {};
