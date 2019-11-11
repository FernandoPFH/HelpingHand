import pika

connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq-server'))
channel = connection.channel()
		
channel.queue_declare(queue="mandar")

def callback(ch, method, properties, body):
    body = body.decode("utf-8")
    lista = body.split("/!/")
    
    if lista[1] == "M":
        try:
            file = open("/DB/database.txt", "r")
            file.close()
        except:
            file = open("/DB/database.txt", "x")
            file.close()
        try:
            file = open("/DB/database.txt", "r")
            texto = file.read()
            file.close()
            file = open("/DB/database.txt", "w")
            if texto != "":
                file.write(texto + "/!/" + lista[0])
            else:
                file.write(lista[0])
        except:
            file.close()
            file = open("/database.txt", "w")
            file.write(lista[0])
        file.close()

    if lista[1] == "R":
        try:
            file = open("/DB/database.txt", "w")
            texto = file.read()
            remove = lista[0] + "/!/"
            if remove in texto:
                texto.replace(remove, "")
                if texto.LastIndexOf("/!/") == (texto.length - 3):
                    texto = texto.slice(0,-3)
                file.write(texto)
            elif lista in texto:
                texto.replace(lista[0],"")
                if texto.LastIndexOf("/!/") == (texto.length - 3):
                    texto = texto.slice(0,-3)
                file.write(texto)
            else:
                return "Mensagem não existe!"
            file.close()
        except:
            return "error"

channel.basic_consume(queue="mandar", on_message_callback=callback, auto_ack=True)
channel.start_consuming()
