const searchmovies = require('./searchmovies');

describe('searchmovies', () => {
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
            if (selector === '#pageno') {
                return {
                    val: jest.fn().mockReturnValue('1'),
                    empty: jest.fn(),
                };
            }
            return {
                val: jest.fn(),
                empty: jest.fn(),
            };
        });

        // Mock localStorage
        global.localStorage = {
            getItem: jest.fn().mockReturnValue('123'),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should make HTTP GET request to searchmovies API', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        await searchmovies(mockEvent);
        expect(global.makeHttpGetRequest).toHaveBeenCalledWith(
            'http://example.com/api/movielist?UserId=123&pageNumber=1'
        );
    });

    test('should display movies on successful search', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        const mockResult = [{ id: 1, name: 'Movie 1' }];
        global.makeHttpGetRequest.mockResolvedValue(mockResult);
        await searchmovies(mockEvent);
        expect(global.Binddata).toHaveBeenCalledWith(mockResult);
    });

    test('should log the result on successful search', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        const mockResult = [{ id: 1, name: 'Movie 1' }];
        global.makeHttpGetRequest.mockResolvedValue(mockResult);
        await searchmovies(mockEvent);
        expect(global.console.log).toHaveBeenCalledWith(JSON.stringify(mockResult));
    });

    test('should display alert if no data found', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        global.makeHttpGetRequest.mockResolvedValue([]);
        await searchmovies(mockEvent);
        expect(global.alert).toHaveBeenCalledWith('No data found');
    });

    test('should display error alert on unsuccessful search', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        global.makeHttpGetRequest.mockRejectedValue('error');
        await searchmovies(mockEvent);
        expect(global.alert).toHaveBeenCalledWith('Error searching movies');
    });

    test('should log the error on unsuccessful search', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        const mockError = 'error';
        global.makeHttpGetRequest.mockRejectedValue(mockError);
        await searchmovies(mockEvent);
        expect(global.console.error).toHaveBeenCalledWith(mockError);
    });
});

