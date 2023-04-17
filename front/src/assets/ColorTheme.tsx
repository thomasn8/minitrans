class ColorTheme {

	constructor(document: Document) {
		this.document = document;
	}

	document: Document;

	cssVar: string = '--main-color';

	blue: string = '100, 148, 237';			// blue theme		[0]
	orange: string = '239, 126, 33';		// orange theme	[1]
	green: string = '93, 213, 18';			// green theme	[2]
	purple: string = '163, 76, 255';		// purple theme	[3]

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

	setColorThemeByDay(begin: Date): void {
		let now: Date = new Date();
		const _MS_PER_DAY = 1000 * 60 * 60 * 24;
		const utc1 = Date.UTC(begin.getFullYear(), begin.getMonth(), begin.getDate());
		const utc2 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
		const diff = Math.floor((utc2 - utc1) / _MS_PER_DAY);
		const index = (diff % 4);
		this.setColorThemeByIndex(index);
	}

}

export default ColorTheme;
