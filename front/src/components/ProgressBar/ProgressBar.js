import { useEffect, useState } from 'react';
import './ProgressBar.css'


export const ProgressBar = ({done}) => {

    const [style, setStyle] = useState({});
	const [className, setClassName] = useState("progress-done")

    useEffect(() => {
		const newStyle = {
			opacity: 1,
			width: `${done}%`
		}
		setStyle(newStyle);
		setClassName(`progress-done progress${done}`)
    },[done])
	
	
	return <>
			<div className="progress">
				<div className={className} style={style}></div>
			</div>
	</>
}
