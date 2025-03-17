import React from 'react'
import style from './KineticKeysWhitepaper.module.css';
import Markdown from 'react-markdown';
import KineticKeysWhitepaperText from '../../content/kinetickeywhitepaper';

const KineticKeysWhitepaper = () => {
	return (
		<div className={style.KineticKeysWhitepaperWrapper}>
			<Markdown>
				{KineticKeysWhitepaperText}
			</Markdown>
		</div>
	)
}

export default KineticKeysWhitepaper;