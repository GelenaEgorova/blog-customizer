import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isApp, setApp] = useState(defaultArticleState);

	const appStyle = {
		'--font-family': isApp.fontFamilyOption.value,
		'--font-size': isApp.fontSizeOption.value,
		'--font-color': isApp.fontColor.value,
		'--container-width': isApp.contentWidth.value,
		'--bg-color': isApp.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={clsx(styles.main)} style={appStyle}>
			<ArticleParamsForm appState={setApp} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
