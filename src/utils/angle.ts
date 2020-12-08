export const normalizeAngle = (angle: number): number => {
	const factor = Math.abs(Math.floor(angle / 360));

	if (angle < 0) {
		return 360 * factor + angle;
	} else if (angle >= 360) {
		return angle - 360 * factor;
	}

	return angle;
};

export const invertDirection = (angle: number): number => normalizeAngle(angle + 180);
