const gettask = require('./gettask');

describe('gettask', () => {
    beforeEach(() => {
        global.makeHttpPostRequest = jest.fn().mockResolvedValue({});
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

        // Mock getUrlVars function
        global.getUrlVars = jest.fn().mockReturnValue({ id: '123' });

        // Mock window object
        global.window = {
            location: {
                href: ''
            }
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    //test('should make HTTP POST request to gettask API', async () => {
    //    const mockEvent = { preventDefault: jest.fn() };
    //    await gettask(mockEvent);
    //    expect(global.makeHttpPostRequest).toHaveBeenCalledWith(
    //        'http://example.com/api/gettask',
    //        { Id: '123' }
    //    );
    //});

    //test('should populate form fields on successful task retrieval', async () => {
    //    const mockEvent = { preventDefault: jest.fn() };
    //    const mockData = {
    //        dueDate: '2023-10-01T00:00:00',
    //        title: 'Test Title',
    //        description: 'Test Description',
    //        priority: 'High',
    //        status: 'Open'
    //    };
    //    global.makeHttpPostRequest.mockResolvedValue(mockData);
    //    await gettask(mockEvent);
    //    expect(global.$).toHaveBeenCalledWith('#duedate');
    //    expect(global.$).toHaveBeenCalledWith('#title');
    //    expect(global.$).toHaveBeenCalledWith('#description');
    //    expect(global.$).toHaveBeenCalledWith('#priority');
    //    expect(global.$).toHaveBeenCalledWith('#status');
    //    expect(global.$('#duedate').val).toHaveBeenCalledWith('2023-10-01');
    //    expect(global.$('#title').val).toHaveBeenCalledWith('Test Title');
    //    expect(global.$('#description').val).toHaveBeenCalledWith('Test Description');
    //    expect(global.$('#priority').val).toHaveBeenCalledWith('High');
    //    expect(global.$('#status').val).toHaveBeenCalledWith('Open');
    //});

    test('should display alert if task retrieval fails', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        global.makeHttpPostRequest.mockResolvedValue(undefined);
        await gettask(mockEvent);
        expect(global.alert).toHaveBeenCalledWith('Failed to update task');
    });

    test('should log the error on request failure', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        const mockError = new Error('error');
        global.makeHttpPostRequest.mockRejectedValue(mockError);
        await gettask(mockEvent);
        expect(global.console.error).toHaveBeenCalledWith(mockError);
    });
});

