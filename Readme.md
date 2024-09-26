# Development Environment Setup

Please follow all steps one by one carefully to get ready with application dev env setup

## Softwares Needed

List Below

```bash
1. git
2. Mongo db Compass
3. Visual Studio Community Edition, Select below components from VS Installer
 - Gitub Copilot
```

## Clone your code

```python
1. Create a folder as 'TaskManager'

2. open command prompt and cd to 'TaskManager' directory

3. Clone TaskManagerClient, run below command
git clone https://github.com/nageshajab/task_manager_client.git

```

## Build client code
```python
1. This is a static website written in html, css, js. So no need to build it
2. deploy it to IIS or XAMPP or any other web server
```

## User Secrets
Please configure below settings in user.secrets file
```python
1. App config setting is configured in scripts\appconfig.js file
2. All you need to configure is baseurl for backend api
```

## Publish code to horizontally scalable deployment servers 
```sql
1. This git repository is deployed as Azure static web site.
2. Once you push changes to git, it will automatically deploy to Azure static web site
3. It takes 2,3 minutes to reflect changes.
4. You can access the site using below url
https://red-dune-04470d41e.5.azurestaticapps.net/login.html
5. This is horizontally scallable instance
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)