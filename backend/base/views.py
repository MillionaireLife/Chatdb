from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import queryresponse
from .serializers import queryresponseSerializer
from django.db import connections
import datetime
from decimal import Decimal
import MySQLdb


@api_view(["POST", "GET", "PUT", "PATCH", "DELETE"])
def messages(request):
    if request.method == "GET":
        messages = queryresponse.objects.all()  # fetches all from db
        serializer = queryresponseSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        message = request.data
        object = queryresponse.objects.get(id=message["id"])
        serializer = queryresponseSerializer(object, data=message, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "PATCH":
        message = request.data
        object = queryresponse.objects.get(id=message["id"])
        serializer = queryresponseSerializer(object, data=message, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        message = request.data
        object = queryresponse.objects.get(id=message["id"])
        object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        message = request.data
        serializer = queryresponseSerializer(data=message)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Dynamically connect to the database and fetch the list of db's
@api_view(["POST"])
def fetchsettings(request):
    dbtype = request.data.get("dbtype")
    host = request.data.get("host")
    port = int(request.data.get("port"))
    user = request.data.get("user")
    password = request.data.get("password")
    connection = None

    try:
        if dbtype == "mysql":
            connection = MySQLdb.connect(
                host=host, port=port, user=user, password=password
            )

            cursor = connection.cursor()
            cursor.execute("SHOW DATABASES")
            dblist = [db[0] for db in cursor.fetchall()]

            return Response(dblist, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Invalid DB type"}, status=400)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


# Execute the query and store the response in the database
@api_view(["POST"])
def executequery(request):
    message = request.data.get("message")
    type = (
        "table"
        if "table" in message.lower()
        else "chart" if "chart" in message.lower() else "text"
    )
    response = generate_response(message, type)
    # object_data = queryresponse(message=message,type=type,response=response)
    object_data = {"message": message, "type": type, "response": response}
    serializer = queryresponseSerializer(data=object_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def generate_response(message, type):
    if type == "table":
        return {
            "head": ["Element position", "Atomic mass", "Symbol", "Element name"],
            "body": [
                [6, 12.011, "C", "Carbon"],
                [7, 14.007, "N", "Nitrogen"],
                [39, 88.906, "Y", "Yttrium"],
                [56, 137.33, "Ba", "Barium"],
                [58, 140.12, "Ce", "Cerium"],
            ],
        }
    elif type == "chart":
        return {
            "body": [
                {"name": "USA", "value": 400, "color": "indigo.6"},
                {"name": "India", "value": 300, "color": "yellow.6"},
                {"name": "Japan", "value": 300, "color": "teal.6"},
                {"name": "Other", "value": 200, "color": "gray.6"},
            ]
        }
    else:
        return {"text": message}


# Fetch the response from the database
@api_view(["POST"])
def fetch_from_db(query):
    response = query.data.get("query")
    type = (
        "table"
        if "table" in response.lower()
        else "chart" if "chart" in response.lower() else "text"
    )

    try:
        with connections["mysql"].cursor() as cursor:
            cursor.execute(response)
            columns = [col[0] for col in cursor.description]
            results = cursor.fetchall()

            data = [dict(zip(columns, row)) for row in results]
            data_final = conversion(data)

            object = {"message": response, "type": "table", "response": data_final}
        serializer = queryresponseSerializer(data=object)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=400)
    
@api_view(["GET"])
def disconnectdb(request):
    try:
        with connections["mysql"].cursor() as cursor:
            cursor.execute("DISCONNECT")
            return Response({"message": "Disconnected"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=400)
        

def conversion(data, type="table"):
    if type == "table":
        body = []

        for i in range(len(data)):
            if i == 0:
                head = list(data[i].keys())
            row = list(data[i].values())

            # Generalized conversion for any datetime or Decimal objects
            for j in range(len(row)):
                if isinstance(row[j], datetime.date):
                    row[j] = row[j].strftime("%Y-%m-%d")
                elif isinstance(row[j], datetime.datetime):
                    row[j] = row[j].strftime("%Y-%m-%d %H:%M:%S")
                elif isinstance(row[j], Decimal):
                    row[j] = float(row[j])  # Convert Decimal to float
            body.append(row)
        return {"head": head, "body": body}
