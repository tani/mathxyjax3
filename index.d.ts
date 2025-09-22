export interface Tex2SvgOptions {
  display?: boolean;
  [key: string]: unknown;
}

export function tex2svg(math?: string, options?: Tex2SvgOptions): string;
