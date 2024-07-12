import secrets

# Generate a secret key for Flask session management
secret_key = secrets.token_urlsafe(32)
print("Flask SECRET_KEY:", secret_key)

# Generate a secret key for JWT tokens in Flask-JWT-Extended
jwt_secret_key = secrets.token_urlsafe(32)
print("JWT_SECRET_KEY:", jwt_secret_key)
