import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit

# Dados fornecidos
x = np.array([40, 80, 120, 160, 200, 200, 200, 240, 240, 240, 280, 280, 320, 320, 320, 360, 360, 360])
y = np.array([328, 293, 304, 310, 316, 268, 248, 277, 250, 210, 271, 222, 262, 205, 142, 278, 253, 108])

# Define uma função de crescimento de saturação (Michaelis-Menten)
def saturation_growth(x, a, b, c):
    return a * x / (b + x) + c

# Realiza o ajuste de curva
params, covariance = curve_fit(saturation_growth, x, y)

# Obtém os parâmetros ajustados
a, b, c = params

# Calcula os valores previstos
y_fit = saturation_growth(x, a, b, c)

# Plota os dados e a curva ajustada
plt.scatter(x, y, label='Dados Originais')
plt.plot(x, y_fit, 'r-', label='Curva de Crescimento de Saturação Ajustada (Michaelis-Menten)')
plt.legend()
plt.xlabel('X')
plt.ylabel('Y')
plt.show()
