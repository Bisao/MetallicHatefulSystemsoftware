
from PIL import Image
import os

def ensure_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)

def split_image():
    # Abrir a imagem
    img = Image.open('attached_assets/Árvore e toco estilizados em ilustração.png')
    
    # Coordenadas de corte (ajuste conforme necessário)
    regions = {
        'tree1': (0, 0, 100, 150),    # primeira árvore
        'tree2': (110, 0, 210, 150),  # segunda árvore
        'tree3': (220, 0, 320, 150),  # terceira árvore
        'stump1': (0, 160, 100, 260), # primeiro toco
        'stump2': (110, 160, 210, 260), # segundo toco
        'log': (220, 160, 320, 260)   # tronco
    }
    
    # Criar diretório se não existir
    ensure_directory('attached_assets')
    
    # Cortar e salvar cada parte
    for name, box in regions.items():
        region = img.crop(box)
        region.save(f'attached_assets/{name}.png')

if __name__ == '__main__':
    split_image()
