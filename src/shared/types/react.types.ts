type AsProp<TElement extends React.ElementType> = { as?: TElement };

type PropsToOmit<TElement extends React.ElementType, P> = keyof (AsProp<TElement> & P);

export type PolymorphicComponentProps<TElement extends React.ElementType, Props> = React.PropsWithChildren<Props & AsProp<TElement>> &
	Omit<React.ComponentPropsWithoutRef<TElement>, PropsToOmit<TElement, Props>>;

export type PolymorphicComponentPropsWithRef<TElement extends React.ElementType, Props> = PolymorphicComponentProps<TElement, Props> & {
	ref?: PolymorphicRef<TElement>;
};

export type PolymorphicRef<TElement extends React.ElementType> = React.ComponentPropsWithRef<TElement>["ref"];

export type PolymorphicComponent<TProps> = <TElement extends React.ElementType>(
	props: PolymorphicComponentPropsWithRef<TElement, TProps>,
) => React.ReactNode | null;
