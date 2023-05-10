import paramiko

from server.database import Server

clients = {}

history = {}


def get_ssh_client(server: Server):
    try:
        client = clients[id]
    except:
        print('creating connection')
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        client.connect(hostname=server.host, username=server.username, password=server.password)
        clients[id] = client

    if client.get_transport().active is False:
        client.connect(hostname=server.host, username=server.username, password=server.password)

    return client


def exec_command(server: Server, command):
    client = get_ssh_client(server)

    stdin, stdout, stderr = client.exec_command(command)
    # input = stdin.read().decode()
    output = stdout.read().decode()
    error = stderr.read().decode()

    print(output, '\n', error)
    return f'{output}\n{error}'


def get_history(server: Server):
    try:
        return []
    except:
        return []

    pass