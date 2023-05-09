import uuid
from os import system

import eel as eel

from database.database import Server


@eel.expose
def get_servers():
    servers = list(Server.select().dicts())
    return servers


@eel.expose
def add_server(data):
    server = Server.create(
        id=str(uuid.uuid4()),
        name=data["name"],
        host=data["host"],
        username=data["username"],
        password=data["password"]
    )
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
    print(server)
    if not server:
        return

    command = f'start c:/putty.exe -ssh {server.username}@{server.host} -pw {server.password}'
    system(command)
