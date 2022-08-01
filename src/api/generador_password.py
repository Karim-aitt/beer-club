import random

def gen_pass():
    minus = "abcdefghijklmnopqrstuvwxyz"
    mayus = minus.upper()
    numeros = "0123456789"
    simbolos = "@#[]{-.}]/,¿?!="
    longitud = 8
    base = minus+mayus+numeros+simbolos

    for i in range(50):
        muestra = random.sample(base, longitud)
        password_cambiada = "".join(muestra)

    return password_cambiada