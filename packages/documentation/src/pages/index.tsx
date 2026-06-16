import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
	const logoUrl = useBaseUrl("img/logo.svg");

	return (
		<header className={clsx("hero hero--primary", styles.heroBanner)}>
			<div className="container">
				<img className={styles.heroLogo} src={logoUrl} alt="gmap-vue logo" />
				<Heading as="h1" className="hero__title">
					Google Maps components for Vue
				</Heading>
				<p className="hero__subtitle">
					Build Vue 3 maps with typed components, plugin setup, and composables
					for Google Maps instances.
				</p>
				<div className={styles.buttons}>
					<Link
						className="button button--secondary button--lg"
						to="/docs/vue-3-version/"
					>
						Start with Vue 3
					</Link>
					<Link
						className="button button--outline button--secondary button--lg"
						to="/docs/vue-2-version/"
					>
						Vue 2 legacy docs
					</Link>
				</div>
			</div>
		</header>
	);
}

export default function Home() {
	return (
		<Layout
			title="GmapVue documentation"
			description="Documentation for using GmapVue with Vue 3 and Google Maps JavaScript API."
		>
			<HomepageHeader />
			<main>
				<HomepageFeatures />
			</main>
		</Layout>
	);
}
