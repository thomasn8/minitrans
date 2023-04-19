// blue		rgb(100, 148, 237)	#6494ed
// orange	rgb(239, 126, 33)		#EF7E21
// green		rgb(93, 213, 18)		#5DD512
// purple	rgb(163, 76, 255)		#A34CFF


function ChatSvg() {
	return (
		<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill={globalThis.colorTheme} stroke={globalThis.colorTheme}>
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
			<g id="SVGRepo_iconCarrier">
				<g id="icomoon-ignore"></g> 
				<path d="M21.331 10.669v-7.997h-18.659v14.394h7.997v7.997h11.063l4.265 4.264h0.665v-4.264h2.666v-14.394h-7.997zM3.738 16v-12.262h16.527v6.931h-9.596v5.331h-6.931zM28.262 23.997h-2.666v3.422l-3.423-3.422h-10.439v-12.262h16.527v12.262z" fill={globalThis.colorTheme}> 
				</path> 
			</g>
		</svg>
	)
}

function GameSvg() {
	return (
		<svg fill={globalThis.colorTheme} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
			<g id="SVGRepo_iconCarrier"> 
				<title>game</title> 
				<path d="M4.469 8.156v-2.25h2.25v2.25h-2.25zM15.688 5.906h2.219v2.25h-2.219v-2.25zM20.156 12.625v-4.469h2.25v8.969h-2.25v2.219h-2.25v2.25h2.25v2.25h2.25v2.219h-4.5v-2.219h-2.219v-2.25h-8.969v2.25h-2.25v2.219h-4.469v-2.219h2.25v-2.25h2.219v-2.25h-2.219v-2.219h-2.25v-8.969h2.25v4.469h2.219v-2.219h2.25v-2.25h2.25v2.25h4.469v-2.25h2.25v2.25h2.219v2.219h2.25zM8.969 14.875v-2.25h-2.25v2.25h2.25zM15.688 14.875v-2.25h-2.25v2.25h2.25z"></path> 
			</g>
		</svg>
	)
}

export { ChatSvg, GameSvg, };