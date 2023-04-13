import sys, io

buffer = io.StringIO()
sys.stdout = sys.stderr = buffer

import eel

from database.database import database, create_tables

if __name__ == "__main__":
    database.connect()
    create_tables()

    if len(sys.argv) > 1 and sys.argv[1] == "--develop":
        directory = "dist"
        page = {"port": 4000}
        mode = False
    else:
        directory = "dist"
        page = "index.html"
        mode = "chrome"

    eel_kwargs = dict(host="localhost", port=8080, size=(1280, 800))

    eel.init(directory)
    eel.start(page, mode=mode, **eel_kwargs)
