export interface Tex2SvgHtmlOptions {
  display?: boolean;
  [key: string]: unknown;
}

export function tex2svgHtml(math?: string, options?: Tex2SvgHtmlOptions): string;
