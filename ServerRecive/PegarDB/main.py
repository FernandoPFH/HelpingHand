import pika
import time

connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq-server'))
channel = connection.channel()

channel.queue_declare(queue="receber")

def on_request(ch, method, properties, body):
    try:
        file = open("/DB/database.txt", "r")
    except:
        file = open("/DB/database.txt", "x")
        file.close()
        file = open("/DB/database.txt", "r")
    try:
        texto = file.read()
        if texto != "":
            volta = texto
            print(1)
        else:
            volta = "Não há mensagens!"
        file.close()
    except:
        print("erro")

    ch.basic_publish(exchange='',
                     routing_key=properties.reply_to,
                     properties=pika.BasicProperties(correlation_id = \
                                                         properties.correlation_id),
                     body=volta)
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue="receber", on_message_callback=on_request)

channel.start_consuming()
