import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import React, { useState, useRef, useEffect } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
import { Text } from 'components/text';
import { Select } from 'components/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from '../separator';

export type ArticleParamsFormProps = {
	appState: (formState: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ appState }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [form, setForm] = useState(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);
	const handleClickForm = () => {
		setIsOpen(!isOpen);
	};
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleChange = (name: string, value: OptionType) => {
		setForm((prev) => ({ ...prev, [name]: value }));
		if (name === 'backgroundColor') {
			console.log('Selected backgroundColor:', value);
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		appState(form);
		console.log('color:', form.backgroundColor.value);
	};

	const handleReset = () => {
		setForm(defaultArticleState);
		appState(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton onClick={handleClickForm} isOpen={isOpen} />
			<aside
				ref={formRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						selected={form.fontFamilyOption}
						onChange={(value) => handleChange('fontFamilyOption', value)}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSizeOption'
						selected={form.fontSizeOption}
						onChange={(value) => handleChange('fontSizeOption', value)}
						options={fontSizeOptions}
						title='Размер шрифта'></RadioGroup>
					<Select
						selected={form.fontColor}
						onChange={(value) => handleChange('fontColor', value)}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={form.backgroundColor}
						onChange={(value) => handleChange('backgroundColor', value)}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={form.contentWidth}
						onChange={(value) => handleChange('contentWidth', value)}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
