const edittask = require('./edittask');
const getUrlVars = require('../geturlvars');

jest.mock('../geturlvars');

describe('edittask', () => {
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

    test('should make HTTP POST request to updatetask API', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        await edittask(mockEvent);
        expect(global.makeHttpPostRequest).toHaveBeenCalledWith(
            'http://example.com/api/updatetask',
            {
                Id: 'Test Value',
                Title: 'Test Value',
                Description: 'Test Value',
                UserId: '123',
                DueDate: 'Test Value',
                Priority: 'Test Value',
                Status: 'Test Value',
            }
        );
    });

    test('should display success alert and redirect on successful task update', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        await edittask(mockEvent);
        expect(global.alert).toHaveBeenCalledWith('updated successfully');
        expect(global.window.location.href).toBe('/tasks.html');
    });

    test('should display failure alert on unsuccessful task update', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        global.makeHttpPostRequest.mockResolvedValue(undefined);
        await edittask(mockEvent);
        expect(global.alert).toHaveBeenCalledWith('Failed to update task');
    });

    //test('should display error alert on request failure', async () => {
    //    const mockEvent = { preventDefault: jest.fn() };
    //    global.makeHttpPostRequest.mockRejectedValue('error');
    //    await edittask(mockEvent);
    //    expect(global.alert).toHaveBeenCalledWith('Error updating task');
    //});

    test('should log the error on request failure', async () => {
        const mockEvent = { preventDefault: jest.fn() };
        const mockError = new Error('error');
        global.makeHttpPostRequest.mockRejectedValue(mockError);
        await edittask(mockEvent);
        expect(global.console.error).toHaveBeenCalledWith(mockError);
    });
});
