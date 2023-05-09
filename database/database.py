import uuid

import paramiko as paramiko
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


def ssh_connect(host, username, password):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(hostname=host, username=username, password=password)
    return client
