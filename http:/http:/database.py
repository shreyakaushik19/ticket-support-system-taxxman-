import mysql.connector

def create_table():
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='password',
        database='support_ticketing'
    )

    cursor = connection.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tickets (
            id INT AUTO_INCREMENT PRIMARY KEY,
            description TEXT NOT NULL,
            category VARCHAR(255) NOT NULL,
            urgency ENUM('low', 'medium', 'high') NOT NULL,
            status ENUM('open', 'closed') NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    connection.commit()
    connection.close()
