# Database API Documentation

This project provides a set of REST APIs for managing database connections, executing queries, and switching databases. The APIs support MySQL, PostgreSQL, and MongoDB, allowing users to interact with their databases dynamically.

## API Endpoints

### 1. Fetch & Delete Messages
**URL**: `/messages/`  
**Methods**: `GET`, `DELETE`

#### Description:
- **GET**: Fetches all messages stored in the SQLite database.
- **DELETE**: Deletes all messages from the database.

#### Example Request:
- **GET**:
  ```bash
  curl -X GET http://localhost:8000/messages/
  ```

- **DELETE**:
  ```bash
  curl -X DELETE http://localhost:8000/messages/
  ```

#### Response:
- **GET** (Example):
  ```json
  [
      {
          "id": 1,
          "message": "SELECT * FROM users;",
          "response": "...",
          "type": "table"
      }
  ]
  ```

- **DELETE**:
  - Status: `204 No Content`

### 2. Establish Database Connection
**URL**: `/fetchsettings/`  
**Method**: `POST`

#### Description:
Establishes a connection to the specified database (`MySQL`, `PostgreSQL`, or `MongoDB`) and returns a list of internal databases.

#### Request Body:
```json
{
  "dbtype": "mysql",
  "host": "localhost",
  "port": 3306,
  "user": "root",
  "password": "password"
}
```

#### Response:
- **Success** (List of databases):
  ```json
  ["information_schema", "mydb", "test"]
  ```

- **Error**:
  ```json
  {
    "error": "Database connection failed: [error message]"
  }
  ```

#### Example Request:
```bash
curl -X POST http://localhost:8000/fetchsettings/ \
  -H "Content-Type: application/json" \
  -d '{
        "dbtype": "mysql",
        "host": "localhost",
        "port": 3306,
        "user": "root",
        "password": "password"
      }'
```

### 3. Execute Query
**URL**: `/fetchfromdb/`  
**Method**: `POST`

#### Description:
Executes a SQL query on the connected database and returns the result.

#### Request Body:
```json
{
  "query": "SELECT * FROM users;"
}
```

#### Response:
- **Success**:
  ```json
  {
      "message": "SELECT * FROM users;",
      "type": "table",
      "response": {
          "head": ["id", "name", "email"],
          "body": [
              [1, "John Doe", "john@example.com"],
              [2, "Jane Smith", "jane@example.com"]
          ]
      }
  }
  ```

- **Error**:
  ```json
  {
    "error": "SQL Error: [error message]"
  }
  ```

#### Example Request:
```bash
curl -X POST http://localhost:8000/fetchfromdb/ \
  -H "Content-Type: application/json" \
  -d '{
        "query": "SELECT * FROM users;"
      }'
```

### 4. Switch Active Database
**URL**: `/switchdatabase/`  
**Method**: `POST`

#### Description:
Switches the active database for the current connection.

#### Request Body:
```json
{
  "dbname": "new_db"
}
```

#### Response:
- **Success**:
  ```json
  {
    "message": "Switched to new_db"
  }
  ```

- **Error**:
  ```json
  {
    "error": "Failed to switch database: [error message]"
  }
  ```

#### Example Request:
```bash
curl -X POST http://localhost:8000/switchdatabase/ \
  -H "Content-Type: application/json" \
  -d '{
        "dbname": "new_db"
      }'
```

### 5. Disconnect from Database
**URL**: `/disconnectdb/`  
**Method**: `GET`

#### Description:
Disconnects the current active database connection for the user.

#### Response:
- **Success**:
  ```json
  {
    "message": "Disconnected"
  }
  ```

- **Error**:
  ```json
  {
    "error": "No active connection found for the user."
  }
  ```

#### Example Request:
```bash
curl -X GET http://localhost:8000/disconnectdb/
```

## Error Handling

- **500 Internal Server Error**: This will occur if there are any unhandled exceptions in the server code, such as database connection failures or invalid queries.
- **400 Bad Request**: If invalid data is provided, such as missing parameters or unsupported database types, this error will be returned.
- **404 Not Found**: Returned when no active connection is found for the user during operations like disconnection or query execution.

