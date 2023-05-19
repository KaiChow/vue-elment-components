import { Fragment, defineComponent, ref } from "vue";
import type { VNodeArrayChildren } from "vue";
import { composeRefs } from "../../utils/refs";
import { isArray } from "../../utils/types";

export type RefSetter = (el: HTMLElement | null) => void;

export const ensureOnlyChild = (children: VNodeArrayChildren | undefined) => {
  if (!isArray(children) || children.length > 1) {
    throw new Error("expect to receive a single Vue element child");
  }
  return children[0];
};

// TODO: consider make this component a reusable component without the only child feature.
export default defineComponent({
  props: {
    setRef: { type: Function, required: true },
    onlyChild: Boolean,
  },
  setup(props, { slots }) {
    const fragmentRef = ref();
    const setRef = composeRefs(fragmentRef, (el) => {
      // vue fragments is represented as a text element.
      // The first element sibling should be the first element children of fragment.
      // This is how we get the element.
      if (el) {
        props.setRef(
          (el as HTMLElement).nextElementSibling as HTMLElement | null
        );
      } else {
        props.setRef(null);
      }
    });
    return () => {
      const [firstChild] = slots.default?.() || [];
      const child = props.onlyChild
        ? ensureOnlyChild(firstChild.children as VNodeArrayChildren)
        : firstChild.children;
      // Dunno why the ref for jsx complains about the typing issue which was not
      // in template
      return <Fragment ref={setRef as any}>{child}</Fragment>;
    };
  },
});
