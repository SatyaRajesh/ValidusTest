# Validus

> Full stack Django/React/Redux app that uses token based authentication with Knox.

## Quick Start
### Python 3.7.6 and node.js installed

## Known Issues 
### Welcome Page Not create with Box
### Dashboard page should always be called before newcall, 
### Newcall page do not load data from DB directly
### Date is not implemented
### Calculate is Working only Once, Some state changes has to be fixed
### Submit is Work In Progress

##Entry points to GET/POST/PUT/DELETE 4 Tables
#http://127.0.0.1:8000/datafund/
#http://127.0.0.1:8000/datacommitment
#http://127.0.0.1:8000/datacall/
#http://127.0.0.1:8000/datafundinvestment/

```bash
# Install dependencies
npm install
pipenv install

# Run webpack (from root)
npm run dev

# Build for production
npm run build

# Serve API on localhost:8000
pipenv shell
python leadmanager/manage.py runserver

```
