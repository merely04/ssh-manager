import uuid

import eel

from server.ssh import exec_command
from server.database import Server


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
def connect_server(data):
    server = Server.get_by_id(data["id"])
    if not server:
        return

    command = data['command']
    output = exec_command(server, command)

    return {
        "user": command,
        "server": output,
    }


@eel.expose
def send_server_command(data):
    server = Server.get_by_id(data["id"])
    print(server.name)
    if not server:
        return

    command = data['command']
    output = exec_command(server, command)

    return {
        "user": command,
        "server": output,
    }
