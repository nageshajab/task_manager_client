const addtask = require('./addtask');
const getUrlVars = require('../geturlvars');

jest.mock('../geturlvars');

describe('addtask', () => {
    beforeEach(() => {
        global.makeHttpPostRequest = jest.fn().mockResolvedValue({ success: true });
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
            };
            return mockElement;
        });

        // Mock localStorage
        global.localStorage = {
            getItem: jest.fn().mockReturnValue('123'),
        };

        // Mock clearForm function
        global.clearform = jest.fn();

        // Mock window.location
        global.window = {
            location: {
                href: '',
            },
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should make HTTP POST request to addtask API', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        getUrlVars.mockReturnValue({});
        await addtask(mockEvent);
        expect(global.makeHttpPostRequest).toHaveBeenCalledWith(
            'http://example.com/api/addtask',
            {
                Title: 'Test Value',
                Description: 'Test Value',
                UserId: '123',
                DueDate: 'Test Value',
                Priority: 'Test Value',
                Status: 'Test Value',
            }
        );
    });

    test('should display success alert and redirect on successful task addition', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        getUrlVars.mockReturnValue({});
        await addtask(mockEvent);
        expect(global.alert).toHaveBeenCalledWith('added successfully');
        expect(global.window.location.href).toBe('/tasks.html');
    });

    test('should display failure alert on unsuccessful task addition', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        global.makeHttpPostRequest.mockResolvedValue(undefined);
        getUrlVars.mockReturnValue({});
        await addtask(mockEvent);
        expect(global.alert).toHaveBeenCalledWith(undefined);
        expect(global.clearform).toHaveBeenCalled();
    });

    //test('should display error alert on request failure', async () => {
    //    const mockEvent = { preventDefault: jest.fn() };
    //    global.makeHttpPostRequest.mockRejectedValue('error');
    //    getUrlVars.mockReturnValue({});
    //    await addtask(mockEvent);
    //    expect(global.alert).toHaveBeenCalledWith('Error adding task');
    //});

    test('should log the error on request failure', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        const mockError = new Error('error');
        global.makeHttpPostRequest.mockRejectedValue(mockError);
        getUrlVars.mockReturnValue({});
        await addtask(mockEvent);
        expect(global.console.error).toHaveBeenCalledWith(mockError);
    });

    test('should make HTTP POST request to updatetask API if id is present', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        getUrlVars.mockReturnValue({ id: '1' });
        await addtask(mockEvent);
        expect(global.makeHttpPostRequest).toHaveBeenCalledWith(
            'http://example.com/api/updatetask',
            {
                Title: 'Test Value',
                Description: 'Test Value',
                UserId: '123',
                DueDate: 'Test Value',
                Priority: 'Test Value',
                Status: 'Test Value',
                Id: '1',
            }
        );
    });

    test('should display success alert and redirect on successful task update', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        getUrlVars.mockReturnValue({ id: '1' });
        await addtask(mockEvent);
        expect(global.alert).toHaveBeenCalledWith('updated successfully');
        expect(global.window.location.href).toBe('/tasks.html');
    });
});
