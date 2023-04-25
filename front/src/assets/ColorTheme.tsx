class ColorTheme {

	constructor(document: Document) {
		this.document = document;
	}
 
	document: Document;

	cssVar: string = '--main-color';

	blue: string = '100, 148, 237';			// [0]
	orange: string = '239, 126, 33';		// [1]
	green: string = '93, 213, 18';			// [2]
	purple: string = '163, 76, 255';		// [3]
	grey: string = '239, 239, 239';			// [4]
	
	blueHex: string = '#6494ed'
	orangeHex: string = '#ef7e21'
	greenHex: string = '#5dd512'
	purpleHex: string = '#a34cff'
	greyHex: string = '#efefef'


	colorTab: string[] = [this.blue, this.orange, this.green, this.purple];

	getColorTheme(): string {
		return getComputedStyle(this.document.documentElement).getPropertyValue(this.cssVar);
	}

	setColorTheme(color: string): void {
		this.document.documentElement.style.setProperty('--main-color', color);
	}

	setColorThemeByIndex(i: number): void {
		this.document.documentElement.style.setProperty('--main-color', this.colorTab[i]);
	}

	setColorThemeByDay(begin: Date): string {
		let now: Date = new Date();
		const _MS_PER_DAY = 1000 * 60 * 60 * 24;
		const utc1 = Date.UTC(begin.getFullYear(), begin.getMonth(), begin.getDate());
		const utc2 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
		const diff = Math.floor((utc2 - utc1) / _MS_PER_DAY);
		const index = (diff % 4);
		this.setColorThemeByIndex(index);

		switch (this.colorTab[index]) {
			case this.blue:
				return this.blueHex;
			case this.orange:
				return this.orangeHex; 
			case this.green:
				return this.greenHex;
			case this.purple:
				return this.purpleHex; 
		}
		return this.blueHex;
	}

}

export default ColorTheme;
