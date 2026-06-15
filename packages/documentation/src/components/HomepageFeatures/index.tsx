import clsx from "clsx";
import Heading from "@theme/Heading";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

type FeatureItem = {
	title: string;
	description: ReactNode;
};

const FeatureList: FeatureItem[] = [
	{
		title: "Install once, use components",
		description: (
			<>
				Register the Vue 3 plugin, import the stylesheet, and start with
				`GmvMap`, `GmvMarker`, `GmvInfoWindow`, and other Google Maps wrappers.
			</>
		),
	},
	{
		title: "Typed Vue 3 surface",
		description: (
			<>
				Use documented package entrypoints for the plugin, components,
				composables, keys, interfaces, and types without relying on deep
				imports.
			</>
		),
	},
	{
		title: "Composable instance access",
		description: (
			<>
				Access map, marker, shape, layer, and autocomplete instances from Vue
				code with key-based `use*Promise` composables.
			</>
		),
	},
];

function Feature({ title, description }: FeatureItem) {
	return (
		<div className={clsx("col col--4")}>
			<div className="padding-horiz--md">
				<Heading as="h3">{title}</Heading>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
