import React from 'react'
import style from './KineticKeysWhitepaper.module.css';
import Markdown from 'react-markdown';
import KineticKeysWhitepaperText from '../../content/kinetickeywhitepaper';
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import remarkGfm from "remark-gfm";
import 'katex/dist/katex.min.css'

const KineticKeysWhitepaper = () => {
	return (
		<div className={style.KineticKeysWhitepaperWrapper}>
			<Markdown
				remarkPlugins={[remarkMath, remarkGfm]}
				rehypePlugins={[rehypeKatex]}
			>
				{KineticKeysWhitepaperText}
			</Markdown>
		</div>
	)
}

export default KineticKeysWhitepaper;