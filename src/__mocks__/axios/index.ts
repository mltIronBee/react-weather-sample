const mock = jest.genMockFromModule<any>("axios");

const _instanceMock = {
	get: jest.fn().mockReturnValue(Promise.resolve()),
	post: jest.fn().mockReturnValue(Promise.resolve()),
	put: jest.fn().mockReturnValue(Promise.resolve()),
	patch: jest.fn().mockReturnValue(Promise.resolve()),
	delete: jest.fn().mockReturnValue(Promise.resolve()),
	reset(): void {
		this.get.mockReset();
		this.post.mockReset();
		this.put.mockReset();
		this.patch.mockReset();
		this.delete.mockReset();
	},
	restore(): void {
		this.get.mockRestore();
		this.post.mockRestore();
		this.put.mockRestore();
		this.patch.mockRestore();
		this.delete.mockRestore();
	},
};

const mockCreate = jest.fn().mockReturnValue(_instanceMock);

export default {
	...mock,
	create: mockCreate,
	_instanceMock,
};
