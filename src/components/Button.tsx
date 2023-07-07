import { VariantPropsOf, variantProps } from 'classname-variants/react';

const buttonProps = variantProps({
  base: 'text-white focus:ring-4 font-medium text-sm focus:outline-none px-5 py-2.5',
  variants: {
    color: {
      blue: 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
      green:
        'bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
    },
    rounded: {
      true: 'rounded-lg',
    },
  },
  defaultVariants: {
    color: 'blue',
    rounded: true,
  },
});

type Props = JSX.IntrinsicElements['button'] &
  VariantPropsOf<typeof buttonProps>;

export default function Button(props: Props) {
  return <button {...buttonProps(props)} />;
}
