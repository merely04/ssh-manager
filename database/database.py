import uuid
import eel
import subprocess
from peewee import *
from os import system

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
    server = Server.create(id=str(uuid.uuid4()), name=data["name"], host=data["host"], username=data["username"], password=data["password"])
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


def ssh_connect(host, username, password):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname=host, username=username, password=password)
    return client


@eel.expose
def start_server(data):
    print(123)
    server = Server.get_by_id(data["id"])
    print(server)
    if not server:
        return

    command = f'start c:/putty.exe -ssh {server.username}@{server.host} -pw {server.password}'
    system(command)