import * as angleUtils from "@utils/angle";

describe("Angle utils", () => {
	const range = (end: number, step = 1, start = 0): number[] => {
		const length = (end - start) / step;

		return Array.from(new Array(length)).map((_, i) => i * step + start);
	};

	describe("Angle normalization", () => {
		it("Should normalize angles above 360 degrees", () => {
			const expectedAngles = range(360);
			const testAngles = range(3960, 1, 360);

			const actualAngles = testAngles.map((angle) => angleUtils.normalizeAngle(angle));

			for (let i = 0; i < testAngles.length; i++) {
				if (i < 360) {
					expect(actualAngles[i]).toEqual(expectedAngles[i]);
				} else {
					expect(actualAngles[i]).toEqual(expectedAngles[i - 360 * Math.floor(i / 360)]);
				}
			}
		});

		it("Should normalize negative angles", () => {
			const expectedAngles = range(-1, -1, 359);
			const testAngles = range(-3600, -1, -1);

			const actualAngles = testAngles.map((angle) => angleUtils.normalizeAngle(angle));

			for (let i = 0; i < testAngles.length; i++) {
				if (i < 360) {
					expect(actualAngles[i]).toEqual(expectedAngles[i]);
				} else {
					expect(actualAngles[i]).toEqual(expectedAngles[i - 360 * Math.floor(i / 360)]);
				}
			}
		});

		it("Should do nothing with angles in range from 0 to 360 degrees", () => {
			const angles = Array.from(new Array(360)).map((_, i) => i);

			for (const angle of angles) {
				const normalizedAngle = angleUtils.normalizeAngle(angle);

				expect(normalizedAngle).toEqual(angle);
			}
		});
	});
});
