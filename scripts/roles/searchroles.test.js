const searchroles = require('./searchroles');

describe('searchroles', () => {
    beforeEach(() => {
        global.makeHttpGetRequest = jest.fn().mockResolvedValue([]);
        global.Binddata = jest.fn();
        global.alert = jest.fn();
        global.console = {
            log: jest.fn(),
            error: jest.fn(),
        };
        global.baseurl = 'http://example.com/'; // Define baseurl here

        // Mock jQuery functions
        global.$ = jest.fn().mockImplementation((selector) => {
            const mockElement = {
                val: jest.fn().mockReturnValue('1'),
                empty: jest.fn(),
                append: jest.fn(),
            };
            return mockElement;
        });

        // Mock localStorage
        global.localStorage = {
            getItem: jest.fn().mockReturnValue('123'),
        };

        // Mock clearform function
        global.clearform = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should make HTTP GET request to searchroles API', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        await searchroles(mockEvent);
        expect(global.makeHttpGetRequest).toHaveBeenCalledWith(
            'http://example.com/api/rolelist?UserId=123&pageNumber=1'
        );
    });

    //test('should display roles on successful search', async () => {
    //    const mockEvent = { preventDefault: jest.fn() };
    //    const mockResult = [{ id: 1, name: 'Role 1' }];
    //    global.makeHttpGetRequest.mockResolvedValue(mockResult);
    //    await searchroles(mockEvent);
    //    expect(global.Binddata).toHaveBeenCalledWith(mockResult);
    //});

    test('should log the result on successful search', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        const mockResult = [{ id: 1, name: 'Role 1' }];
        global.makeHttpGetRequest.mockResolvedValue(mockResult);
        await searchroles(mockEvent);
        expect(global.console.log).toHaveBeenCalledWith(JSON.stringify(mockResult));
    });

    test('should display alert if no data found', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        global.makeHttpGetRequest.mockResolvedValue([]);
        await searchroles(mockEvent);
        expect(global.alert).toHaveBeenCalledWith('No data found');
    });

    test('should display error alert on unsuccessful search', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        global.makeHttpGetRequest.mockRejectedValue('error');
        await searchroles(mockEvent);
        expect(global.alert).toHaveBeenCalledWith('Error searching roles');
    });

    test('should log the error on unsuccessful search', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        const mockError = new Error('error');
        global.makeHttpGetRequest.mockRejectedValue(mockError);
        await searchroles(mockEvent);
        expect(global.console.error).toHaveBeenCalledWith(mockError);
    });
});

