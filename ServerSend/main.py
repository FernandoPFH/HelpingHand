from flask import Flask,request, jsonify
import pika
import uuid

app = Flask(__name__)

class MENSAGEM:
    def __init__(self):
        self.connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        self.channel = self.connection.channel()
        result = self.channel.queue_declare(queue='', exclusive=True)
        self.callback_queue = result.method.queue
        self.channel.basic_consume(queue=self.callback_queue,on_message_callback=self.on_response,auto_ack=True)

    def on_response(self, ch, method, props, body):
        if self.corr_id == props.correlation_id:
            self.response = body.decode("utf-8")

    def call(self):
        self.response = None
        self.corr_id = str(uuid.uuid4())
        self.channel.basic_publish(exchange='',routing_key='receber',properties=pika.BasicProperties(reply_to=self.callback_queue,correlation_id=self.corr_id),body="mensagem")
        while self.response is None:
            self.connection.process_data_events()
        return self.response


def mandar(mensagem):
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='mandar')
    channel.basic_publish(exchange='',routing_key='mandar',body=mensagem)
    connection.close()

def receber():
    Mensagem = MENSAGEM()
    resposta = {"lista": Mensagem.call().split("/!/")}
    return resposta

@app.route("/", methods=['GET', 'POST', 'HEAD'])
def hello_world():
    if request.method == "POST":
        try:
            mensagem = request.args.get("msm") + "/!/M"
            mandar(mensagem)
            return "send"
        except :
            return "error"
	
    elif request.method == "GET":
        if request.args.get("adm") == "fernando" and request.args.get("passw") == "ola":
            return jsonify(receber())
        else:
            return "Acesso Negado"

    elif request.method == "HEAD":
        if request.args.get("adm") == "fernando" and request.args.get("passw") == "ola":
            try:
                mensagem = request.args.get("msm") + "/!/R"
                mandar(mensagem)
                return "removido"
            except:
                return "error"

app.run(host='0.0.0.0')