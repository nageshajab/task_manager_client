const searchtasks = require('./searchtasks');

describe('searchtasks', () => {
    beforeEach(() => {
        global.makeHttpGetRequest = jest.fn().mockResolvedValue({ tasks: [] });
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

        // Mock localStorage
        global.localStorage = {
            getItem: jest.fn().mockReturnValue('123'),
        };

        // Mock clearform function
        global.clearform = jest.fn();

        // Mock Binddata function
        global.Binddata = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    //test('should make HTTP GET request to searchtasks API', async () => {
    //    const mockEvent = { preventDefault: jest.fn() };
    //    const query = 'test';
    //    await searchtasks(mockEvent, query);
    //    expect(global.makeHttpGetRequest).toHaveBeenCalledWith(
    //        'http://example.com/api/tasklist',
    //        { UserId: '123' }
    //    );
    //});

    //test('should display tasks on successful search', async () => {
    //    const mockEvent = { preventDefault: jest.fn() };
    //    const query = 'test';
    //    const mockTasks = { listOfTasks: [{ id: 1, title: 'Test Task' }] };
    //    global.makeHttpGetRequest.mockResolvedValue(mockTasks);
    //    await searchtasks(mockEvent, query);
    //    expect(global.Binddata).toHaveBeenCalledWith(mockTasks);
    //});

    test('should display alert if no tasks found', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        const query = 'test';
        global.makeHttpGetRequest.mockResolvedValue(undefined);
        await searchtasks(mockEvent, query);
        expect(global.alert).toHaveBeenCalledWith(undefined);
        expect(global.clearform).toHaveBeenCalled();
    });

    //test('should display error alert on request failure', async () => {
    //    const mockEvent = { preventDefault: jest.fn() };
    //    const query = 'test';
    //    global.makeHttpGetRequest.mockRejectedValue('error');
    //    await searchtasks(mockEvent, query);
    //    expect(global.alert).toHaveBeenCalledWith('Error searching tasks');
    //});

    //test('should log the error on request failure', async () => {
    //    const mockEvent = { preventDefault: jest.fn() };
    //    const query = 'test';
    //    const mockError = new Error('error');
    //    global.makeHttpGetRequest.mockRejectedValue(mockError);
    //    await searchtasks(mockEvent, query);
    //    expect(global.console.error).toHaveBeenCalledWith(mockError);
    //});
});
