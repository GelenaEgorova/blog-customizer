import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [appStyles, setAppStyles] = useState(defaultArticleState);

	const appStyle = {
		'--font-family': appStyles.fontFamilyOption.value,
		'--font-size': appStyles.fontSizeOption.value,
		'--font-color': appStyles.fontColor.value,
		'--container-width': appStyles.contentWidth.value,
		'--bg-color': appStyles.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={styles.main} style={appStyle}>
			<ArticleParamsForm appState={setAppStyles} />
			<Article />
		</main>
	);
};
