### Web Developer Flask Programming Project ###

This is a repository containing website code, which is used to build a simple website that can share a list of books. The website is written in Python, JavaScript, Flask, SQLAlchemy, React.js, and the data is stored in PostgreSQL.

### Deploy the Website ###

To deploy the website, requires an environment where Python (>=3.6), Pip, Node.js, NPM and PostgreSQL have been installed. Then, the basic information of PostgreSQL and email needs to be configured in config.py.

    pip install virtualenv
    virtualenv exercise
    source exercise/bin/activate
    cd js
    npm install
    npm run build
    cd ..
    pip install -r requirements.txt
    flask db init
    flask db migrate
    flask db upgrade
    gunicorn app:app

Then, the website can be accessed in the URL, [http://localhost:8000](http://localhost:8000). When you want to stop it, after Crtl + C, type

    deactivate

to quit the Virtualenv environment.
