const searchusers = require('./searchusers');

describe('searchusers', () => {
    beforeEach(() => {
        global.makeHttpPostRequest = jest.fn().mockResolvedValue({ users: [] });
        global.alert = jest.fn();
        global.console = {
            log: jest.fn(),
            error: jest.fn(),
        };
        global.baseurl = 'http://example.com/'; // Define baseurl here

        // Mock jQuery functions
        global.$ = jest.fn().mockImplementation((selector) => {
            const mockElement = {
                val: jest.fn().mockReturnValue('Test Value'),
                empty: jest.fn(),
                append: jest.fn(),
            };
            return mockElement;
        });

        // Mock clearform function
        global.clearform = jest.fn();

        // Mock Binddata function
        global.Binddata = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should make HTTP POST request to searchusers API', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        const query = 'test';
        await searchusers(mockEvent, query);
        expect(global.makeHttpPostRequest).toHaveBeenCalledWith(
            'http://example.com/api/userlist',
            expect.any(Object)
        );
    });

    //test('should display users on successful search', async () => {
    //    const mockEvent = { preventDefault: jest.fn() };
    //    const query = 'test';
    //    const mockUsers = [{ id: 1, name: 'Test User' }];
    //    global.makeHttpPostRequest.mockResolvedValue(mockUsers);
    //    await searchusers(mockEvent, query);
    //    expect(global.Binddata).toHaveBeenCalledWith(mockUsers);
    //});

    test('should display alert if no users found', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        const query = 'test';
        global.makeHttpPostRequest.mockResolvedValue(undefined);
        await searchusers(mockEvent, query);
        expect(global.alert).toHaveBeenCalledWith(undefined);
        expect(global.clearform).toHaveBeenCalled();
    });

    //test('should display error alert on request failure', async () => {
    //    const mockEvent = { preventDefault: jest.fn() };
    //    const query = 'test';
    //    global.makeHttpPostRequest.mockRejectedValue('error');
    //    await searchusers(mockEvent, query);
    //    expect(global.alert).toHaveBeenCalledWith('Error searching users');
    //});

    test('should log the error on request failure', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        const query = 'test';
        const mockError = new Error('error');
        global.makeHttpPostRequest.mockRejectedValue(mockError);
        await searchusers(mockEvent, query);
        expect(global.console.error).toHaveBeenCalledWith(mockError);
    });
});

