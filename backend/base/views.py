from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import queryresponse
from .serializers import queryresponseSerializer
from django.db import connections, OperationalError
import datetime
from decimal import Decimal
import MySQLdb

# Global dictionary to maintain active connections
active_connections = {}

# to fetch and delete all messages from the database(SQLite)
@api_view(["GET", "DELETE"])
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
    
    connection = None
    cursor = None

    try:
        # Establish a new connection for each request
        if dbtype == "mysql":
            connection = MySQLdb.connect(
                host=host, port=port, user=user, password=password
            )
            cursor = connection.cursor()
            cursor.execute("SHOW DATABASES")
            dblist = [db[0] for db in cursor.fetchall()]

            # Store the connection in the global dictionary using a unique identifier
            user_id = request.user.id  # Replace with actual user/session identifier
            active_connections[user_id] = connection
            
            return Response(dblist, status=status.HTTP_201_CREATED)
        else:
            return Response(
                {"error": "Invalid DB type"}, status=status.HTTP_400_BAD_REQUEST
            )
    except MySQLdb.OperationalError as e:
        return Response(
            {"error": f"Database connection failed: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    except Exception as e:
        return Response(
            {"error": f"An error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )



# Fetch the response from the database
@api_view(["POST"])
def fetchfromdb(request):
    response = request.data.get("query")
    user_id = request.user.id
    type = (
        "table"
        if "table" in response.lower()
        else "chart" if "chart" in response.lower() else "text"
    )
    try:
        if user_id in active_connections:
            connection = active_connections.get(user_id)
            if connection:
            # Switch database using the existing connection
                with connection.cursor() as cursor:
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
            else:
                return Response({"error": "No active connection found for the user."}, status=status.HTTP_404_NOT_FOUND)
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
    user_id = request.user.id  # Replace with actual user/session identifier
    try:
        if user_id in active_connections:
            # Retrieve the active connection
            connection = active_connections.pop(user_id, None)
            if connection:
                connection.close()  # Close the database connection
                return Response({"message": "Disconnected"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "No active connection found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "No active connection found for the user."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def switchdatabase(request):
    dbname = request.data.get("dbname")
    user_id = request.user.id  # Replace with the actual user/session identifier
    try:
        # Retrieve the active connection for the user
        connection = active_connections.get(user_id)
        if connection:
            # Switch database using the existing connection
            with connection.cursor() as cursor:
                cursor.execute(f"USE `{dbname}`")
            return Response(
                {"message": f"Switched to {dbname}"}, status=status.HTTP_200_OK
            )
        else:
            return Response({"error": "No active connection found for the user."}, status=status.HTTP_404_NOT_FOUND)
    except MySQLdb.OperationalError as e:
        return Response(
            {"error": f"Failed to switch database: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
