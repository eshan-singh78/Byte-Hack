def encrypt_password(password):
    encrypted = ''
    for char in password:
        encrypted += chr(ord(char) + 1) 
    return encrypted

decrypted_password = decrypt_password(user_password)
print("Decrypted password:", decrypted_password)
