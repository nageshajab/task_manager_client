const editmovie = require('./editmovie');

describe('editmovie', () => {
    let event;

    beforeEach(() => {
        event = {
            preventDefault: jest.fn()
        };
        global.$ = jest.fn().mockReturnValue({
            val: jest.fn().mockReturnValue(''),
        });
        global.localStorage = {
            getItem: jest.fn().mockReturnValue('userId'),
        };
        global.makeHttpPostRequest = jest.fn().mockResolvedValue({ success: true });
        global.alert = jest.fn();
        global.clearform = jest.fn();
        global.window = {
            location: {
                href: '',
            },
        };
        global.console = {
            log: jest.fn(),
            error: jest.fn(),
        };
        global.baseurl = 'http://example.com/'; // Define baseurl here
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should prevent default event', async () => {
        await editmovie(event);
        expect(event.preventDefault).toHaveBeenCalled();
    });

    test('should make HTTP POST request to updatemovie API', async () => {
        await editmovie(event);
        expect(global.makeHttpPostRequest).toHaveBeenCalledWith(
            'http://example.com/api/updatemovie',
            expect.any(Object)
        );
    });

    test('should display success alert and redirect to movies.html on successful update', async () => {
        await editmovie(event);
        expect(global.alert).toHaveBeenCalledWith('updated successfully');
        expect(global.window.location.href).toBe('/movies.html');
    });

    test('should display error alert and clear form on unsuccessful update', async () => {
        global.makeHttpPostRequest = jest.fn().mockRejectedValue('error');
        await editmovie(event);
        expect(global.alert).toHaveBeenCalledWith('error');
        expect(global.clearform).toHaveBeenCalled();
    });

    test('should log the result', async () => {
        const mockResult = { success: true };
        global.makeHttpPostRequest = jest.fn().mockResolvedValue(mockResult);
        await editmovie(event);
        expect(global.console.log).toHaveBeenCalledWith(JSON.stringify(mockResult));
    });
});
