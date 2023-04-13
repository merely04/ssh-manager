import uuid
import eel
from peewee import *

DATABASE = 'appdata.db'

database = SqliteDatabase(DATABASE)


class BaseModel(Model):
    class Meta:
        database = database


class Server(BaseModel):
    id = TextField(primary_key=True, default=uuid.uuid4())
    name = TextField()
    host = TextField()
    username = TextField()
    password = TextField()


def create_tables():
    with database:
        database.create_tables([Server])


@eel.expose
def get_servers():
    servers = list(Server.select().dicts())
    return servers


@eel.expose
def add_server(data):
    server = Server.create(name=data["name"], host=data["host"], username=data["username"], password=data["password"])
    return {
        "id": server.id,
        "name": server.name,
        "host": server.host,
        "username": server.username,
        "password": server.password
    }


@eel.expose
def del_server(data):
    server = Server.get_by_id(data["id"])
    if server:
        server.delete_instance()


@eel.expose
def start_server(data):
    server = Server.get_by_id(data["id"])
    if not server:
        return

    # TODO: Implement "start ssh session" method
    print("starting ssh session here...")
