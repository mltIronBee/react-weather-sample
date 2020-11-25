import React, { Suspense, lazy } from "react";
import { PageLoader } from "@components/common";

const Home = lazy(() => import("@src/containers/pages/home/home-page"));

export const HomePage: React.FC = () => (
	<Suspense fallback={<PageLoader />}>
		<Home />
	</Suspense>
);
