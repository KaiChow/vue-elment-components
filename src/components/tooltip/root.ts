import type { ExtractPropTypes } from "vue";

export const tooltipV2RootProps = {
  delayDuration: {
    type: Number,
    default: 300,
  },
  defaultOpen: Boolean,
  open: {
    type: Boolean,
    default: undefined,
  },
  onOpenChange: {
    type: Function,
  },
  "onUpdate:open": {
    type: Function,
  },
};

export type TooltipV2RootProps = ExtractPropTypes<typeof tooltipV2RootProps>;
