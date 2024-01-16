import React from 'react';
import style from './home.module.css'

const Home = () => {
	return (
		<div className={style.Home}>
			<h2>PROJECT KINETIC</h2>

			<div className={style.HomeContent}>
				<div className={style.HomeContentTextWrapper}>
					<div className={style.HomeContentTextHeadingWrapper}>
						<span className={style.HomeContentText}>PROJECT</span>
						<span className={style.HomePronunciation}>/ˈprɒʤekt/, /prəˈʤekt/ </span>
					</div>

					<div className={style.HomeContentWrapper}>
						<span>- any piece of work that is undertaken or attempted</span>

						<span>- a planned endeavor, usually with a specific goal and accomplished in several steps or stages.
						</span>
					</div>
				</div>

				<div className={style.HomeContentTextWrapper}>
					<div className={style.HomeContentTextHeadingWrapper}>
						<span className={style.HomeContentText}>KINETIC</span>
						<span className={style.HomePronunciation}>/kɪˈnetɪk/ </span>
					</div>

					<div className={style.HomeContentWrapper}>
						<span>relating to motion.</span>

						<span>relating to kinesis or motor function.</span>

						<span>
							(biology) relating to the movement of an organism in response to an external stimulus.
						</span>

						<span>

							(philosophy) relating to the force driving life forward.
						</span>

						<span>
							(military, euphemistic) relating to active warfare or the use of lethal force.
						</span>

						<span>

							kinetic military action(slang) Frantic; busy.
						</span>

					</div>
				</div>
			</div>
		</div >
	)
}

export default Home;