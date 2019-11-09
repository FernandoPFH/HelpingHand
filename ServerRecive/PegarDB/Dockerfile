FROM python:3.5.9-alpine3.10

RUN pip install flask; pip install pika;mkdir DB;

COPY main.py /

CMD ["python", "/main.py"]
