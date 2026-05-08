import { IDisplayOptions } from "n8n-workflow";

const normalizeCondition = (input?: Record<string, any[] | undefined>): Record<string, any[]> | undefined => {
  if (!input) return undefined;

  const result: Record<string, any[]> = {};

  for (const key of Object.keys(input)) {
    const value = input[key];
    if (Array.isArray(value)) {
      result[key] = value;
    }
  }

  return Object.keys(result).length ? result : undefined;
};


const mergeCondition = (a?: Record<string, any[]>, b?: Record<string, any[]>): Record<string, any[]> | undefined => {
  if (!a && !b) return undefined;
  if (!a) return b;
  if (!b) return a;

  const result: Record<string, any[]> = { ...a };

  for (const key of Object.keys(b)) {
    const value = b[key];
    if (Array.isArray(value)) {
      // override semantics
      result[key] = value;
    }
    // ignore undefined values completely
  }

  return Object.keys(result).length ? result : undefined;
};

export const mergeDisplayOptions = (base?: IDisplayOptions, override?: IDisplayOptions): IDisplayOptions | undefined => {
  if (!base && !override) return undefined;

  const show = mergeCondition(normalizeCondition(base?.show), normalizeCondition(override?.show));
  const hide = mergeCondition(normalizeCondition(base?.hide), normalizeCondition(override?.hide));
  const final: IDisplayOptions = {};

  if (show) final.show = show;
  if (hide) final.hide = hide;

  return Object.keys(final).length ? final : undefined;
};
