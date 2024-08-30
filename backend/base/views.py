from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import queryresponse
from .serializers import queryresponseSerializer
from django.db import connections, OperationalError
import datetime
from decimal import Decimal
import MySQLdb

#to fetch and delete all messages from the database(SQLite)
@api_view(["POST", "GET", "PUT", "PATCH", "DELETE"])
def messages(request):
    if request.method == "GET":
        messages = queryresponse.objects.all()  # fetches all from db
        serializer = queryresponseSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "DELETE":
        queryresponse.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def fetchsettings(request):
    dbtype = request.data.get("dbtype")
    host = request.data.get("host")
    port = int(request.data.get("port"))
    user = request.data.get("user")
    password = request.data.get("password")
    request.session["dbtype"] = dbtype
    print(request.session.get("dbtype"))
    try:
        # Establish a new connection for each request
        if dbtype == "mysql":
            connection = MySQLdb.connect(
                host=host, port=port, user=user, password=password
            )
            cursor = connection.cursor()
            cursor.execute("SHOW DATABASES")
            dblist = [db[0] for db in cursor.fetchall()]
            # Always close the cursor and connection to avoid resource leaks
            cursor.close()
            connection.close()
            return Response(dblist, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Invalid DB type"}, status=status.HTTP_400_BAD_REQUEST)
    except MySQLdb.OperationalError as e:
        return Response({"error": f"Database connection failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
# Fetch the response from the database
@api_view(["POST"])
def fetch_from_db(request):
    response = request.data.get("query")
    type = (
        "table"
        if "table" in response.lower()
        else "chart" if "chart" in response.lower() else "text"
    )
    dbtype = request.session.get("dbtype")
    try:
        with connections[dbtype].cursor() as cursor:
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
    
@api_view(["GET"])
def disconnectdb(request):
    try:
        with connections["mysql"].cursor() as cursor:
            cursor.execute("DISCONNECT")
            return Response({"message": "Disconnected"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=400)  

@api_view(["POST"])
def switchdatabase(request):
    dbname = request.data.get("dbname")
    dbtype = request.session.get("dbtype")
    print(dbname, dbtype)
    try:
        with connections[dbtype].cursor() as cursor:
            cursor.execute(f"USE {dbname}")
            return Response({"message": f"Switched to {dbname}"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=400)
