
from PIL import Image
import os

def ensure_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)

def split_image():
    # Abrir a imagem
    try:
        img = Image.open('attached_assets/Árvore e toco estilizados em ilustração.png')
        
        # Ajustar coordenadas baseado no tamanho da imagem
        width = img.width // 3  # Dividir em 3 colunas
        height = img.height // 2  # Dividir em 2 linhas
        
        regions = {
            'tree1': (0, 0, width, height),
            'tree2': (width, 0, width * 2, height),
            'tree3': (width * 2, 0, width * 3, height),
            'stump1': (0, height, width, height * 2),
            'stump2': (width, height, width * 2, height * 2),
            'log': (width * 2, height, width * 3, height * 2)
        }
        
        # Criar diretório se não existir
        ensure_directory('attached_assets')
        
        # Cortar e salvar cada parte
        for name, box in regions.items():
            region = img.crop(box)
            region.save(f'attached_assets/{name}.png')
            print(f'Imagem {name}.png criada com sucesso')
            
    except Exception as e:
        print(f'Erro ao processar imagem: {str(e)}')

if __name__ == '__main__':
    split_image()
